import './app.scss';
import {BrowserRouter} from "react-router-dom";
import Router from "../router/Router";
import {useEffect} from "react";
import {getNew, getNews} from "../../http/requests";
import {useDispatch} from "react-redux";
import {trackPromise} from "react-promise-tracker";

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		trackPromise(getNews().then(data => {
			data.data.slice(0, 100).map(id => {
				trackPromise(
				getNew(id).then(data => {
					dispatch({type: 'ADD_NEWS', payload: data.data})
				}),'MAIN')
			})
		}),'MAIN')

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
