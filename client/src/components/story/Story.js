import React, {useEffect} from 'react';
import './story.scss'
import Comment from "./comment/Comment";
import {useParams} from "react-router-dom/cjs/react-router-dom";
import {getNew} from "../../http/requests";
import {trackPromise} from 'react-promise-tracker';
import Loader from '../loader/Loader';
import {useDispatch, useSelector} from "react-redux";
import {formatTime} from "../../functions/formatTime";
import arrow from '../../assets/arrow.svg'
import {NavLink} from "react-router-dom";
import {MAIN_PAGE} from "../../utils/routes";

const Story = () => {
	const {id} = useParams()
	const dispatch = useDispatch()

	const story = useSelector(state => state.story)
	const commentsIds = useSelector(state => state.commentsIds)

	const area = 'STORY'

	useEffect(() => {
		trackPromise(
			getNew(id).then(({data}) => {
				dispatch({type: 'SET_STORY', payload: data})
				if (data.kids && data.kids.length !== 0) {
					dispatch({type: 'GET_COMMENTS-IDS', payload: data.kids})
				}
			}),'STORY')
	}, [])

	//willUnmount
	useEffect(() => {
		return () => {
			dispatch({type: 'DELETE_STORY'})
			dispatch({type: 'DELETE_COMMENTS-IDS'})
		}
	}, [])

	return (
		<div className='story'>
			<Loader area={area}/>
			<div className="story-header">
				<NavLink className='back-button' to={MAIN_PAGE}>
					<img className='back-button__icon' src={arrow} alt='Go back to news'/>
					<div className='back-button__title'>Back to news</div>
				</NavLink>
				<a href={story.url} target='_blank' rel="noreferrer"><h1 className="story__title">{story.title}</h1>
					<span className='story__url'>{story.url ? `(${new URL(story.url).hostname})` : ''}</span></a>
				<div className="story__created">by {story.by}, {formatTime(story.time)}</div>
			</div>

			<hr className="line"/>

			<div className="story-comments">
				<div className="comment-count">{commentsIds.length} comments</div>
				{commentsIds.map(elem =>
					<Comment key={elem} id={elem}/>
				)}
			</div>
		</div>
	);
};

export default Story;