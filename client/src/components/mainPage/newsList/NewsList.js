import React, {useEffect} from 'react';
import './newsList.scss'
import {useDispatch, useSelector} from "react-redux";
import {getNew, getNews} from "../../../http/requests";
import StoryCard from "./storyCard/StoryCard";
import {trackPromise} from "react-promise-tracker";
import Spinner from "../../loaders/spinner/Spinner";

const NewsList = () => {
	const stories = useSelector(state => state.stories)
	const dispatch = useDispatch()

	function compare( a, b ) {
		if ( a.time > b.time ){
			return -1
		}
		if ( a.time < b.time ){
			return 1
		}
		return 0;
	}

	useEffect(() => {
		const interval = setInterval(async () => {
			dispatch({type:'DELETE_NEWS'})
			trackPromise(getNews().then(data => {
				data.data.slice(0, 100).map(id => {
					trackPromise(getNew(id).then(data => {
						dispatch({type: 'ADD_NEWS', payload: data.data})
					}),'MAIN')
				})
			}),'MAIN')
		}, 60000)
		return () => clearInterval(interval)
	}, [])

	return (
		<main className='news-list'>
			<Spinner area='MAIN'/>
			{stories.sort(compare).map(elem =>
				<StoryCard id={elem.id}
				           key={elem.id}
				           title={elem.title}
				           score={elem.score}
				           by={elem.by}
				           time={elem.time}
				           className="story-card"/>
			)}
		</main>
	);
};

export default NewsList;

