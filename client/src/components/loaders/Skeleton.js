import React from 'react';
import {usePromiseTracker} from "react-promise-tracker";
import './skeleton.scss'
import ContentLoader from "react-content-loader";

const Skeleton = ({area}) => {
	const {promiseInProgress} = usePromiseTracker({area:area});

	return (
		<div className='loader' style={promiseInProgress ? {display:'flex'} : {display:'none'}}>
			{promiseInProgress ?
				<ContentLoader
					speed={2}
					width={1250}
					height={800}

					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
				>
					<rect x="0" y="50" rx="5" ry="5" width="200" height="40" />
					<rect x="0" y="100" rx="5" ry="5" width="1250" height="120" />
					<rect x="850" y="293" rx="5" ry="5" width="400" height="40" />
					<rect x="0" y="381" rx="5" ry="5" width="1250" height="2" />
					<rect x="0" y="429" rx="5" ry="5" width="200" height="40" />
				</ContentLoader> : null}
		</div>
	);
};

export default Skeleton;