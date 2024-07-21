import {
	formatPrice,
	removeOverflowHiddenFromBodyMenu,
} from '@/lib/utils/common'
import styles from './QuickViewModal.module.scss'
import { closeQuickViewModal } from '@/context/modals'
import QuickViewSlider from './QuickViewSlider/QuickViewSlider'
import { useCartAction } from '@/hooks/useCartAction'
import { useProductImages } from '@/hooks/useProductImages'
import ProductAvailable from '@/components/elements/ProductAvailable/ProductAvailable'
import ProductColor from '../ProductListItem/ProductColor/ProductColor'
import ProductComposition from '../ProductListItem/ProductComposition/ProductComposition'
const QuickViewModal = () => {
	const { product } = useCartAction()
	const images = useProductImages(product)

	const handleCloseModal = () => {
		removeOverflowHiddenFromBodyMenu()
		closeQuickViewModal()
	}

	return (
		<div className={styles.modal}>
			<button
				className={`btn-reset ${styles.modal__close}`}
				onClick={handleCloseModal}
			/>
			<div className={styles.modal__left}>
				<QuickViewSlider images={images} />
			</div>

			<div className={styles.modal__right}>
				<h3 className={styles.modal__right__title}>{product.name}</h3>
				<div className={styles.modal__right__price}>
					{formatPrice(+product.price)} €
				</div>

				<div className={styles.modal__right__info}>
					<ProductAvailable
						vendorCode={product.vendorCode}
						inStock={+product.inStock}
					/>
					<ProductColor color={product.characteristics.color} />

					{product.characteristics?.composition && (
						<ProductComposition
							composition={product.characteristics.composition}
						/>
					)}
				</div>
			</div>
		</div>
	)
}
export default QuickViewModal
