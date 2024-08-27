import { $totalPrice } from '@/context/cart/state'
import { useUnit } from 'effector-react'
import { useCartByAuth } from './useCartByAuth'
import { usePriceAnimation } from './usePriceAnimation'
import { useEffect } from 'react'
import { setTotalPrice } from '@/context/cart'

export const useTotalPrice = () => {
	const totalPrice = useUnit($totalPrice)
	const currentCartByAuth = useCartByAuth()

	const getNewTotal = () =>
		currentCartByAuth
			.map(item => +item.price * +item.count)
			.reduce((defaultCount, item) => defaultCount + item, 0)

	const {
		value: animatedPrice,
		setFrom,
		setTo,
	} = usePriceAnimation(totalPrice, getNewTotal())

	useEffect(() => {
		setTotalPrice(getNewTotal())
		setFrom(totalPrice)
		setTo(getNewTotal())
	}, [currentCartByAuth])

	return { animatedPrice }
}
