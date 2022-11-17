export const formatTime = (date) => {
	const time = new Date(date * 1000)
	const day = time.getDate()
	const month = time.getMonth()+1
	const year = time.getFullYear()
	return [day,'.', month,'.', year]
}