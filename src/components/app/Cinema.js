import ReactPlayer from "react-player";
import { FaTimes } from "react-icons/all";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const Cinema = ({url, close}) => {
	const loading = useSelector(state => state.app.loading);
	return ( 
		<div className="cinema position-fixed bottom-0 start-0 d-flex justify-content-center align-items-center">
			{!url && 
				<div className="overview__not-found overview-not-found">
					<h2 className="overview-not-found__title">404</h2>
					<h3 className="overview-not-found__text">Not found film</h3>
				</div>
			}
			{loading && <Loader/>}
			{url && <ReactPlayer className="cinema__video" url={url} controls={true} />}
			<FaTimes className="position-absolute overview__close" onClick={close.bind(null)} />
		</div> 
	);
}
 
export default Cinema;