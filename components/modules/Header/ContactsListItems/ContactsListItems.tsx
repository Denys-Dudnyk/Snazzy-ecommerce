import { UseLang } from '@/hooks/useLang'
import Link from 'next/link'
import { FC } from 'react'

const ContactsListItems: FC = () => {
	const { lang, translations } = UseLang()

	return (
		<>
			<li className='nav-menu__accordion__item'>
				<a
					href='tel:+421951469789'
					className='nav-menu__accordion__item__link nav-menu__accordion__item__title'
				>
					+421951469789
				</a>
			</li>
			<li className='nav-menu__accordion__item'>
				<a
					href='mailto:test@example.com'
					className='nav-menu__accordion__item__link'
				>
					E-mail
				</a>
			</li>
			<li className='nav-menu__accordion__item'>
				<Link
					href='https://t.me/dvejer'
					className='nav-menu__accordion__item__link'
					target='_blank'
				>
					{translations[lang].main_menu.tg}
				</Link>
			</li>

			<li className='nav-menu__accordion__item'>
				<Link
					href='https://www.instagram.com'
					className='nav-menu__accordion__item__link'
					target='_blank'
				>
					{translations[lang].main_menu.inst}
				</Link>
			</li>
		</>
	)
}
export default ContactsListItems
