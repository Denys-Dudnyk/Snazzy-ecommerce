import { updateCartItemCount } from '@/context/cart'
import { updateCartItemCountInLS } from '@/lib/utils/cart'
import { isUserAuth } from '@/lib/utils/common'
import { IProductCounterProps } from '@/types/goods'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

const ProductCounter = ({
	className,
	count,
	setCount,
	cartItem,
	updateCountAsync,
	initialCount,
	totalCount,
	increasePrice,
	decreasePrice,
}: IProductCounterProps) => {
	const [spinner, setSpinner] = useState(false)
	const [disableIncrease, setDisableIncrease] = useState(false)
	const [disableDecrease, setDisableDecrease] = useState(false)

	const currentTotalCount = +cartItem?.inStock || totalCount
	const currentInitialCount = +cartItem?.count || initialCount || 1

	useEffect(() => {
		if (count === 1) {
			setDisableDecrease(true)
		} else {
			setDisableDecrease(false)
		}

		if (count === currentTotalCount) {
			setDisableIncrease(true)
		} else {
			setDisableIncrease(false)
		}
	}, [count, currentTotalCount])

	useEffect(() => {
		setCount(currentInitialCount as number)
	}, [currentInitialCount])

	const updateCountWithRequest = (count: number) => {
		updateCartItemCountInLS(cartItem.clientId, count)

		if (!isUserAuth()) {
			return
		}

		const auth = JSON.parse(localStorage.getItem('auth') as string)

		updateCartItemCount({
			jwt: auth.accessToken,
			id: cartItem._id,
			setSpinner,
			count,
		})
	}

	const increase = async () => {
		increasePrice && increasePrice()
		setDisableDecrease(false)
		setCount(count + 1)

		if (updateCountAsync) {
			updateCountWithRequest(count + 1)
		}
	}

	const decrease = async () => {
		decreasePrice && decreasePrice()
		setDisableIncrease(false)
		setCount(count - 1)

		if (updateCountAsync) {
			updateCountWithRequest(count - 1)
		}
	}

	return (
		<div className={className}>
			<button
				className='btn-reset'
				onClick={decrease}
				disabled={disableDecrease || spinner}
			/>
			<span>
				{spinner ? (
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
					count
				)}
			</span>
			<button
				className='btn-reset'
				onClick={increase}
				disabled={disableIncrease || spinner}
			/>
		</div>
	)
}
export default ProductCounter
