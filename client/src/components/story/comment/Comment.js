import React, {useEffect, useState} from 'react';
import './comment.scss'
import {formatTime} from "../../../functions/formatTime";
import {getNew} from "../../../http/requests";
import {trackPromise} from "react-promise-tracker";

const Comment = ({id, child}) => {
	const [currenComment, setCurrentComment] = useState({})
	const [show, setShow] = useState(false)

	const area = 'COMMENT'

	useEffect(() => {
		trackPromise(
			getNew(id).then(({data}) =>
				setCurrentComment(data)
			),area)
	}, [])
	return (
		<div className='comment-wrapper' style={child && {marginLeft: '60px'}}>
			<div className='comment'>
				<div
					className="comment__created">{currenComment.by || 'by unknown'}, {formatTime(currenComment.time)}</div>
				<div className="comment__text" dangerouslySetInnerHTML={{__html: currenComment.text || 'unknown'}}/>
			</div>
			{!show && currenComment.kids ?
				<div onClick={() => setShow(true)}>View answers</div>
				: ''}
			{show && currenComment.kids ?
				currenComment.kids.map(elem =>
					<Comment key={elem} id={elem} child={true}/>)
				: ''}
		</div>
	);
};


export default Comment;