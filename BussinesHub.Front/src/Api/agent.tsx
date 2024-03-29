/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import axios, { AxiosResponse } from 'axios'
import frontendSettings from '../../frontendSettings'

axios.defaults.baseURL = frontendSettings.ApiUrl

const responseBody = (response: AxiosResponse) => response.data

axios.interceptors.request.use((config) => {
	console.log('Intercepting')
	const token = document.cookie
		.split('; ')
		.find((row) => row.startsWith('jwt='))
		?.split('=')[1]
	if (token && config.headers) config.headers.Authorization = `Bearer ${token}`

	return config
})

export const requests = {
	get: (url: string) => axios.get(url).then(responseBody),
	post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
	put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
	delete: (url: string, body: {}) => axios.delete(url, body).then(responseBody),
}
