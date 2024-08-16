import { ICartItem } from '@/types/cart'
import { cart, setCartFromLS } from '.'

export const $cart = cart.createStore<ICartItem[]>([])

export const $cartFromLs = cart
	.createStore<ICartItem[]>([])
	.on(setCartFromLS, (_, cart) => cart)
