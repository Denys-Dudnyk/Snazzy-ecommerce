'use client'

import { useGate } from 'effector-react'
import Categories from '@/components/modules/MainPage/Categories/Categories'
import Hero from '@/components/modules/MainPage/Hero/Hero'
import { MainPageGate } from '@/context/goods'
import BestSellerGoods from '@/components/modules/MainPage/BestSellerGoods/BestSellerGoods'
import NewGoods from '@/components/modules/MainPage/NewGoods/NewGoods'
import BrandLife from '@/components/modules/MainPage/BrandLife/BrandLife'

const MainPage = () => {
	useGate(MainPageGate)

	return (
		<main>
			<Hero />
			<Categories />
			<NewGoods />
			<BestSellerGoods />
			<BrandLife />
		</main>
	)
}
export default MainPage
