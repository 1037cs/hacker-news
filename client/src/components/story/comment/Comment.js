import React, {useEffect, useState} from 'react';
import './comment.scss'
import {formatTime} from "../../../utils/formatTime";
import {getNew} from "../../../http/requests";
import {trackPromise} from "react-promise-tracker";
import rectangle from '../../../assets/rect.svg'
import {ColorRing} from "react-loader-spinner";

const Comment = ({id, child}) => {
	const [currentComment, setCurrentComment] = useState({})
	const [show, setShow] = useState(false)

	const [load, setLoad] = useState(false)

	useEffect(() => {
		setLoad(true)
		trackPromise(
			getNew(id).then(({data}) =>
				setCurrentComment(data)
			).finally(() => {
				setLoad(false)
			}),)
	}, [])

	return (
		load ? <div className='comment-spinner' style={child && {marginLeft: '60px'}}>
				<ColorRing
					visible={true}
					height="80"
					width="80"
					ariaLabel="blocks-loading"
					wrapperStyle={{}}
					wrapperClass="blocks-wrapper"
					colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
				/>
			</div> :
			<div className='comment-wrapper' style={child && {marginLeft: '60px'}}>
				<div className='comment'>
					<div
						className="comment__created">{currentComment.by || 'by unknown'}, {formatTime(currentComment.time)}</div>
					<p className="comment__text" dangerouslySetInnerHTML={{__html: currentComment.text || 'unknown'}}/>
				</div>
				{!show && currentComment.kids ?
					<div onClick={() => setShow(true)} className='view-replies-wrapper'>
						<img alt='' src={rectangle}/>
						<div className='view-replies-button'>view replies ({currentComment.kids.length})</div>
					</div>
					: ''}
				{show && currentComment.kids ?
					currentComment.kids.map(elem =>
						<Comment key={elem} id={elem} child={true}/>)
					: ''}
			</div>
	);
};


export default Comment;