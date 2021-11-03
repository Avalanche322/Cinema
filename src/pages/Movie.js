import { memo, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector,  useDispatch} from "react-redux";
import { searchMovie } from "../redux/actions";

const Movie = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const movie = useSelector(state => state.contents.search);
	useEffect(() => {
		dispatch(searchMovie(id));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<div className="mt-5">
			<h2>{movie.title}</h2>
			<p>{movie.overview}</p>
		</div>
	);
}
 
export default memo(Movie);