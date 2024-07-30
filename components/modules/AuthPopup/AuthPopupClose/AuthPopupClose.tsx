import { useUnit } from 'effector-react'
import { $showQuickViewModal, $showSizeTable } from '@/context/modals'

const AuthPopupClose = () => {
	const showQuickViewModal = useUnit($showQuickViewModal)
	const showSizeTable = useUnit($showSizeTable)

	return (
		<div className={''}>
			<div></div>
		</div>
	)
}
export default AuthPopupClose
