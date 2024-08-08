import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faFacebook,
	faGithub,
	faGoogle,
	faLinkedin,
	faTwitch,
	faTwitter,
	faVk,
	faXTwitter,
	faYandex,
} from '@fortawesome/free-brands-svg-icons'
import { FcGoogle } from 'react-icons/fc'

const AuthPopupSocials = ({
	handleSignUpWithOAuth,
}: {
	handleSignUpWithOAuth: VoidFunction
}) => {
	return (
		<div className='cart-body__socials'>
			<button
				className='btn-reset socials__btn gh-color'
				onClick={handleSignUpWithOAuth}
			>
				<FontAwesomeIcon icon={faGithub} size='lg' />
			</button>
			<button
				className='btn-reset socials__btn g-color'
				onClick={handleSignUpWithOAuth}
			>
				<FontAwesomeIcon icon={faGoogle} size='lg' />
			</button>

			<button
				className='btn-reset socials__btn f-color'
				onClick={handleSignUpWithOAuth}
			>
				<FontAwesomeIcon icon={faFacebook} size='lg' />
			</button>
			<button
				className='btn-reset socials__btn tw-color'
				onClick={handleSignUpWithOAuth}
			>
				<FontAwesomeIcon icon={faXTwitter} size='lg' />
			</button>
		</div>
	)
}
export default AuthPopupSocials
