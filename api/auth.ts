import { createEffect } from 'effector'
import toast from 'react-hot-toast'
import instance from './apiInstance'
import { onAuthSuccess } from '@/lib/utils/auth'
import { ISignUpFx } from '@/types/authPopup'

export const signUpFx = createEffect(
	async ({ name, password, email }: ISignUpFx) => {
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

export const signInFx = createEffect(async ({ email, password }: ISignUpFx) => {
	const { data } = await instance.post('/api/users/login', { email, password })
	if (data.warningMessage) {
		toast.error(data.warningMessage)
		return
	}

	onAuthSuccess("You're logged in!", data)

	return data
})
