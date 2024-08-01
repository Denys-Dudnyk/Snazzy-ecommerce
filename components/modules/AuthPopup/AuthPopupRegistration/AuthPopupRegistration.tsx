import { UseLang } from '@/hooks/useLang'
import AuthPopupClose from '../AuthPopupClose/AuthPopupClose'
import { IAuthSideProps, IInputs } from '@/types/authPopup'
import { useAuthForm } from '@/hooks/useAuthForm'
import { signUpFx } from '@/api/auth'
import { handleSignUp } from '@/context/auth'

const AuthPopupRegistration = ({
	toggleAuth,
	isSideActive,
}: IAuthSideProps) => {
	const { lang, translations } = UseLang()

	const { spinner, register, errors, handleSubmit } = useAuthForm(
		signUpFx.pending,
		isSideActive,
		handleSignUp
	)

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

				<form onSubmit={handleSubmit(submitForm)}></form>
			</div>
		</div>
	)
}
export default AuthPopupRegistration
