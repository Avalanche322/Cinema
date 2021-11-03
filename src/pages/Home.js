import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import ListMovies from "../components/app/ListMovies";

const Home = () => {
	const contents = useSelector(state => state.contents.contents);
	const location = useLocation();
	const history = useHistory();
	let arrAllContent = [];
	const [allContent, setAllContent] = useState([]);
	// NOW PLAYING Data
	const moviesPlayingNow = contents.now_playing.data.slice(0, 20);
	useEffect(() => {
		for (const key in contents) {
		if (Object.hasOwnProperty.call(contents, key)) {
			arrAllContent.push(contents[key]);
		}
	}
	setAllContent(arrAllContent);
	// eslint-disable-next-line
	}, [contents]);
	useEffect(() => {
		// title for page
		document.title = `Home | Cinema HD`;
	// eslint-disable-next-line
	}, [location.pathname])
	return (
		<section className="home">
			<div className="home__poster position-relative d-flex justify-content-center align-items-center mb-5">
				<div className="position-absolute text-center home__poster-block">
					<h2 className="home__poster-title">{moviesPlayingNow[0]?.original_title}</h2>
					<p className="home__poster-text">{moviesPlayingNow[0]?.overview}</p>
				</div>
				<img 
					src={`https://image.tmdb.org/t/p/original${moviesPlayingNow[0]?.backdrop_path}`}
					loading='lazy'
					alt={moviesPlayingNow[0]?.original_title}
				/>
			</div>
			<div className="home">
				<div className="movies">
					{allContent.map((contnet,i) => {
						return(
							<ListMovies key={i} content={contnet}/>
						)
					})}
				</div>
			</div>
		</section>
	);
}
 
export default memo(Home);