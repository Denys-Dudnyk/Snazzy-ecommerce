import { $sizeTableSizes } from '@/context/sizeTable'
import { useCartAction } from '@/hooks/useCartAction'
import { useUnit } from 'effector-react'
import { useState } from 'react'
import styles from './SizeTable.module.scss'
import { $showQuickViewModal } from '@/context/modals'
import { closeSizeTableByCheck } from '@/lib/utils/common'
import { UseLang } from '@/hooks/useLang'
import AddToCartBtn from '../ProductListItem/AddToCartBtn/AddToCartBtn'
const SizeTable = () => {
	const { lang, translations } = UseLang()

	const showQuickViewModal = useUnit($showQuickViewModal)

	const [sSize, SetSSize] = useState(false)
	const [mSize, SetMSize] = useState(false)
	const [lSize, SetLSize] = useState(false)
	const [xlSize, SetXlSize] = useState(false)
	const [xxlSize, SetXxlSize] = useState(false)

	const { selectedSize, setSelectedSize } = useCartAction()

	const productSizes = useUnit($sizeTableSizes)

	const isHeaddressType = productSizes.type === 'headdress'

	const handleSelectSSize = () => {
		setSelectedSize('s')
		SetSSize(true)
		SetMSize(false)
		SetLSize(false)
		SetXlSize(false)
		SetXxlSize(false)
	}

	const handleSelectMSize = () => {
		setSelectedSize('m')
		SetSSize(false)
		SetMSize(true)
		SetLSize(false)
		SetXlSize(false)
		SetXxlSize(false)
	}

	const handleSelectLSize = () => {
		setSelectedSize('l')
		SetSSize(false)
		SetMSize(false)
		SetLSize(true)
		SetXlSize(false)
		SetXxlSize(false)
	}

	const handleSelectXLSize = () => {
		setSelectedSize('xl')
		SetSSize(false)
		SetMSize(false)
		SetLSize(false)
		SetXlSize(true)
		SetXxlSize(false)
	}

	const handleSelectXXLSize = () => {
		setSelectedSize('xxl')
		SetSSize(false)
		SetMSize(false)
		SetLSize(false)
		SetXlSize(false)
		SetXxlSize(true)
	}

	const headdressSizes = [
		{
			id: 1,
			headCircumference: '55',
			manufacturerSize: 'S',
			selectHandler: handleSelectSSize,
			isSelected: sSize,
			isAvailable: productSizes.sizes.s,
			isInFavorites: false,
		},
		{
			id: 2,
			headCircumference: '56-57',
			manufacturerSize: 'M',
			selectHandler: handleSelectMSize,
			isSelected: mSize,
			isAvailable: productSizes.sizes.m,
			isInFavorites: false,
		},
		{
			id: 3,
			headCircumference: '58-59',
			manufacturerSize: 'L',
			selectHandler: handleSelectLSize,
			isSelected: lSize,
			isAvailable: productSizes.sizes.l,
			isInFavorites: false,
		},
		{
			id: 4,
			headCircumference: '60-61',
			manufacturerSize: 'XL',
			selectHandler: handleSelectXLSize,
			isSelected: xlSize,
			isAvailable: productSizes.sizes.xl,
			isInFavorites: false,
		},
		{
			id: 5,
			headCircumference: '62-63',
			manufacturerSize: 'XXL',
			selectHandler: handleSelectXXLSize,
			isSelected: xxlSize,
			isAvailable: productSizes.sizes.xxl,
			isInFavorites: false,
		},
	]

	const dressSizes = [
		{
			id: 1,
			ukrainianSize: '44-46',
			manufacturerSize: 'S',
			bust: '78-82',
			waist: '58-62',
			hipGirth: '86-90',
			selectHandler: handleSelectSSize,
			isSelected: sSize,
			isAvailable: productSizes.sizes.s,
			isInFavorites: false,
		},
		{
			id: 2,
			ukrainianSize: '48-50',
			manufacturerSize: 'M',
			bust: '82-86',
			waist: '62-66',
			hipGirth: '90-94',
			selectHandler: handleSelectMSize,
			isSelected: mSize,
			isAvailable: productSizes.sizes.m,
			isInFavorites: false,
		},
		{
			id: 3,
			ukrainianSize: '50',
			manufacturerSize: 'L',
			bust: '86-90',
			waist: '66-70',
			hipGirth: '94-98',
			selectHandler: handleSelectLSize,
			isSelected: lSize,
			isAvailable: productSizes.sizes.l,
			isInFavorites: false,
		},
		{
			id: 4,
			ukrainianSize: '52-54',
			manufacturerSize: 'XL',
			bust: '90-94',
			waist: '70-74',
			hipGirth: '98-102',
			selectHandler: handleSelectXLSize,
			isSelected: xlSize,
			isAvailable: productSizes.sizes.xl,
			isInFavorites: false,
		},
		{
			id: 5,
			ukrainianSize: '56',
			manufacturerSize: 'XXL',
			bust: '94-98',
			waist: '74-78',
			hipGirth: '102-106',
			selectHandler: handleSelectXXLSize,
			isSelected: xxlSize,
			isAvailable: productSizes.sizes.xxl,
			isInFavorites: false,
		},
	]

	const handleCloseSizeTable = () => closeSizeTableByCheck(showQuickViewModal)

	const trProps = (
		item:
			| {
					id: number
					ukrainianSize: string
					manufacturerSize: string
					bust: string
					waist: string
					hipGirth: string
					selectHandler: () => void
					isSelected: boolean
					isAvailable: boolean
			  }
			| {
					id: number
					headCircumference: string
					manufacturerSize: string
					selectHandler: () => void
					isSelected: boolean
					isAvailable: boolean
			  }
	) => ({
		onClick: item.selectHandler,
		style: {
			backgroundColor:
				item.isSelected || selectedSize === item.manufacturerSize.toLowerCase()
					? '#9466FF'
					: 'transparent',
			pointerEvents: item.isAvailable ? 'auto' : 'none',
			opacity: item.isAvailable ? 1 : 0.5,
			color: item.isAvailable ? '#fff' : 'rgba(255, 255, 255, .2)',
		},
	})

	return (
		<div
			className={`${styles.size_table} ${isHeaddressType ? styles.size_table_headdress : ''}`}
		>
			<button
				className={`btn-reset ${styles.size_table__close}`}
				onClick={handleCloseSizeTable}
			/>
			<h2 className={styles.size_table__title}>
				{translations[lang].size_table.title}
			</h2>

			<div className={styles.size_table__inner}>
				<table className={styles.size_table__table}>
					<thead>
						{isHeaddressType ? (
							<tr>
								<th>{translations[lang].size_table.head_circumference}</th>
								<th>{translations[lang].size_table.size}</th>
							</tr>
						) : (
							<tr>
								<th>{translations[lang].size_table.ukrainian_size}</th>
								<th>{translations[lang].size_table.manufacturer_size}</th>
								<th>{translations[lang].size_table.chest_circumference}</th>
								<th>{translations[lang].size_table.waist_circumference}</th>
								<th>{translations[lang].size_table.hip_circumference}</th>
							</tr>
						)}
					</thead>

					<tbody>
						{isHeaddressType
							? headdressSizes.map(headdressSizesItem => (
									<tr
										key={headdressSizesItem.id}
										{...(trProps(
											headdressSizesItem
										) as React.HTMLAttributes<HTMLTableRowElement>)}
									>
										<td>{headdressSizesItem.headCircumference}</td>
										<td>{headdressSizesItem.manufacturerSize}</td>
									</tr>
								))
							: dressSizes.map(item => (
									<tr
										key={item.id}
										{...(trProps(
											item
										) as React.HTMLAttributes<HTMLTableRowElement>)}
									>
										<td>{item.ukrainianSize}</td>
										<td>{item.manufacturerSize}</td>
										<td>{item.bust}</td>
										<td>{item.waist}</td>
										<td>{item.hipGirth}</td>
									</tr>
								))}
					</tbody>
				</table>
			</div>

			<AddToCartBtn
				text={translations[lang].product.to_cart}
				className={styles.size_table__btn}
			/>
		</div>
	)
}
export default SizeTable
