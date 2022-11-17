import React from 'react';
import { Switch } from "react-router-dom"
import { Route } from "react-router-dom"
import Story from "../story/Story";
import MainPage from "../mainPage/MainPage";

const Router = () => {
	return (
		<Switch>
			<Route path={'/'} component={MainPage} exact/>
			<Route path={'/story/:id'} component={Story} exact/>
		</Switch>
	);
};

export default Router;