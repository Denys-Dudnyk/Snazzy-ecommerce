import { createEffect } from 'effector'
import instance from './apiInstance'

export const getNewProductsFx = createEffect(async () => {
	const { data } = await instance.get('/api/goods/new')

	return data
})

export const getBestsellerProductsFx = createEffect(async () => {
	const { data } = await instance.get('/api/goods/bestsellers')

	return data
})
