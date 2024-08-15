import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faFacebook,
	faGithub,
	faGoogle,
	faXTwitter,
} from '@fortawesome/free-brands-svg-icons'

import React from 'react'

const AuthPopupSocials = ({
	handleSignUpWithOAuth,
}: {
	handleSignUpWithOAuth: (provider: string) => void
}) => {
	return (
		<div className='cart-body__socials'>
			<button
				className='btn-reset socials__btn gh-color'
				onClick={() => handleSignUpWithOAuth('github')}
			>
				<FontAwesomeIcon icon={faGithub} size='lg' />
			</button>
			<button
				className='btn-reset socials__btn g-color'
				onClick={() => handleSignUpWithOAuth('google')}
			>
				<FontAwesomeIcon icon={faGoogle} size='lg' />
			</button>

			<button
				className='btn-reset socials__btn f-color'
				onClick={() => handleSignUpWithOAuth('facebook')}
			>
				<FontAwesomeIcon icon={faFacebook} size='lg' />
			</button>
			<button
				className='btn-reset socials__btn tw-color'
				onClick={() => handleSignUpWithOAuth('twitter')}
			>
				<FontAwesomeIcon icon={faXTwitter} size='lg' />
			</button>
		</div>
	)
}
export default AuthPopupSocials
