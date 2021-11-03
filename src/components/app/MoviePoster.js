import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { searchMovie } from "../../redux/actions";

const MoviePoster = ({content, categoryUrl, typeContent}) => {
	const loading = useSelector(state => state.app.loading);
	const dispatch = useDispatch();
	const { url } = useRouteMatch();
	const path = categoryUrl ? `${url}/${categoryUrl}/overview=${content.id}` : `${url}/overview=${content.id}`
	return (
		<div className="me-4 mb-5 movies__poster-block" aria-hidden={loading ? 'true' : 'false'}>
			<Link to={{
				pathname: path,
				state: {prevLocation: url}
			}} onClick={() => dispatch(searchMovie(content.id, typeContent))}>
				<div className="position-relative movies__poster mb-2">
					<img 
						className="rounded"
						src={'https://image.tmdb.org/t/p/w200' + content.poster_path} 
						loading='lazy'
						alt={content.title} />
					<span 
						className="position-absolute top-0 start-0 mt-2 ms-2 movies__poster-average rounded px-2"
						>{content.vote_average.toFixed(1)}
					</span>
				</div>
				<h6 className="lh-sm">{typeContent === 'movie' ? content.title: content.name}</h6>
			</Link>
		</div>
	);
}
 
export default memo(MoviePoster);