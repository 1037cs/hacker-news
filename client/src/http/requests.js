import axios from "axios";

export const getNews = async () => {
	return axios.get('https://hacker-news.firebaseio.com/v0/newstories.json')
}

export const getNew = async (id) => {
	return axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
}