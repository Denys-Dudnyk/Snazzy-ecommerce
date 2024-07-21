'use client'

import { UseLang } from '@/hooks/useLang'

import styles from './AllLink.module.scss'

import Link from 'next/link'

const AllLink = () => {
	const { lang, translations } = UseLang()

	return (
		<Link href='/catalog' className={styles.all}>
			<span />
			{translations[lang].common.all_link}
		</Link>
	)
}
export default AllLink
