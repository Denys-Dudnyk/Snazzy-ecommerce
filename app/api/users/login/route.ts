import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import {
	findUserByEmail,
	generateTokens,
	getDbAndReqBody,
} from '@/lib/utils/api-routes'

import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
	const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
	const user = await findUserByEmail(db, reqBody.email)

	if (!user) {
		return NextResponse.json({
			warningMessage: 'The User does not exist',
		})
	}

	if (!bcrypt.compareSync(reqBody.password, user.password)) {
		return NextResponse.json({
			warningMessage: 'Login or password incorrect',
		})
	}

	const tokens = await generateTokens(user.name, reqBody.email)

	return NextResponse.json(tokens)
}
