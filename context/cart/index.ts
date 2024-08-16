import { ICartItem } from '@/types/cart'
import { createDomain } from 'effector'

export const cart = createDomain()

export const loadCartItems = cart.createEvent<{ jwt: string }>()
export const setCartFromLS = cart.createEvent<ICartItem[]>()
