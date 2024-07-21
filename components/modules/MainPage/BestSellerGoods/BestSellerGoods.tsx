import { getBestsellerProductsFx } from '@/api/main-page'
import { $bestsellerProducts } from '@/context/goods'
import { UseLang } from '@/hooks/useLang'
import { useUnit } from 'effector-react'
import MainPageSection from '../MainPageSection/MainPageSection'

const BestSellerGoods = () => {
	const goods = useUnit($bestsellerProducts)
	const spinner = useUnit(getBestsellerProductsFx.pending)
	const { lang, translations } = UseLang()

	return (
		<MainPageSection
			title={translations[lang].main_page.bestsellers_title}
			goods={goods}
			spinner={spinner}
		/>
	)
}
export default BestSellerGoods
