import { useState, useEffect, memo, Fragment, useRef } from "react";
import { Navbar, Container, Nav, Dropdown, Button, Form, InputGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import fullLogo from '../../img/full-logo.png';
import { useDispatch } from "react-redux";
import { logout, showError, clearSearchContentsByName, searchContentsByName, searchMovieById } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { FaSearch, FaTimes } from 'react-icons/all';


const Header = () => {
	const [isActive, setIsActive] = useState(false);
	const [isHeaderHidden, setIsHeaderHidden] = useState(false);
	const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
	const [isTop, setIsTop] = useState(window.pageYOffset === 0);
	let profileRef = useRef();
	const dispatch = useDispatch();
	const history = useHistory();
	// user
	// eslint-disable-next-line no-unused-vars
	const rerenderComponent = useSelector(state => state.app.rerender_component);
	const currentUser = useSelector(state => state.user.user);
	const has_plan = useSelector(state => state.user.settings?.has_plan);
	const has_card = useSelector(state => state.user.settings?.has_card);
	const sing_in = useSelector(state => state.user.settings?.sing_in);
	const isImportentSettings = currentUser && has_plan && has_card;
	// search contents
	const [showInput, setShowInput] = useState(false);
	const [search, setSearch] = useState('');
	const [showProfile, setShowProfile] = useState(false);
	const contents = useSelector(state => state.contents.searchList.slice(0, 5));
	const [notFound, setNotFound] = useState(true);
	let searchRef = useRef();
	const handlerSidebar = () =>{
		setIsActive(!isActive);
		if(window.innerWidth <= 768){
			document.body.classList.toggle('overflow-hidden');
		}
	}
	useEffect(() =>{
		let hendler = () =>{
			const currentScrollPos = window.pageYOffset;
			setIsHeaderHidden(prevScrollpos < currentScrollPos);
			setPrevScrollpos(currentScrollPos);
			setShowProfile(false);
			setShowInput(false);
			window.pageYOffset !== 0 ? setIsTop(false) : setIsTop(true);
		}
		document.addEventListener("scroll", hendler)
		return () =>{
			document.removeEventListener("scroll", hendler)
		};	
	});
	useEffect(() =>{
		let hendler = (event) =>{
			if(!profileRef.current.contains(event.target)){
				setShowProfile(false);
			}
			if(!searchRef.current.contains(event.target)){
				setShowInput(false);
			}
		}
		document.addEventListener("mousedown", hendler)
		return () =>{
			document.removeEventListener("mousedown", hendler)
		};	
	});
	async function handleLogout() {
		setShowProfile(false);
		try {
			dispatch(logout());
		} catch(e) {
			dispatch(showError(e.message) );
		}
	}
	function handelLinkToAllContent(){
		dispatch(clearSearchContentsByName());
		setShowInput(false);
		setSearch('');
		history.push(`/search=${search}`);
	}
	const handelKeyDown = (event) => {
		if (event.key === 'Enter') {
			handelLinkToAllContent();
		}
	}
	const handelInput = (value) => {
		if(value){
			dispatch(searchContentsByName(value, 1));
		}
		dispatch(clearSearchContentsByName());
		setSearch(value);
		if(contents.length){
			setNotFound(false);
		} else{
			setNotFound(true);
		}
	}
	const handelShowInput = () => {
		dispatch(clearSearchContentsByName());
		setSearch('');
		setShowInput(false);
	}
	const handelLinkToContent = (id, type) => {
		dispatch(searchMovieById(id, type));
		setSearch('');
		setShowInput(!showInput);
	}
	function timeConvert(n) {
		var options = {year: 'numeric'};
		var today  = new Date(n);
		return today.toLocaleDateString("en-US", options)
	}
	const { url } = useRouteMatch();
	return (
		<header>
			<Navbar fixed="top" 
				className={`header ${isHeaderHidden ? 'header__hidden' : ''} ${isTop ? '' : 'header__fill'}`}>
			<Container fluid="md">
				<Navbar.Brand className="logo">
					<NavLink to="/home" className="logo__text link-color d-flex align-items-center fw-bold">
						<img className="logo__img" src={fullLogo} alt="logo" />
					</NavLink>
				</Navbar.Brand>
				<nav className="w-100 d-flex align-items-center justify-content-end">
					<div className='mx-md-auto d-flex'>
						{isImportentSettings && <Nav className={`header__menu px-md-0 pt-md-0 pt-5 px-3 
							flex-md-row flex-column ${isActive ? "active" : ''}`}>
								<NavLink 
									className={`menu__link link-color fs-5 white-80 lh-lg me-md-3 ${isActive ? "active" : ''}
										${showInput ? 'd-none' : ''}`}
									activeClassName="menu__link-active opacity-100"
									onClick={handlerSidebar.bind(null)}
									exact
									to="/home">
									Home
								</NavLink>
								<NavLink 
									className={`menu__link link-color fs-5 white-80 lh-lg ${isActive ? "active" : ''} 
										${showInput ? 'd-none' : ''}`}
									activeClassName="menu__link-active opacity-100"
									onClick={handlerSidebar.bind(null)}
									to="/favorite">
									My Favorite
								</NavLink>
						</Nav>}
						{isImportentSettings && <div className="header__search search-header ms-md-2 d-flex align-items-center">
							<InputGroup 
								ref={searchRef}
								className={`${showInput ? '' : 'search-header__input-hidden'} search-header__input`}>
								<Form.Control
									type="text"
									className='border-white'
									placeholder='Movies and Serials'
									onKeyDown={handelKeyDown}
									value={search}
									onChange={(e) => handelInput(e.target.value)}
									aria-describedby="search-inpit"/>
								<Button 
									id="search-inpit" 
									onClick={handelShowInput} 
									className='search-header__input-btn'>
									<FaTimes/>
								</Button>
							</InputGroup>
							<Button 
								className={`search-header__btn ${showInput ? 'd-none' : ''}`} 
								onClick={() => setShowInput(true)}>
								<FaSearch/>
							</Button>
							<ul 
								className={`search-header__result search-header-result position-absolute rounded-3
								${showInput && !!contents.length ? '' : 'search-header__input-hidden'}`}>
								{notFound // if not foud see that else result
								? <li className='py-3 ps-3 pe-5'>
										Not Found
									</li>
								: <Fragment>
										{contents.map(content => {
											return (
												<li key={content.id}>
													<NavLink
														className='d-flex align-items-top search-header-result__link rounded-3 py-3 ps-3 pe-5'
														to={{
															pathname: `/content/${content.title ? 'movie' : 'tv'}/overview=${content.id}`,
															state: {prevLocation: url}}}
														onClick={() => handelLinkToContent(content.id, content.title ? 'movie' : 'tv')}
														>
														<img 
															className='search-header-result__img me-3'
															src={content.poster_path 
															?'https://image.tmdb.org/t/p/w200' + content.poster_path
															: 'https://via.placeholder.com/135x200/1f1f1f/fff?text=image+not+found'}  
															alt={content.title} />
														<div>
															<h3 className='search-header-result__title lh-1'>
																{content.title ? content.title : content.name}
															</h3>
															<span className='search-header-result__subtitle'>
																{timeConvert( content.title ? content.release_date : content.first_air_date)}
															</span>
														</div>
													</NavLink>
												</li>
											)
										})}
										<li className='text-center'>
											<button 
												className='btn search-header-result__btn' 
												onClick={handelLinkToAllContent}
												>All results
											</button>
										</li>
									</Fragment>
								}
							</ul>
						</div>}
					</div>
					{isImportentSettings && <Nav className="profile">
						<Dropdown show={showProfile} ref={profileRef}>
							<Dropdown.Toggle 
								as="img" 
								src={currentUser.photoURL} 
								alt="user avatar"
								className="profile__avatar rounded-circle"
								id="profile-avatar"
								onClick={() => {setShowProfile(!showProfile)}} />
							<Dropdown.Menu variant="dark" id="profile-menu">
								<Dropdown.Item href="/settings/profile" onClick={() => {setShowProfile(false)}}>
									Settings
								</Dropdown.Item>
								<Dropdown.Item 
									className="profile__link" 
									onClick={handleLogout.bind(null)}
									>Log Out
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Nav>}
					{sing_in && !isImportentSettings && 
						<Button className="header__btn link-color white-60 fs-5" onClick={handleLogout.bind(null)}>Log Out</Button>}
					{!sing_in && 
						<NavLink className="link-color white-60 fs-5 lh-lg" to="/sing-in">Sing-In</NavLink>}
					<div 
						className={`header__humburger ms-3 ${isActive ? "active" : ''}`}
						onClick={handlerSidebar.bind(null)}>
						<span></span>
					</div>
				</nav>	
			</Container>
			</Navbar>
		</header>
	);
}
 
export default memo(Header);