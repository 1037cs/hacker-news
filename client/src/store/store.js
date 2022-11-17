import {legacy_createStore as createStore} from "redux";

const defaultState = {
	news: [],
	stories:[],
	story:{},
	commentsIds: [],
}

const newsReducer = (state = defaultState, action) => {
	switch (action.type) {
		case 'GET_NEWS':
			return {...state, news: action.payload}
		case 'ADD_NEWS':
			return {...state, stories: [...state.stories,action.payload]}
		case 'DELETE_NEWS':
			return {...state, stories: []}

		case 'SET_STORY':
			return {...state, story: action.payload}
		case 'DELETE_STORY':
			return {...state, story: {}}

		case 'GET_COMMENTS-IDS':
			return {...state, commentsIds: action.payload}
		case 'DELETE_COMMENTS-IDS':
			return {...state, commentsIds: []}

		default:
			return state
	}
}

const store = createStore(newsReducer)

export default store