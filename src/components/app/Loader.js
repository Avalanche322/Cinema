import { Spinner } from "react-bootstrap";

const Loader = () => {
	return (
		<div className="loader__spiner d-flex justify-content-center align-items-center w-100">
			<Spinner animation="grow" />
		</div>
	);
}
 
export default Loader;