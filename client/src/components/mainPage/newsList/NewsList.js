import React, {useEffect} from 'react';
import './newsList.scss'
import {useDispatch, useSelector} from "react-redux";
import {getNew, getNews} from "../../../http/requests";
import StoryCard from "./storyCard/StoryCard";

const NewsList = () => {
	const news = useSelector(state => state.news)
	const stories = useSelector(state => state.stories)
	const dispatch = useDispatch()


	useEffect(() => {
		if (stories)
			dispatch({type: 'DELETE_NEWS'})
		news.map(id => {
			getNew(id).then(data => {
				dispatch({type: 'ADD_NEWS', payload: data.data})
			})
		})
	}, [news])

	useEffect(() => {
		const interval = setInterval(async () => {
			const data = await getNews()
			dispatch({type: 'GET_NEWS', payload: data.data.slice(0, 100)})
			console.log('НОВОСТИ ОБНОВЛЕНЫ')
		}, 60000)
		return () => clearInterval(interval)
	}, [])

	//willUnmount
	useEffect(() => {
		return () => {
			dispatch({type: 'DELETE_NEWS'})
		}
	}, [])

	return (
		<main className='news-list'>
			{stories.map(elem =>
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

