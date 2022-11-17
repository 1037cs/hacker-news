import React from 'react';
import './header.scss';
import refreshIcon from '../../assets/refreshIcon.svg'
import {useDispatch} from "react-redux";
import {getNew, getNews} from "../../http/requests";
import {trackPromise} from "react-promise-tracker";

const Header = () => {
	const dispatch = useDispatch()

	const refreshNews = async () => {
		dispatch({type:'DELETE_NEWS'})
		getNews().then(data => {
			data.data.slice(0, 100).map(id => {
				trackPromise(getNew(id).then(data => {
					dispatch({type: 'ADD_NEWS', payload: data.data})
				}),'MAIN')
			})
		})
	}

	return (
		<header className='header'>
			<div className='header__logo logo'>HackerNews</div>
			<img src={refreshIcon} className='header__refreshButton' onClick={() => refreshNews()} alt=''/>
		</header>
	);
};

export default Header;