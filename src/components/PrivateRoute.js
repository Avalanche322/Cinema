import { Route, Redirect } from "react-router-dom"
const PrivateRoute = ({ component: Component, ...rest }) => {
	const user = JSON.parse(localStorage.getItem('user'));
	return (
		<Route
      {...rest}
      render={props => {
        return user ? <Component {...props} /> : <Redirect to="/prevue" />
      }}
    ></Route>
	);
}
 
export default PrivateRoute;