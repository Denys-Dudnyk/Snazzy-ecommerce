'use client'
import { IUser } from '@/types/user'
import {
	user,
	loginCheckFx,
	updateUsername,
	updateUserImage,
	updateUserEmail,
} from '.'

export const $user = user
	.createStore<IUser>({} as IUser)
	.on(loginCheckFx.done, (_, { result }) => result)
	.on(updateUsername, (state, name) => ({ ...state, name }))
	.on(updateUserImage, (state, image) => ({ ...state, image }))
	.on(updateUserEmail, (state, email) => ({ ...state, email }))
