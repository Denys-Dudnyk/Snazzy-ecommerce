'use client'

import { UseLang } from '@/hooks/useLang'
import styles from '../ProductListItem.module.scss'
const ProductComposition = ({ composition }: { composition: string }) => {
	const { lang, translations } = UseLang()

	return (
		<span className={styles.product__composition}>
			{translations[lang].product.composition}: {/* @ts-ignore */}
			{translations[lang].catalog[composition]}
		</span>
	)
}
export default ProductComposition
