import { model, models, Schema, Types } from 'mongoose'

// Domain Types
export type Barber = {
  _id: Types.ObjectId
  fullName: string
  status: boolean
  hiringDate: string
}

export const BarberSchema = new Schema<Barber>({
  fullName: { type: String, required: true },
  status: { type: Boolean, required: true },
  hiringDate: { type: String, required: true }
}, {
  timestamps: false
})

export const Barber = models.Barber || model<Barber>('Barber', BarberSchema)

// Request and Response Types
export type BarberCreateRequest = Omit<Barber, '_id'>
export type BarberUpdateRequest = Partial<BarberCreateRequest> & { _id: Types.ObjectId }

export type BarberResponse = Barber

// Mappers Methods
export const mapFromDomainToResponse = (barber: Barber): BarberResponse => {
  return {
    _id: barber._id,
    fullName: barber.fullName,
    status: barber.status,
    hiringDate: barber.hiringDate
  }
}

export const mapFromRequestToDomain = (request: BarberCreateRequest): Barber => {
  return {
    _id: new Types.ObjectId(),
    fullName: request.fullName,
    status: request.status,
    hiringDate: request.hiringDate
  }
}
