import axios from 'axios'

export const getContentType = () => ({
	'Content-Type': 'application/json',
})

const instance = axios.create({
	baseURL: '',
})

export default instance
