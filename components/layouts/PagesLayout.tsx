'use client'

import {
	$showQuickViewModal,
	$showSizeTable,
	closeQuickViewModal,
} from '@/context/modals'
import { useUnit } from 'effector-react'
import Layout from './Layout'
import {
	closeSizeTableByCheck,
	handleCloseAuthPopup,
	removeOverflowHiddenFromBody,
} from '@/lib/utils/common'
import { $openAuthPopup } from '@/context/auth'
import { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import { EarthoOneProvider } from '@eartho/one-client-react'

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
	const [isClient, setIsClient] = useState(false)
	const showQuickViewModal = useUnit($showQuickViewModal)
	const showSizeTable = useUnit($showSizeTable)
	const openAuthPopup = useUnit($openAuthPopup)

	const handleCloseQuickViewModal = () => {
		removeOverflowHiddenFromBody()
		closeQuickViewModal()
	}

	const handleCloseSizeTable = () => closeSizeTableByCheck(showQuickViewModal)

	return (
		<html lang='en'>
			<EarthoOneProvider
				clientId={`${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}`}
				domain=''
			>
				<body>
					<Layout>{children}</Layout>
					<div
						className={`quick-view-modal-overlay ${
							showQuickViewModal ? 'overlay-active' : ''
						}`}
						onClick={handleCloseQuickViewModal}
					/>

					<div
						className={`size-table-overlay ${
							showSizeTable ? 'overlay-active' : ''
						}`}
						onClick={handleCloseSizeTable}
					/>
					<div
						className={`auth-overlay ${openAuthPopup ? 'overlay-active' : ''}`}
						onClick={handleCloseAuthPopup}
					/>
					<Toaster position='top-center' reverseOrder={false} />
				</body>
			</EarthoOneProvider>
		</html>
	)
}
export default PagesLayout
