import {
	formatPrice,
	removeOverflowHiddenFromBodyMenu,
} from '@/lib/utils/common'
import styles from './QuickViewModal.module.scss'
import stylesForProduct from '../ProductListItem/ProductListItem.module.scss'

import { closeQuickViewModal } from '@/context/modals'
import QuickViewSlider from './QuickViewSlider/QuickViewSlider'
import { useCartAction } from '@/hooks/useCartAction'
import { useProductImages } from '@/hooks/useProductImages'
import ProductAvailable from '@/components/elements/ProductAvailable/ProductAvailable'
import ProductColor from '../ProductListItem/ProductColor/ProductColor'
import ProductComposition from '../ProductListItem/ProductComposition/ProductComposition'
import { UseLang } from '@/hooks/useLang'
import ProductSizeTableBtn from '../ProductListItem/ProductSizeTableBtn/ProductSizeTableBtn'
import ProductSizesItem from '../ProductListItem/ProductSizesItem/ProductSizesItem'
import ProductCounter from '../ProductListItem/ProductCounter/ProductCounter'
import AddToCartBtn from '../ProductListItem/AddToCartBtn/AddToCartBtn'
import Link from 'next/link'
import ProductItemActionBtn from '@/components/elements/ProductItemActionBtn/ProductItemActionBtn'
import { ICartItem } from '@/types/cart'
const QuickViewModal = () => {
	const { lang, translations } = UseLang()
	const {
		product,
		selectedSize,
		setSelectedSize,
		handleAddToCart,
		addToCartSpinner,
		updateCountSpinner,
		allCurrentCartItemCount,
		currentCartItems,
		setCount,
		existingItem,
		count,
	} = useCartAction()
	const images = useProductImages(product)

	const handleCloseModal = () => {
		removeOverflowHiddenFromBodyMenu()
		closeQuickViewModal()
	}

	const addToCart = () => handleAddToCart(count)

	return (
		<div className={styles.modal}>
			<button
				className={`btn-reset ${styles.modal__close}`}
				onClick={handleCloseModal}
			/>
			<div className={styles.modal__actions}>
				<ProductItemActionBtn
					text={translations[lang].product.add_to_favorites}
					iconClass='actions__btn_favorite'
					withTooltip={false}
				/>
				<ProductItemActionBtn
					text={translations[lang].product.add_to_comparison}
					iconClass='actions__btn_comparison'
					withTooltip={false}
				/>
			</div>
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

					{Object.keys(product.sizes).length ? (
						<div className={styles.modal__right__info__size}>
							<div className={styles.modal__right__info__size__inner}>
								<span className={stylesForProduct.product__size_title}>
									{translations[lang].catalog.size}
								</span>
								<ProductSizeTableBtn
									sizes={product.sizes}
									type={product.type}
									className={`sizes-table-btn ${styles.modal__right__info__sizes_btn}`}
								/>
							</div>
							<ul className={`list-reset ${styles.modal__right__info__sizes}`}>
								{Object.entries(product.sizes).map(([key, value], i) => (
									<ProductSizesItem
										key={i}
										currentSize={[key, value]}
										selectedSize={selectedSize}
										setSelectedSize={setSelectedSize}
										currentCartItems={currentCartItems}
									/>
								))}
							</ul>
						</div>
					) : (
						''
					)}

					<div className={styles.modal__right__bottom}>
						<span className={stylesForProduct.product__count_title}>
							{translations[lang].product.count}
						</span>
						<div className={styles.modal__right__bottom__inner}>
							{!!selectedSize ? (
								<ProductCounter
									className={`counter ${styles.modal__right__bottom__counter}`}
									count={count}
									totalCount={+product.inStock}
									initialCount={+(existingItem?.count || 1)}
									setCount={setCount}
									cartItem={existingItem as ICartItem}
									updateCountAsync={false}
								/>
							) : (
								<div
									className={`counter ${styles.modal__right__bottom__counter}`}
									style={{ justifyContent: 'center' }}
								>
									<span>
										{translations[lang].product.total_in_cart}{' '}
										{allCurrentCartItemCount}
									</span>
								</div>
							)}
							<AddToCartBtn
								text={translations[lang].product.to_cart}
								className={styles.modal__right__bottom__add}
								handleAddToCart={addToCart}
								addToCartSpinner={addToCartSpinner || updateCountSpinner}
								btnDisabled={
									addToCartSpinner ||
									updateCountSpinner ||
									allCurrentCartItemCount === +product.inStock
								}
							/>
						</div>
					</div>
				</div>

				<div className={styles.modal__right__more}>
					<Link
						href={`/catalog/${product.category}/${product._id}`}
						className={styles.modal__right__more__link}
						onClick={handleCloseModal}
					>
						{translations[lang].product.more}
					</Link>
				</div>
			</div>
		</div>
	)
}
export default QuickViewModal
