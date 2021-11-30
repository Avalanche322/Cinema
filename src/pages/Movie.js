import { memo } from "react";
import { useParams } from "react-router";
import OverviewMovie from "./OverviewMovie";
import OverviewTv from "./OverviewTv";

const Movie = () => {
	const { type } = useParams();
	return (
		<div className='movie'>
			{type === 'movie' ? <OverviewMovie/> : <OverviewTv/>}
		</div>
	);
}
 
export default memo(Movie);