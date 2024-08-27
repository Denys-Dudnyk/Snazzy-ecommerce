import { UseLang } from '@/hooks/useLang'
import AuthPopupClose from '../AuthPopupClose/AuthPopupClose'
import { IAuthSideProps, IInputs } from '@/types/authPopup'
import { useAuthForm } from '@/hooks/useAuthForm'

import { handleSignUp, singUpFx } from '@/context/auth'

import NameInput from '../AuthInputs/NameInput'
import EmailInput from '../AuthInputs/EmailInput'
import PasswordInput from '../AuthInputs/PasswordInput'
import AuthPopupSocials from '../AuthPopupSocials/AuthPopupSocials'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const AuthPopupRegistration = ({
	toggleAuth,
	isSideActive,
}: IAuthSideProps) => {
	const { lang, translations } = UseLang()

	const { spinner, register, errors, handleSubmit, handleSignupWithOAuth } =
		useAuthForm(singUpFx.pending, isSideActive, handleSignUp)

	const submitForm = (data: IInputs) =>
		handleSignUp({
			name: data.name,
			email: data.email,
			password: data.password,
			isOAuth: false,
		})

	return (
		<div className='card-front'>
			<AuthPopupClose />

			<div className='card-body wow-bg'>
				<h3 className='card-body__title'>
					{translations[lang].auth_popup.registration_title}
				</h3>
				<p className='card-body__description'>
					{translations[lang].auth_popup.registration_description}
				</p>

				<form onSubmit={handleSubmit(submitForm)}>
					<NameInput register={register} errors={errors} />
					<EmailInput register={register} errors={errors} />
					<PasswordInput register={register} errors={errors} />
					<div className='card-body__inner'>
						<div className='inner__top'>
							<button className='inner__btn' type='submit' disabled={spinner}>
								{spinner ? (
									// <l-tailspin
									// 	size='16'
									// 	stroke='2'
									// 	stroke-length='0.25'
									// 	bg-opacity='0.1'
									// 	speed='0.9'
									// 	color='white'
									// ></l-tailspin>
									<FontAwesomeIcon icon={faSpinner} spin color='#fff' />
								) : (
									translations[lang].auth_popup.registration_text
								)}
							</button>
						</div>
						<div className='inner__bottom'>
							<span className='inner__bottom__text'>
								{translations[lang].auth_popup.registration_question}
							</span>
							<button
								type='button'
								className='btn-reset inner__switch'
								onClick={toggleAuth}
							>
								{translations[lang].auth_popup.login_text}!
							</button>
						</div>
					</div>
				</form>
				<div className='cart-body__or'>
					<hr className='cart-body__or__line' />
					<span className='cart-body__or__text'>Or</span>
					<hr className='cart-body__or__line' />
				</div>
				<AuthPopupSocials handleSignUpWithOAuth={handleSignupWithOAuth} />
			</div>
		</div>
	)
}
export default AuthPopupRegistration
