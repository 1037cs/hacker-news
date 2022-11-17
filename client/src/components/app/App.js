import './app.scss';
import {useEffect} from "react";
import {getNews} from "../../http/requests";
import {useDispatch} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import Router from "../router/Router";

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		getNews().then(data => {
			dispatch({type: 'GET_NEWS', payload: data.data.slice(0, 100)})
		})
	}, [])

	return (
		<BrowserRouter>
			<div className='wrapper'>
				<Router/>
			</div>
		</BrowserRouter>
	);
}

export default App;
