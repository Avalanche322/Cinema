import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { searchMovieById } from "../../redux/actions";

const MoviePoster = ({content, categoryUrl, typeContent}) => {
	const loading = useSelector(state => state.app.loading);
	const dispatch = useDispatch();
	const { url } = useRouteMatch();
	const path = categoryUrl ? `${url}/${categoryUrl}/overview=${content.id}` : `${url}/overview=${content.id}`
	return (
		<div className="me-4 mb-3 movies__poster-block" aria-hidden={loading ? 'true' : 'false'}>
			<Link to={{
				pathname: path,
				state: {prevLocation: url}
			}} onClick={() => dispatch(searchMovieById(content.id, typeContent))}>
				<div className="position-relative movies__poster mb-3">
					<img 
						className="rounded"
						src={ content.poster_path 
							?'https://image.tmdb.org/t/p/w200' + content.poster_path
							: 'https://via.placeholder.com/135x200/1f1f1f/fff?text=image+not+found'} 
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