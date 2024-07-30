import { createDomain } from 'effector'

const auth = createDomain()

export const openAuthPopup = auth.createEvent()
export const closeAuthPopup = auth.createEvent()

export const $openAuthPopup = auth
	.createStore<boolean>(false)
	.on(openAuthPopup, () => true)
	.on(closeAuthPopup, () => false)
