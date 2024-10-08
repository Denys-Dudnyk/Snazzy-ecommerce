'use client'

import { UseLang } from '@/hooks/useLang'
import styles from '../ProductListItem.module.scss'
const ProductColor = ({ color }: { color: string }) => {
	const { lang, translations } = UseLang()

	return (
		<span className={styles.product__color}>
			{/* @ts-ignore */}
			{translations[lang].catalog.color}: {translations[lang].catalog[color]}
		</span>
	)
}
export default ProductColor
