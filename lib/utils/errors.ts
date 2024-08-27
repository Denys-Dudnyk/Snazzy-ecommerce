import { JWTError } from '@/constants/jwt'
import { refreshTokenFx } from '@/context/auth'
import {
	addProductsFromLSToCartFx,
	addProductToCartFx,
	deleteCartItemFx,
	getCartItemsFx,
	updateCartItemCountFx,
} from '@/context/cart'
import { loginCheckFx } from '@/context/user'
import {
	IAddProductsFromLSToCartFx,
	IAddProductToCartFx,
	IDeleteCartItemFx,
	IUpdateCartItemCountFx,
} from '@/types/cart'

export const handleJWTError = async (
	errorName: string,
	repeatRequestAfterRefreshData?: {
		repeatRequestMethodName: string
		payload?: unknown
	}
) => {
	if (errorName === JWTError.EXPIRED_JWT_TOKEN) {
		const auth = JSON.parse(localStorage.getItem('auth') as string)
		const newTokens = await refreshTokenFx({ jwt: auth.refreshToken })

		if (repeatRequestAfterRefreshData) {
			const { repeatRequestMethodName, payload } = repeatRequestAfterRefreshData

			switch (repeatRequestMethodName) {
				case 'getCartItemsFx':
					return await getCartItemsFx({
						jwt: newTokens.accessToken,
					})

				case 'addProductToCartFx':
					return await addProductToCartFx({
						...(payload as IAddProductToCartFx),
						jwt: newTokens.accessToken,
					})

				case 'addProductsFromLSToCartFx':
					return addProductsFromLSToCartFx({
						...(payload as IAddProductsFromLSToCartFx),
						jwt: newTokens.accessToken,
					})

				case 'updateCartItemCountFx':
					return updateCartItemCountFx({
						...(payload as IUpdateCartItemCountFx),
						jwt: newTokens.accessToken,
					})

				case 'deleteCartItemFx':
					return deleteCartItemFx({
						...(payload as IDeleteCartItemFx),
						jwt: newTokens.accessToken,
					})

				case 'loginCheckFx':
					await loginCheckFx({
						jwt: newTokens.accessToken,
					})
					break
			}
		}
	}
}
