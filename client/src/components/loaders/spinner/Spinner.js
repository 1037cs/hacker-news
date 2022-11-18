import React from 'react';
import './spinner.scss'
import {usePromiseTracker} from "react-promise-tracker";
import {ColorRing} from "react-loader-spinner";

const Spinner = ({area}) => {
	const {promiseInProgress} = usePromiseTracker({area: area});

	return (
		<div className='spinner' style={promiseInProgress ? {display: 'flex'} : {display: 'none'}}>

				<ColorRing
					visible={true}
					height="80"
					width="80"
					ariaLabel="blocks-loading"
					wrapperStyle={{}}
					wrapperClass="blocks-wrapper"
					colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
				/>
			<div className='spinner-text'>News is loading...</div>
		</div>
	);
};

export default Spinner;