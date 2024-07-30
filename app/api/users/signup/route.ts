import clientPromise from '@/lib/mongodb'
import {
	createUserAndGenerateTokens,
	findUserByEmail,
	getDbAndReqBody,
} from '@/lib/utils/api-routes'

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
		const user = await findUserByEmail(db, reqBody.email)

		if (user) {
			return NextResponse.json({
				warningMessage: 'User already exists',
			})
		}

		const token = await createUserAndGenerateTokens(db, reqBody)

		return NextResponse.json(token)
	} catch (error) {
		throw new Error((error as Error).message)
	}
}
