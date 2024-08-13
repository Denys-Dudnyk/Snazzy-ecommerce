'use client'

import { UseLang } from '@/hooks/useLang'
import { FC } from 'react'
import Logo from '@/components/elements/Logo'
import Link from 'next/link'
import Menu from './Menu'
import { openMenu, openSearchModal } from '@/context/modals'
import {
	addOverflowHiddenToBody,
	addOverflowHiddenToBodyMenu,
	handleOpenAuthPopup,
} from '@/lib/utils/common'

import CartPopup from './CartPopup/CartPopup'
import HeaderProfile from './HeaderProfile/HeaderProfile'
import { useUnit } from 'effector-react'
import { $isAuth } from '@/context/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Header: FC = () => {
	const isAuth = useUnit($isAuth)
	const loginCheckSpinner = false

	const { lang, translations } = UseLang()

	const handleOpenMenu = () => {
		addOverflowHiddenToBodyMenu()
		openMenu()
	}

	const handleOpenSearchModal = () => {
		addOverflowHiddenToBody()
		openSearchModal()
	}

	return (
		<header className='header'>
			<div className='container header__container'>
				<button className='btn-reset header__burger' onClick={handleOpenMenu}>
					{translations[lang].header.menu_btn}
				</button>
				<Menu />
				<div className='header__logo'>
					<Logo />
				</div>
				<ul className='header__links list-reset'>
					<li className='header__links__item'>
						<button
							className='btn-reset header__links__item__btn header__links__item__btn--search'
							onClick={handleOpenSearchModal}
						/>
					</li>
					<li className='header__links__item'>
						<Link
							href='/favorites'
							className='header__links__item__btn header__links__item__btn--favorites'
						/>
					</li>
					<li className='header__links__item'>
						<Link
							href='/comparison'
							className='header__links__item__btn header__links__item__btn--compare'
						/>
					</li>
					<li className='header__links__item'>
						<CartPopup />
					</li>
					<li className='header__links__item header__links__item__btn--profile'>
						{isAuth ? (
							<HeaderProfile />
						) : loginCheckSpinner ? (
							<FontAwesomeIcon icon={faSpinner} spin />
						) : (
							<button
								className='btn-reset header__links__item__btn header__links__item__btn--profile'
								onClick={handleOpenAuthPopup}
							/>
						)}

						{/* <Link
							href='/profile'
							className='header__links__item__btn header__links__item__btn--profile'
						/> */}
					</li>
				</ul>
			</div>
		</header>
	)
}
export default Header
