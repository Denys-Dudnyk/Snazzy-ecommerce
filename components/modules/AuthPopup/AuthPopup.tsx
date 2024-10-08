import { useState } from 'react'
import AuthPopupRegistration from './AuthPopupRegistration/AuthPopupRegistration'
import AuthPopupLogin from './AuthPopupLogin/AuthPopupLogin'
import { useEarthoOne } from '@eartho/one-client-react'

const AuthPopup = () => {
	const [isAuthSwitched, setIsAuthSwitched] = useState(false)
	const [isSignInActive, setIsSignInActive] = useState(false)
	const [isSignUpActive, setIsSignUpActive] = useState(true)
	const { isConnected } = useEarthoOne()

	const toggleAuth = () => {
		setIsAuthSwitched(!isAuthSwitched)
		setIsSignInActive(!isSignInActive)
		setIsSignUpActive(!isSignUpActive)
	}

	return (
		<div className='container auth-popup'>
			<div>
				<div className='starsec'></div>
				<div className='starthird'></div>
				<div className='starfourth'></div>
				<div className='starfifth'></div>
			</div>

			<div className={`auth-popup__card ${isAuthSwitched ? 'switched' : ''}`}>
				<div className='auth-popup__card__inner'>
					<AuthPopupRegistration
						toggleAuth={toggleAuth}
						isSideActive={isSignUpActive}
					/>
					<AuthPopupLogin
						toggleAuth={toggleAuth}
						isSideActive={isSignInActive}
					/>
				</div>
			</div>
		</div>
	)
}
export default AuthPopup
