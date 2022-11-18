import React, {useEffect, useState} from 'react';
import './comment.scss'
import {formatTime} from "../../../utils/formatTime";
import {getNew} from "../../../http/requests";
import {trackPromise} from "react-promise-tracker";
import rectangle from '../../../assets/rect.svg'

const Comment = ({id, child}) => {
	const [currenComment, setCurrentComment] = useState({})
	const [show, setShow] = useState(false)


	useEffect(() => {
		trackPromise(
			getNew(id).then(({data}) =>
				setCurrentComment(data)
			),)
	}, [])

	return (
		<div className='comment-wrapper' style={child && {marginLeft: '60px'}}>
			<div className='comment'>
				<div
					className="comment__created">{currenComment.by || 'by unknown'}, {formatTime(currenComment.time)}</div>
				<p className="comment__text" dangerouslySetInnerHTML={{__html: currenComment.text || 'unknown'}}/>
			</div>
			{!show && currenComment.kids ?
				<div onClick={() => setShow(true)} className='view-replies-wrapper'>
					<img alt='' src={rectangle}/>
					<div className='view-replies-button'>View replies</div>
				</div>
				: ''}
			{show && currenComment.kids ?
				currenComment.kids.map(elem =>
					<Comment key={elem} id={elem} child={true}/>)
				: ''}
		</div>
	);
};


export default Comment;