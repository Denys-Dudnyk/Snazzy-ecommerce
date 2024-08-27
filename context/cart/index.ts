import {
	IAddProductsFromLSToCartFx,
	IAddProductToCartFx,
	ICartItem,
	IDeleteCartItemFx,
	IUpdateCartItemCountFx,
} from '@/types/cart'
import { createDomain, createEffect } from 'effector'
import toast from 'react-hot-toast'
import api from '@/api/apiInstance'
import { handleJWTError } from '@/lib/utils/errors'

export const cart = createDomain()

export const loadCartItems = cart.createEvent<{ jwt: string }>()
export const setCartFromLS = cart.createEvent<ICartItem[]>()
export const addProductToCart = cart.createEvent<IAddProductToCartFx>()
export const addProductsFromLSToCart =
	cart.createEvent<IAddProductsFromLSToCartFx>()

export const updateCartItemCount = cart.createEvent<IUpdateCartItemCountFx>()

export const setTotalPrice = cart.createEvent<number>()

export const deleteProductFromCart = cart.createEvent<IDeleteCartItemFx>()

export const getCartItemsFx = createEffect(async ({ jwt }: { jwt: string }) => {
	try {
		const { data } = await api.get('/api/cart/all', {
			headers: { Authorization: `Bearer ${jwt}` },
		})

		if (data?.error) {
			const newData: ICartItem[] = await handleJWTError(data.error.name, {
				repeatRequestMethodName: 'getCartItemsFx',
			})

			return newData
		}

		return data
	} catch (error) {
		toast.error((error as Error).message)
	}
})

export const addProductToCartFx = createEffect(
	async ({ jwt, setSpinner, ...dataFields }: IAddProductToCartFx) => {
		try {
			setSpinner(true)
			const { data } = await api.post('/api/cart/add', dataFields, {
				headers: { Authorization: `Bearer ${jwt}` },
			})

			if (data?.error) {
				const newData: { newCartItem: ICartItem } = await handleJWTError(
					data.error.name,
					{
						repeatRequestMethodName: 'addProductToCartFx',
						payload: { ...dataFields, setSpinner },
					}
				)

				return newData
			}

			toast.success('Added to Shopping Cart!')

			return data
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setSpinner(false)
		}
	}
)

export const addProductsFromLSToCartFx = createEffect(
	async ({ jwt, cartItems }: IAddProductsFromLSToCartFx) => {
		try {
			const { data } = await api.post(
				'/api/cart/add-many',
				{ items: cartItems },
				{
					headers: { Authorization: `Bearer ${jwt}` },
				}
			)

			if (data?.error) {
				const newData: { cartItems: ICartItem[] } = await handleJWTError(
					data.error.name,
					{
						repeatRequestMethodName: 'addProductsFromLSToCartFx',
						payload: { items: cartItems },
					}
				)
				return newData
			}

			loadCartItems({ jwt })
			return data
		} catch (error) {
			toast.error((error as Error).message)
		}
	}
)

export const updateCartItemCountFx = createEffect(
	async ({ jwt, id, setSpinner, count }: IUpdateCartItemCountFx) => {
		try {
			setSpinner(true)
			const { data } = await api.patch(
				`/api/cart/count?id=${id}`,
				{ count },
				{
					headers: { Authorization: `Bearer ${jwt}` },
				}
			)

			if (data?.error) {
				const newData: { count: string; id: string } = await handleJWTError(
					data.error.name,
					{
						repeatRequestMethodName: 'updateCartItemCountFx',
						payload: { id, setSpinner, count },
					}
				)

				return newData
			}

			return data
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setSpinner(false)
		}
	}
)

export const deleteCartItemFx = createEffect(
	async ({ jwt, id, setSpinner }: IDeleteCartItemFx) => {
		try {
			setSpinner(true)
			const { data } = await api.delete(`/api/cart/delete?id=${id}`, {
				headers: { Authorization: `Bearer ${jwt}` },
			})

			if (data?.error) {
				const newData: { id: string } = await handleJWTError(data.error.name, {
					repeatRequestMethodName: 'deleteCartItemFx',
					payload: { id, setSpinner },
				})

				return newData
			}

			toast.success('Successfully deleted from Cart!')

			return data
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setSpinner(false)
		}
	}
)
