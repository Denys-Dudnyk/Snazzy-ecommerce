import Logo from '@/components/elements/Logo'
import { UseLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import FooterLinks from './FooterLinks/FooterLinks'
import Link from 'next/link'

const Footer = () => {
	const { lang, translations } = UseLang()
	const isMedia950 = useMediaQuery(950)
	const isMedia640 = useMediaQuery(640)
	return (
		<footer className='footer'>
			<div className='footer__top'>
				<div className='container footer__top__container'>
					<div className='footer__logo'>
						<Logo />
					</div>

					<div className='footer__contacts'>
						<span>
							<a href='tel:+421951469789'>+421951469789</a>
						</span>
						<span>
							<a href='mailto:mail@mail.com'>mail@mail.com</a>
						</span>
						{isMedia950 && <FooterLinks />}
					</div>
					{!isMedia950 && <FooterLinks />}

					<ul className='list-reset footer__socials'>
						<li className='footer__socials__item'>
							<a
								href='https://telegram.org'
								className='footer__socials__item__link'
							/>
						</li>
						<li className='footer__socials__item'>
							<a
								href='https://www.instagram.com'
								className='footer__socials__item__link'
							/>
						</li>
						<li className='footer__socials__item'>
							<a
								href='https://www.youtube.com'
								className='footer__socials__item__link'
							/>
						</li>
					</ul>
				</div>
			</div>
			<div className='footer__bottom'>
				<div className='container footer__bottom__container'>
					<div className='footer__copyright'>
						© 2023 ПАО {translations[lang].footer.copyright}
						<br />
						(18+)
					</div>
					<div className='footer__policy'>
						<div className='footer__policy__inner'>
							<Link href={'/data-processing-policy'}>
								{translations[lang].footer.policy}
							</Link>
							<Link href={'/data-processing-privacy'}>
								{translations[lang].footer.privacy}
							</Link>
						</div>
						{/* {isMedia640 && (
							<FooterMobileLink text={translations[lang].footer.full_version} />
						)} */}
					</div>

					{/* {!isMedia640 && (
						<FooterMobileLink text={translations[lang].footer.mobile_version} />
					)} */}
				</div>
			</div>
		</footer>
	)
}
export default Footer
