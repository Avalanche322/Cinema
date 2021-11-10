import { Route, Redirect } from "react-router";
import { useSelector } from "react-redux";
import PrivateRoute from '../components/PrivateRoute'
import Header from "../components/app/Header";
import Footer from "../components/app/Footer";
import Home from './Home';
import Prevue from "./Prevue";
import Favorite from "./Favorite";
import Loader from "../components/app/Loader";
import Movies from "./Movies";
import Settings from "./Settings";
import SearchPage from "./SearchPage";
import Movie from "./Movie";

const NonLandingPages = () => {
	const loading_bg = useSelector(state => state.app.loading_bg);
	const currentUser = useSelector(state => state.user.user);
	return (
		<>
		{loading_bg && 
		<div className="loader position-fixed top-0 left-0 bg-dark d-flex justify-content-center align-items-center w-100 h-100">
			<Loader/>
		</div>
		}
			<Header/>
			<main className="main">
				<Route
					exact
					path="/"
					render={() => {
						return (
							currentUser ?
							<Redirect to="/home" /> :
							<Redirect to="/" /> 
						)
					}}
				/>
				<Route path="/prevue" exact component={Prevue} />
				<PrivateRoute path="/home" component={Home} />
				<PrivateRoute path="/settings" component={Settings} />
				<PrivateRoute path="/favorite" component={Favorite} />
				<PrivateRoute path="/contents/:categoryUrl" component={Movies} />
				<PrivateRoute path="/search=:query" component={SearchPage} />
				<PrivateRoute path="/content/:type/overview=:id" component={Movie} />
			</main>
			<Footer/>
		</>
	);
}
 
export default NonLandingPages;