'use client'

import { UseLang } from '@/hooks/useLang'
import { FC, useEffect } from 'react'
import Logo from '@/components/elements/Logo'
import Link from 'next/link'
import Menu from './Menu'
import { openMenu, openSearchModal } from '@/context/modals'
import {
	addOverflowHiddenToBody,
	addOverflowHiddenToBodyMenu,
	handleOpenAuthPopup,
	triggerLoginCheck,
} from '@/lib/utils/common'

import CartPopup from './CartPopup/CartPopup'
import HeaderProfile from './HeaderProfile/HeaderProfile'
import { useUnit } from 'effector-react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { useEarthoOne } from '@eartho/one-client-react'
import { $isAuth } from '@/context/auth/state'
import { loginCheckFx } from '@/context/user'
import { $user } from '@/context/user/state'

const Header: FC = () => {
	const isAuth = useUnit($isAuth)
	const loginCheckSpinner = useUnit(loginCheckFx.pending)
	// const { isLoading } = useEarthoOne()
	// const { isConnected } = useEarthoOne()

	const user = useUnit($user)

	console.log(user)

	const { lang, translations } = UseLang()

	const handleOpenMenu = () => {
		addOverflowHiddenToBodyMenu()
		openMenu()
	}

	const handleOpenSearchModal = () => {
		addOverflowHiddenToBody()
		openSearchModal()
	}

	useEffect(() => {
		triggerLoginCheck()
	}, [])

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
					</li>
				</ul>
			</div>
		</header>
	)
}
export default Header
