import { connectToDatabase } from '@/database'
import { Barber, BarberUpdateRequest, mapFromDomainToResponse, mapFromRequestToDomain } from '@/schema/Barber'
import { NextResponse } from 'next/server'

export async function GET() {
  await connectToDatabase()
  const barbers = await Barber.find()
  return NextResponse.json(barbers)
}

export async function POST(request: Request) {
  await connectToDatabase()
  const body = await request.json()
  const barber = await Barber.create(mapFromRequestToDomain(body))
  return NextResponse.json(mapFromDomainToResponse(barber))
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase()
    const body = await request.json() as BarberUpdateRequest

    const barber = await Barber.findById(body._id)
    if (!barber) {
      return NextResponse.json(
        { error: 'Barbero no encontrado' },
        { status: 404 }
      )
    }

    Object.assign(barber, {
      fullName: body.fullName,
      status: body.status,
      hiringDate: body.hiringDate
    })

    await barber.save()
    return NextResponse.json(mapFromDomainToResponse(barber))
  } catch (error) {
    console.error('Error updating barber:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el barbero' },
      { status: 500 }
    )
  }
}
