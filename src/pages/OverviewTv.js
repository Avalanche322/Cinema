import { Fragment, memo, useEffect, useState } from "react";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router";
import { Tabs, Tab, Container } from "react-bootstrap";
import { removeFavorite, searchSeasons, uploadFavorite } from "../redux/actions";
import {BsFillBookmarkFill,FaTimes, IoIosArrowForward, IoIosArrowBack} from 'react-icons/all';
import movieTrailer from 'movie-trailer';
import Cinema from "../components/app/Cinema";

const OverviewTv = () => {
	const { id } = useParams();
	const location = useLocation();
	const dispatch = useDispatch();
	const content = useSelector(state => state.contents.search);
	const favorite = useSelector(state => state.contents.favorite).filter(x => x.id === +id)[0];
	const seasons = useSelector(state => state.contents.searchSeasons);
	const numberSeasons = [...Array(content.number_of_seasons).keys()].map(x => ++x);
	const [selectedSeason, setSelectedSeason] = useState(1);
	const user = useSelector(state => state.user.user);
	const [videoURL, setVideoURL] = useState('');
	const [tab, setTab] = useState('');
	const [showTrailer, setShowTrailer] = useState(false);
	const [watch, setWatch] = useState('');
	const [showWatch, setShowWatch] = useState('');
	useEffect(() => {
		// title for page
		document.title = `${content.name} | Cinema HD`;
	// eslint-disable-next-line
	}, [content]);
	useEffect(() => {
		dispatch(searchSeasons(id, content.number_of_seasons));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	function actionFavorite(){
		favorite ? dispatch(removeFavorite(favorite,user)) : dispatch(uploadFavorite(content,user))
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
	async function handlerWatch(name){
		const res = await movieTrailer(content.name + name);
		setWatch(res);
		setShowWatch(true);
		document.body.classList.add('overflow-hidden');
	}
	function closeWatch(){
		document.body.classList.remove('overflow-hidden');
		setWatch('');
		setShowWatch(false);
	}
	const settings = {
		dots: false,
		infinite: false,
		speed: 700,
		slidesToShow: 4,
		slidesToScroll: 4,
		nextArrow: <SlickArrowRight />,
      prevArrow: <SlickArrowLeft />,
		responsive: [
			{
				breakpoint: 1300,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 5,
				}
			},
			{
          breakpoint: 1080,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          }
        },
		  {
          breakpoint: 860,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
		  {
         breakpoint: 670,
         settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
		  {
         breakpoint: 450,
         settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
      ]
	};
	function SlickArrowLeft({ currentSlide, slideCount, ...props }){
		return (
			<IoIosArrowBack
				{...props}
				className={
					"slick-prev slick-arrow" +
					(currentSlide === 0 ? " slick-disabled d-none" : "")
				}
				aria-hidden="true"
				aria-disabled={currentSlide === 0 ? true : false}
				type="button"
			/>
		)
	}
	function SlickArrowRight({ currentSlide, slideCount, ...props }){
		return (
			<IoIosArrowForward
				{...props}
				className={
					"slick-next slick-arrow" +
					(currentSlide === slideCount - settings.slidesToShow ? " slick-disabled d-none" : "")
				}
				aria-hidden="true"
				aria-disabled={currentSlide === slideCount - 6 ? true : false}
				type="button"
			/>
		)
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
							<div className="overview__details d-flex flex-column justify-content-around h-100 position-relative py-2">
								<div>
									<h2 className="mb-2 overview__title mb-4 inline-block">{content.name}</h2>
									<h5 className="fst-italic">{content.tagline}</h5>
									<p>{content.overview}</p>
									<p className="mt-1">Average: {content.vote_average}</p>
									<p className="mt-1">Status: {content.status}</p>
									<p className="mt-1">Number of seasons: {content.number_of_seasons}</p>
									<p className="mt-1">Number of episodes: {content.number_of_episodes}</p>
									<p className="mt-1">Original name: {content.original_name}</p>
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
						className="position-absolute h-100 w-100 overview__watch">
						<Container fluid="md" className="h-100">
							<div className="d-flex justify-content-center flex-column h-100 
									position-relative pt-4 overview__seasons seasons-overview">
								<h2>{content.name}</h2>
								<div className="d-flex align-items-center my-4">
									<span className="me-3">Seasons</span>
									{numberSeasons.map(num => {
										return (
											<button 
												key={num} 
												className={`btn seasons-overview__btn rounded-circle
													${selectedSeason === num ? 'seasons-overview__btn-active' : ''}`} 
												onClick={() => setSelectedSeason(num)}
												>{num}
											</button>
										)
									})}
								</div>
									{seasons[selectedSeason - 1] && <Slider {...settings}>
										{seasons[selectedSeason - 1].episodes?.map(episod => {			
											return (
												<Fragment key={episod.id}>
													{episod.overview && <div
													onClick={handlerWatch.bind(null,episod.name)} 
													className="pe-3 seasons-overview__item rounded-3">
													<div className="seasons-overview__img">
														<img 
															className="rounded"
															src={'https://image.tmdb.org/t/p/w200' + episod.still_path} 
															loading='lazy'
															alt={episod.name} />
													</div>
													<h3 
														className="mt-2 seasons-overview__title"
														>{episod.episode_number}. {episod.name}
													</h3>
													<p className="mt-2 lh-1 fs-6 seasons-overview__text">{episod.overview}</p>
												</div>}
												{!episod.still_path && <div
													className="pe-3 seasons-overview__item rounded-3 d-flex flex-column">
													<div 
													className="seasons-overview__no-img d-flex 
														justify-content-center align-items-center rounded">
														<h3>Upcoming</h3>
													</div>
													<h3 
														className="mt-2 seasons-overview__title"
														>{episod.episode_number}. {episod.name}
													</h3>
												</div>}
												</Fragment>
											)
										})}
									</Slider>}
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
			{showWatch && <Cinema url={watch} close={closeWatch} />}
		</div>
	);
}
 
export default memo(OverviewTv);