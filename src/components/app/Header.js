import { useState, useEffect, memo } from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import fullLogo from '../../img/full-logo.png';
import user from '../../img/user.svg';
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions";


const Header = () => {
	const [isActive, setIsActive] = useState(false);
	const [isHeaderHidden, setIsHeaderHidden] = useState(false);
	const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
	const [isTop, setIsTop] = useState(window.pageYOffset === 0);
	const currentUser = JSON.parse(localStorage.getItem('user'));
	const dispatch = useDispatch();
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
		}
		document.addEventListener("scroll", hendler)
		return () =>{
			document.removeEventListener("scroll", hendler)
		};	
	});
	useEffect(() =>{		
		let hendler = () =>{
			window.pageYOffset !== 0 ? setIsTop(false) : setIsTop(true)
		}
		document.addEventListener("scroll", hendler)
		return () =>{
			document.removeEventListener("scroll", hendler)
		};	
	});
	async function handleLogout() {
		try {
			dispatch(logout());
		} catch(e) {
			alert(e.message);
		}
	}
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
					{currentUser && <Nav className={`mx-auto header__menu px-md-0 pt-md-0 pt-5 px-3 flex-md-row flex-column
					 ${isActive ? "active" : ''}`}>
						<NavLink 
							className={`menu__link link-color fs-5 white-80 lh-lg me-md-3 ${isActive ? "active" : ''}`}
							activeClassName="menu__link-active opacity-100"
							onClick={handlerSidebar.bind(null)}
							exact
							to="/home">
							Home
						</NavLink>
						<NavLink 
							className={`menu__link link-color fs-5 white-80 lh-lg ${isActive ? "active" : ''}`}
							activeClassName="menu__link-active opacity-100"
							onClick={handlerSidebar.bind(null)}
							to="/favorite">
							My Favorite
						</NavLink>
					</Nav>}
					{currentUser
						? <Nav className="profile">			
							<Dropdown>
								<Dropdown.Toggle as="img" src={user} id="profile-menu" />
								<Dropdown.Menu className="me-5" variant="dark" align='end'>
									<Dropdown.Item>Settings</Dropdown.Item>
									<Dropdown.Item onClick={handleLogout.bind(null)}>Log Out</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Nav>
						: <NavLink className="sing-in link-color white-60 fs-5 lh-lg" to="/sing-in">Sing-In</NavLink>
					}	
					<div 
						className={`header__humburger d-md-none ms-3 ${isActive ? "active" : ''}`}
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