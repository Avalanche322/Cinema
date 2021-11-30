import { Fragment, memo, useEffect } from "react";
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
							<Fragment key={item.id} >
								<MoviePoster 
								content={item}
								typeContent={item.type ? 'tv' : 'movie'}/>
								{history.location.pathname.includes(item.id)
								? <div className="flex-fill">
									<PrivateRoute 
										key={item.id}
										path='/favorite/overview=:id' 
										component={item.type ? OverviewTv : OverviewMovie} />
									</div>
								: ''}
							</Fragment>
						)
					})}
				</div>
			</Container>
		</section>
	);
}
 
export default memo(Favorite);