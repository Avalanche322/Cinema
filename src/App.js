import { Route, Switch, Router } from "react-router-dom";
import SingIn from "./pages/SingIn";
import NonLandingPages from "./pages/NonLandingPages";
import SingUp from "./pages/SingUp";
import Platform from "./pages/singUp/Platform";
import Payment from "./pages/singUp/Payment";
import { history } from "./helpers/history";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unsubscribe } from "./redux/actions";
import Message from "./components/app/Message";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
	const dispatch = useDispatch();
	const error = useSelector(state => state.app.error);
	useEffect(() =>{
		dispatch(unsubscribe());
	// eslint-disable-next-line
	},[])
  return (
    <div className='wrapper min-vh-100 w-100 overflow-hidden d-flex flex-column'>
		<Message text={error} />
		<Router history={history}>
			<Switch>
				<Route exact path="/sing-in" component={SingIn} />
				<Route exact path="/sing-up" component={SingUp} />
				<Route exact path="/sing-up/platform" component={Platform} />
				<Route exact path="/sing-up/payment" component={Payment} />
				<Route exact path="/forgotPassword" component={ForgotPassword} />
				<Route>
					<NonLandingPages/>
				</Route>
			</Switch>
		</Router>
	 </div>
  );
}

export default App;