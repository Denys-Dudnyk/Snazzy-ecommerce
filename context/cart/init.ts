import { sample } from 'effector'
import {
	addProductsFromLSToCart,
	addProductsFromLSToCartFx,
	addProductToCart,
	addProductToCartFx,
	deleteCartItemFx,
	deleteProductFromCart,
	updateCartItemCount,
	updateCartItemCountFx,
} from '.'
import { $cart } from './state'

sample({
	clock: addProductToCart,
	source: $cart,
	fn: (_, data) => data,
	target: addProductToCartFx,
})

sample({
	clock: addProductsFromLSToCart,
	source: $cart,
	fn: (_, data) => data,
	target: addProductsFromLSToCartFx,
})

sample({
	clock: updateCartItemCount,
	source: $cart,
	fn: (_, data) => data,
	target: updateCartItemCountFx,
})

sample({
	clock: deleteProductFromCart,
	source: $cart,
	fn: (_, data) => data,
	target: deleteCartItemFx,
})
