import { ICartItem } from '@/types/cart'
import {
	addProductsFromLSToCartFx,
	addProductToCartFx,
	cart,
	deleteCartItemFx,
	setCartFromLS,
	setTotalPrice,
	updateCartItemCountFx,
} from '.'

export const $cart = cart
	.createStore<ICartItem[]>([])
	.on(addProductsFromLSToCartFx.done, (_, { result }) => result.items)
	.on(addProductToCartFx.done, (cart, { result }) => [
		...new Map(
			[...cart, result.newCartItem].map(item => [item.clientId, item])
		).values(),
	])
	.on(updateCartItemCountFx.done, (cart, { result }) =>
		cart.map(item =>
			item._id === result.id ? { ...item, count: result.count } : item
		)
	)
	.on(deleteCartItemFx.done, (cart, { result }) =>
		cart.filter(item => item._id !== result.id)
	)

export const $cartFromLs = cart
	.createStore<ICartItem[]>([])
	.on(setCartFromLS, (_, cart) => cart)

export const $totalPrice = cart
	.createStore<number>(0)
	.on(setTotalPrice, (_, value) => value)
