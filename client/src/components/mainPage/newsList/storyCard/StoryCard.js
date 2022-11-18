import React from 'react';
import {STORY_PAGE} from "../../../../utils/routes";
import {formatTime} from "../../../../utils/formatTime"
import {NavLink} from "react-router-dom";
import './storyCard.scss'

const StoryCard = ({id,score,title,by,time}) => {
	return (
		<NavLink to={STORY_PAGE + '/' + id} key={id} className="story-card">
			<div className="story-card__rating story-card__rating_green">{score || '-'}</div>
			<div className="story-card__title">{title || 'unknown'}</div>
			<div className="story-card__author">by {by || 'unknown'}</div>
			<div className="story-card__date">{formatTime(time)}</div>
		</NavLink>
	);
};

export default StoryCard;