import React from 'react';
import Header from "../header/Header";
import NewsList from "./newsList/NewsList";

const MainPage = () => {
	return (
		<div className='wrapper'>
			<Header/>
			<NewsList/>
		</div>
	);
};

export default MainPage;