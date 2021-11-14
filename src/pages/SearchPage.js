import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { searchContentsByName } from "../redux/actions";
import MoviePoster from "../components/app/MoviePoster";
import InfiniteScroll from "react-infinite-scroll-component";
import { memo, useState, Fragment } from "react";
import { useEffect } from "react";
import Loader from "../components/app/Loader";
import PrivateRoute from "../components/PrivateRoute";
import OverviewMovie from "./OverviewMovie";
import OverviewTv from "./OverviewTv";

const SearchPage = () => {
	const { query } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const content = useSelector(state => state.contents.searchList);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	useEffect(() => {
		dispatch(searchContentsByName(query, 1));
		// eslint-disable-next-line
	},[])
	const fetchMoreMovies = () => {
		if(page >= 10){
			setHasMore(false);
			return
		}
		setPage(page+1);
		dispatch(searchContentsByName(query, page + 1));
	}
	return (
		<div className="movies__category-list">
			<Container fluid="md">
				<InfiniteScroll
					className='d-flex flex-wrap p-3'
					dataLength={page}
					next={fetchMoreMovies}
					hasMore={hasMore}
					loader={<Loader/>}
				>
					{content.map(item => {
						return (
								<Fragment key={item.id} >
								<MoviePoster 
									key={item.id} 
									content={item}
									typeContent={item.name ? 'tv' : 'movie'}/>
								{history.location.pathname.includes(item.id) && history.location.pathname.includes(query)
								? <div className="flex-fill mb-3 w-100">
										<PrivateRoute 
										key={item.id}
										path='/search=:query/overview=:id'
										component={item.name ? OverviewTv : OverviewMovie} />
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
 
export default memo(SearchPage);