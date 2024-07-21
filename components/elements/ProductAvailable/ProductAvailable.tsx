import { IProductAvailableProps } from '@/types/elements'

import styles from '@/components/modules/ProductListItem/ProductListItem.module.scss'
import { UseLang } from '@/hooks/useLang'

const ProductAvailable = ({ vendorCode, inStock }: IProductAvailableProps) => {
	const isInStock = +inStock > 0
	const { lang, translations } = UseLang()

	return (
		<div className={styles.product}>
			<span
				className={`${styles.product__stock} ${
					isInStock ? styles.product__stock__green : styles.product__stock__red
				}`}
			>
				{isInStock
					? translations[lang].product.available
					: translations[lang].product.not_available}
			</span>

			<span className={styles.product__code}>
				{translations[lang].product.vendor_code}
				.: {vendorCode}
			</span>
		</div>
	)
}
export default ProductAvailable
