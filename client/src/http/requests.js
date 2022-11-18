import {$host} from "./index";

export const getNews = async () => {
	return $host.get('/api/getNews')
}

export const getNew = async (id) => {
	return $host.get(`/${id}`)
}