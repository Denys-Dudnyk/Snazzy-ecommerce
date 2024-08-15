import { $user } from '@/context/user/state'
import { useUnit } from 'effector-react'
import { useState, useEffect } from 'react'

export const useUserAvatar = () => {
	const user = useUnit($user)
	const [src, setSrc] = useState('')

	useEffect(() => {
		if (user.image) {
			setSrc(user.image)
			return
		}

		const oauthAvatar = JSON.parse(
			localStorage.getItem(
				'@@oneclientjs@@::tn277kKqfm1sannQhND9::@@user@@'
			) as string
		)

		console.log(oauthAvatar)

		// const saveAvatar = localStorage.setItem(
		// 	'user',
		// 	JSON.stringify(oauthAvatar.decodedToken.user.photoURL)
		// )

		// console.log(saveAvatar)

		if (!oauthAvatar) {
			return
		}

		setSrc(oauthAvatar.decodedToken.user.photoURL)
	}, [user.image])

	return { src, alt: user.name }
}
