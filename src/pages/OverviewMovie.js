import { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router";
import { Tabs, Tab, Container } from "react-bootstrap";
import { removeFavorite, uploadFavorite } from "../redux/actions";
import {BsFillBookmarkFill,FaTimes} from 'react-icons/all';
import movieTrailer from 'movie-trailer';
import ReactPlayer from "react-player";
import Cinema from "../components/app/Cinema";
import { Link } from "react-router-dom";

const OverviewMovie = () => {
	const { id } = useParams();
	const location = useLocation();
	const dispatch = useDispatch();
	const content = useSelector(state => state.contents.search);
	const favorite = useSelector(state => state.contents.favorite).filter(x => x.id === +id)[0];
	const user = useSelector(state => state.user.user);
	const [videoURL, setVideoURL] = useState('');
	const [tab, setTab] = useState('');
	const [showTrailer, setShowTrailer] = useState(false);
	const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
	const dateRelease = new Date(content.release_date).toLocaleDateString('en-US', optionsDate);
	useEffect(() => {
		// title for page
		document.title = `${content.title} | Cinema HD`;
	// eslint-disable-next-line
	}, [content]);
	function actionFavorite(){
		favorite ? dispatch(removeFavorite(favorite,user)) : dispatch(uploadFavorite(content,user))
	}
	function timeConvert(n) {
		let num = n;
		let hours = (num / 60);
		let rhours = Math.floor(hours);
		let minutes = (hours - rhours) * 60;
		let rminutes = Math.round(minutes);
		return `${rhours} h ${rminutes} min`;
	}
	async function handlerTrailer(){
		if(content.name){
			const res = await movieTrailer(content.name);
			setVideoURL(res);
		}
		document.body.classList.add('overflow-hidden');
		setShowTrailer(true);
	}
	function closeTrailer(){
		document.body.classList.remove('overflow-hidden');
		setShowTrailer(false);
	}
	return (
		<div className="my-2 overview overflow-hidden">
			<div className='overview__img position-relative'>
				<Link to={location.state.prevLocation} 
					className="position-absolute overview__close border-0">
					<FaTimes />
				</Link>
				<Tabs
					defaultActiveKey="about"
					onSelect={(tab) => setTab(tab)}
					className="position-absolute d-flex justify-content-center w-100 border-0 mt-3 overview__tabs"
					>
					<Tab 
						eventKey="about" 
						title="About" 
						className="position-absolute h-100 w-100"
					>
						<Container fluid="md" className="h-100">
							<div className="overview__details d-flex flex-column justify-content-around h-100 position-relative py-5">
								<div>
									<h2 className="mb-2 overview__title mb-4 inline-block">{content.title}</h2>
									<h5 className="fst-italic">{content.tagline}</h5>
									<p>{content.overview}</p>
									<p className="mt-3">Release date: {dateRelease}</p>
									<p>Average: {content.vote_average}</p>
									<p>Time: {timeConvert(content.runtime)}</p>
								</div>
								<div className="mt-2">
									<button 
										onClick={handlerTrailer.bind(null)}
										className="me-2 overview__btn rounded border-0 px-3 py-2"
									>Watch Trailer</button>
									<button 
										className={`overview__btn rounded border-0 px-3 py-2 
											${favorite ? 'overview__btn_active' : ''}`
										}
										onClick={actionFavorite.bind(null)}
									><BsFillBookmarkFill/></button>
								</div>
							</div>
						</Container>
					</Tab>
					<Tab 
						eventKey="watch" 
						title="Watch"
						className="position-absolute h-100 w-100 overview__watch"
					>
						<Container fluid="md" className="h-100">
							<div className="d-flex justify-content-center align-items-center flex-column h-100 position-relative pt-4">
								{/* can be another player depends on url */}
								{!videoURL && 
									<div  className="overview__not-found overview-not-found">
										<h2 className="overview-not-found__title">404</h2>
										<h3 className="overview-not-found__text">Not found film</h3>
									</div>
								}
								{videoURL && 
									<ReactPlayer 
										url={videoURL}
										controls={true}
										className="w-100 overview__video" 
									/>}
							</div>
						</Container>
					</Tab>
				</Tabs>
				<img
					className={`w-100 h-100 ${tab === 'watch' ? 'overview__img-blur' : ''}`}
					loading='lazy' 
					src={`https://image.tmdb.org/t/p/original${content.backdrop_path}`} 
					alt={content.original_title} />
			</div>
			{showTrailer && <Cinema url={videoURL} close={closeTrailer} />}
		</div>
	);
}
 
export default memo(OverviewMovie);