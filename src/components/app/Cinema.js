import ReactPlayer from "react-player";
import { FaTimes } from "react-icons/all";

const Cinema = ({url, close}) => {
	return ( 
		<div className="cinema position-fixed bottom-0 start-0 d-flex justify-content-center align-items-center">
			{!url && 
				<div  className="overview__not-found overview-not-found">
					<h2 className="overview-not-found__title">404</h2>
					<h3 className="overview-not-found__text">Not found film</h3>
				</div>
			}
			{url && <ReactPlayer className="cinema__video" url={url} controls={true} />}
			<button className="position-absolute overview__close border-0" onClick={close.bind(null)}>
				<FaTimes />
			</button>
		</div> 
	);
}
 
export default Cinema;