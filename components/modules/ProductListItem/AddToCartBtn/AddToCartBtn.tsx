import { IAddToCartBtnProps } from '@/types/goods'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useEffect } from 'react'

const AddToCartBtn = ({
	text,
	className,
	handleAddToCart,
	addToCartSpinner,
	btnDisabled = false,
}: IAddToCartBtnProps) => {
	// useEffect(() => {
	// 	tailspin.register()
	// }, [])
	return (
		<button
			className={`btn-reset ${className}`}
			disabled={btnDisabled}
			onClick={handleAddToCart}
		>
			{addToCartSpinner ? (
				// <l-tailspin
				// 	size='16'
				// 	stroke='2'
				// 	stroke-length='0.25'
				// 	bg-opacity='0.1'
				// 	speed='0.9'
				// 	color='white'
				// ></l-tailspin>
				<FontAwesomeIcon icon={faSpinner} spin color='#fff' />
			) : (
				text
			)}
		</button>
	)
}
export default AddToCartBtn
