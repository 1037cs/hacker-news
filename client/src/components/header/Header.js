import React from 'react';
import './header.scss';
import refreshIcon from '../../assets/refreshIcon.svg'
import {useDispatch} from "react-redux";
import {getNews} from "../../http/requests";

const Header = () => {
	const dispatch = useDispatch()

	const refreshNews = async () => {
		const data = await getNews()
		dispatch({type: 'GET_NEWS', payload: data.data.slice(0, 100)})
		console.log('НОВОСТИ ЗАГРУЖЕНЫ')
	}

	return (
		<header className='header'>
			<div className='header__logo logo'>HackerNews</div>
			<img src={refreshIcon} className='header__refreshButton' onClick={() => refreshNews()} alt=''/>
		</header>
	);
};

export default Header;