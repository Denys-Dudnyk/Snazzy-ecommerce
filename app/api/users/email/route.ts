import { NextResponse } from 'next/server'
import { sendMail } from '@/service/mailService'

export async function POST(req: Request) {
	const res = await req.json()

	try {
		await sendMail(
			'SnaZZy E-commerce',
			res.email,
			`Your login details - username:${res.email}, password:${res.password}. `
		)

		return NextResponse.json({ message: 'Success' })
	} catch (error) {
		return NextResponse.json({ message: (error as Error).message })
	}
}
