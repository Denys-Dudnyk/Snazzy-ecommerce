import { createEffect } from 'effector'
import toast from 'react-hot-toast'
import instance from './apiInstance'
import { onAuthSuccess } from '@/lib/utils/auth'
import { ISignUpFx } from '@/types/authPopup'

export const oauthFx = createEffect(
	async ({ name, password, email }: ISignUpFx) => {
		try {
			const { data } = await instance.post('/api/users/oauth', {
				name,
				password,
				email,
			})

			await instance.post('/api/users/email', {
				email,
				password,
			})

			onAuthSuccess("You're logged in!", data)

			return data.user
		} catch (error) {
			toast.error((error as Error).message)
		}
	}
)

export const signUpFx = createEffect(
	async ({ name, password, email, isOAuth }: ISignUpFx) => {
		if (isOAuth) {
			await oauthFx({
				email,
				password,
				name,
			})
			return
		}

		const { data } = await instance.post('/api/users/signup', {
			name,
			password,
			email,
		})

		if (data.warningMessage) {
			toast.error(data.warningMessage)
			return
		}

		onAuthSuccess('Registration was successful!', data)

		return data
	}
)

export const signInFx = createEffect(
	async ({ email, password, isOAuth }: ISignUpFx) => {
		if (isOAuth) {
			await oauthFx({
				email,
				password,
			})
			return
		}

		const { data } = await instance.post('/api/users/login', {
			email,
			password,
		})

		if (data.warningMessage) {
			toast.error(data.warningMessage)
			return
		}

		onAuthSuccess("You're logged in!", data)

		return data
	}
)
