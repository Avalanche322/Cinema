import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import MoviePoster from "../components/app/MoviePoster";
import PrivateRoute from "../components/PrivateRoute";
import OverviewMovie from "./OverviewMovie";
import OverviewTv from "./OverviewTv";

const Favorite = () => {
	const favorite = useSelector(state => state.contents.favorite);
	const history = useHistory();
	useEffect(() => {
		// title for page
		document.title = `My Favorite | Cinema HD`;
	// eslint-disable-next-line
	}, [])
	return (
		<section className="mt-6 favorite">
			<Container fluid="md">
				<div className="d-flex flex-wrap">
					{favorite.map(item => {
						return (
							<MoviePoster 
								key={item.id} 
								content={item}
								typeContent={item.type ? 'tv' : 'movie'}
						/>
						)
					})}
				</div>
			</Container>
			{favorite.map(item => {
				return(
					history.location.pathname.includes(item.id)
					? <PrivateRoute 
						key={item.id}
						path='/favorite/overview=:id' 
						component={item.type ? OverviewTv : OverviewMovie} />
					: ''
				)
			})}
		</section>
	);
}
 
export default Favorite;