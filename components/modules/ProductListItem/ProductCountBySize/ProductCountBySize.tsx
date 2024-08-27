import { getCartItemCountBySize } from '@/lib/utils/common'
import styles from './ProductCountBySize.module.scss'
import { IProductCountBySizeProps } from '@/types/goods'
const ProductCountBySize = ({
	products,
	size,
	withCartIcon = true,
}: IProductCountBySizeProps) => (
	<>
		{!!getCartItemCountBySize(products, size) && (
			<span
				className={`${styles.count} ${withCartIcon ? styles.with_icon : ''}`}
			>
				<span>{getCartItemCountBySize(products, size)}</span>
			</span>
		)}
	</>
)
export default ProductCountBySize
