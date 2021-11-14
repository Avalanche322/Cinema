import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { fetchMovies } from "../redux/actions";
import MoviePoster from "../components/app/MoviePoster";
import InfiniteScroll from "react-infinite-scroll-component";
import { memo, useState, Fragment } from "react";
import { useEffect } from "react";
import Loader from "../components/app/Loader";
import PrivateRoute from "../components/PrivateRoute";
import OverviewMovie from "./OverviewMovie";
import OverviewTv from './OverviewTv';

const Movies = () => {
	const { categoryUrl } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const content = useSelector(state => state.contents.contents[categoryUrl]);
	const titleContent = content.title;
	const dataContent = content.data;
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	useEffect(() => {
		dispatch(fetchMovies(categoryUrl, 1));
		// eslint-disable-next-line
	},[])
	const fetchMoreMovies = () => {
		if(page >= 10){
			setHasMore(false);
			return
		}
		setPage(page+1);
		dispatch(fetchMovies(categoryUrl, page + 1));
	}
	return (
		<div className="movies__category-list">
			<Container fluid="md">
				<h2 className="ps-3">{titleContent}</h2>
				<InfiniteScroll
					className='d-flex flex-wrap p-3'
					dataLength={page}
					next={fetchMoreMovies}
					hasMore={hasMore}
					loader={<Loader/>}
				>
					{dataContent.map(item => {
						console.log(item);
						return (
								<Fragment key={item.id} >
								<MoviePoster 
									key={item.id} 
									content={item}
									typeContent={content.typeContent}/>
								{history.location.pathname.includes(item.id) && history.location.pathname.includes(categoryUrl)
								? <div className="flex-fill w-100 mb-3">
										<PrivateRoute 
										key={item.id}
										path='/contents/:category/overview=:id'
										component={content.typeContent === 'movie' ? OverviewMovie : OverviewTv} />
									</div>
								: ''}
							</Fragment>
						)
					})}
				</InfiniteScroll>
			</Container>
		</div>
	);
}
 
export default memo(Movies);