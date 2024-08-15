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

import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { EarthoOneProvider } from '@eartho/one-client-react'
// import { EarthoClientProvider } from '@eartho/one-client-nextjs/client'
import { $openAuthPopup } from '@/context/auth/state'

import '@/context/auth/init'
import '@/context/user/init'

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
	const [isClient, setIsClient] = useState(false)
	const showQuickViewModal = useUnit($showQuickViewModal)
	const showSizeTable = useUnit($showSizeTable)
	const openAuthPopup = useUnit($openAuthPopup)

	useEffect(() => setIsClient(true), [])

	const handleCloseQuickViewModal = () => {
		removeOverflowHiddenFromBody()
		closeQuickViewModal()
	}

	const handleCloseSizeTable = () => closeSizeTableByCheck(showQuickViewModal)

	return (
		<>
			{isClient ? (
				<EarthoOneProvider
					domain=''
					clientId={`${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}`}
				>
					<html lang='en'>
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
								className={`auth-overlay ${
									openAuthPopup ? 'overlay-active' : ''
								}`}
								onClick={handleCloseAuthPopup}
							/>

							<Toaster position='top-center' reverseOrder={false} />
						</body>
					</html>
				</EarthoOneProvider>
			) : (
				<html lang='en'>
					<body>
						<></>
					</body>
				</html>
			)}
		</>
	)
}
export default PagesLayout
