import Slider from "react-slick";
import { IoIosArrowForward,IoIosArrowBack, BsArrowRight } from "react-icons/all";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import MoviePoster from "./MoviePoster";
import OverviewMovie from '../../pages/OverviewMovie';
import OverviewTv from "../../pages/OverviewTv";
import PrivateRoute from "../PrivateRoute";

const ListMovies = ({content}) => {
	const title = content.title;
	const listContent = content.data.slice(0, 20);
	const overviewMovie = useSelector(state => state.contents.search);
	const history = useHistory();
	const settings = {
		dots: false,
		infinite: false,
		speed: 700,
		slidesToShow: 6,
		slidesToScroll: 6,
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
		<section>
			<Container fluid="md">
				<h3 className="mb-3">
					<Link to={`/contents/${content.categoryUrl}`} 
						className="movies__title d-inline-block w-100"
						>{title}<IoIosArrowForward className="movies__title-arrow opacity-0 white-80" />
					</Link>
				</h3>
				<div>
					<Slider {...settings}>
						{listContent.map(item => {
							return (
								<MoviePoster 
									key={item.id} 
									content={item} 
									categoryUrl={content.categoryUrl} 
									typeContent={content.typeContent} />
							)
						})}
						<div className="movies__show-all show-all-movies rounded d-flex align-items-center justify-content-center">
							<Link to={`/contents/${content.categoryUrl}`} className="d-flex flex-column align-items-center">
								<BsArrowRight className="show-all-movies__arrow rounded-circle p-2 mb-1"/>
								<span className="white-60 show-all-movies__text">Show all</span>
							</Link>
						</div>
					</Slider>
				</div>
			</Container>
			{listContent.map(item => {
				return(
					history.location.pathname.includes(content.categoryUrl) && overviewMovie.id === item.id
					? <PrivateRoute 
						key={item.id}
						path='/home/:category/overview=:id' 
						component={content.typeContent === 'movie' ? OverviewMovie : OverviewTv} />
					: ''
				)
			})}
		</section>
	);
}
 
export default ListMovies;