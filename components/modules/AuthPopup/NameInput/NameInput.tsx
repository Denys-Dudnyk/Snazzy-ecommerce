import { UseLang } from '@/hooks/useLang'
import { nameValidationRules } from '@/lib/utils/auth'
import { IAuthInput } from '@/types/authPopup'

const NameInput = ({ register, errors }: IAuthInput) => {
	const { lang, translations } = UseLang()

	return (
		<div className='form__block'>
			<input
				type='text'
				className='form__block__input'
				placeholder={translations[lang].auth_popup.name}
				{...register(
					'name',
					nameValidationRules(
						translations[lang].validation.invalid_value,
						translations[lang].validation.requiredName
					)
				)}
			/>
		</div>
	)
}
export default NameInput
