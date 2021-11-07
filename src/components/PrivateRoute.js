import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
const PrivateRoute = ({ component: Component, ...rest }) => {
	const user = useSelector(state => state.user.user);
	const has_plan = useSelector(state => state.user.settings?.has_plan);
	const has_card = useSelector(state => state.user.settings?.has_card);
	const isUser = user && has_plan && has_card;
	return (
		<Route
      {...rest}
      render={props => {
        return isUser ? <Component {...props} /> : <Redirect to="/prevue" />
      }}
    ></Route>
	);
}
 
export default PrivateRoute;