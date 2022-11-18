import React, {useEffect} from 'react';
import Header from "../header/Header";
import NewsList from "./newsList/NewsList";

const MainPage = () => {
	useEffect(()=>{
		document.title = 'HackerNews'
	},[])
	return (
		<div className='wrapper'>
			<Header/>
			<NewsList/>
		</div>
	);
};

export default MainPage;