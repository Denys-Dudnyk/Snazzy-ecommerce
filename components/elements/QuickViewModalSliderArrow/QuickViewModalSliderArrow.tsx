import { IQuickViewModalSliderArrowProps } from '@/types/elements'
import styles from '../../modules/QuickViewModal/QuickViewModal.module.scss'

const QuickViewModalSliderArrow = (props: IQuickViewModalSliderArrowProps) => {
	return (
		<button
			className={`btn-reset ${styles.modal__left__slider__slide__arrow} ${props.directionClassName} `}
			onClick={props.onClick}
		/>
	)
}
export default QuickViewModalSliderArrow
