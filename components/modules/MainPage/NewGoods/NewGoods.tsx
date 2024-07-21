import { getNewProductsFx } from '@/api/main-page'
import { $newProducts } from '@/context/goods'
import { UseLang } from '@/hooks/useLang'
import { useUnit } from 'effector-react'
import MainPageSection from '../MainPageSection/MainPageSection'

const NewGoods = () => {
	const goods = useUnit($newProducts)
	const spinner = useUnit(getNewProductsFx.pending)
	const { lang, translations } = UseLang()

	return (
		<MainPageSection
			title={translations[lang].main_page.new_title}
			goods={goods}
			spinner={spinner}
		/>
	)
}
export default NewGoods
