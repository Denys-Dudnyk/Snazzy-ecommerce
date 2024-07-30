import { useState } from 'react'

const AuthPopup = () => {
	const [isAuthSwitched, setIsAuthSwitched] = useState(false)
	const [isSignInActive, setIsSignInActive] = useState(false)
	const [isSignUpActive, setIsSignUpActive] = useState(true)

	const toggleAuth = () => {
		setIsAuthSwitched(!isAuthSwitched)
		setIsSignInActive(!isSignInActive)
		setIsSignUpActive(!isSignUpActive)
	}

	return (
		<div className='auth-popup'>
			<div>
				<div className='starsec'></div>
				<div className='starthird'></div>
				<div className='starfourth'></div>
				<div className='starfifth'></div>
			</div>

			<div className={`auth-popup__card ${isAuthSwitched ? 'switched' : ''}`}>
				<div className='auth-popup__card__inner'></div>
			</div>
		</div>
	)
}
export default AuthPopup
