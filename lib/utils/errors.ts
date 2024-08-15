import { JWTError } from '@/constants/jwt'
import { refreshTokenFx } from '@/context/auth'
import { loginCheckFx } from '@/context/user'

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
				case 'loginCheckFx':
					await loginCheckFx({
						jwt: newTokens.accessToken,
					})
					break
			}
		}
	}
}
