import { ColumnValue, TableColumn } from '@/components/tables/GenericTable'
import Badge from '@/components/ui/badge/Badge'
import { Barber, BarberCreateRequest, BarberResponse, BarberUpdateRequest } from '@/schema/Barber'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Types } from 'mongoose'

// Constants
const INITIAL_BARBER: BarberCreateRequest = {
  fullName: '',
  status: true,
  hiringDate: new Date().toISOString().split('T')[0]
}

const TABLE_COLUMNS: TableColumn<Barber>[] = [
  {
    key: 'fullName',
    header: 'Nombre Completo'
  },
  {
    key: 'status',
    header: 'Estado',
    render: (value: ColumnValue<Barber>) => (
      <Badge color={value ? 'success' : 'error'} size="sm">
        {value ? 'Activo' : 'Inactivo'}
      </Badge>
    )
  },
  {
    key: 'hiringDate',
    header: 'Fecha de Contratación'
  }
]

// Hook Interface
interface UseBarbersReturn {
  barbers: Barber[]
  columns: TableColumn<Barber>[]
  newBarber: BarberCreateRequest
  setNewBarber: Dispatch<SetStateAction<BarberCreateRequest>>
  isCreatingBarber: boolean
  toggleCreateForm: () => void
  createBarber: () => void
  selectedBarber: BarberUpdateRequest | null
  selectBarberForEdit: (barberId?: Types.ObjectId) => void
  updateSelectedBarber: () => void
  updateBarberForm: (barber: BarberUpdateRequest) => void
}

// Hook Implementation
const useBarbers = (): UseBarbersReturn => {
  const [barbers, setBarbers] = useState<Barber[]>([])
  const [isCreatingBarber, setIsCreatingBarber] = useState(false)
  const [newBarber, setNewBarber] = useState<BarberCreateRequest>(INITIAL_BARBER)
  const [selectedBarber, setSelectedBarber] = useState<BarberUpdateRequest | null>(null)

  const toggleCreateForm = () => {
    setIsCreatingBarber(!isCreatingBarber)
    setNewBarber(INITIAL_BARBER)
  }

  const getBarbers = async () => {
    const response: AxiosResponse<Barber[]> = await axios.get('/api/barber')
    setBarbers(response.data)
  }

  const createBarber = async () => {
    await axios.post('/api/barber', newBarber)
    await getBarbers()
    toggleCreateForm()
  }

  const selectBarberForEdit = (barberId?: Types.ObjectId) => {
    if (!barberId) {
      setSelectedBarber(null)
      return
    }
    const barber = barbers.find(b => b._id.toString() === barberId.toString())
    if (barber) {
      setSelectedBarber(barber)
    }
  }

  const updateBarberForm = (barber: BarberUpdateRequest) => {
    setSelectedBarber(barber)
  }

  const updateSelectedBarber = async () => {
    if (!selectedBarber) return
    try {
      await axios.put(`/api/barber`, selectedBarber)
      await getBarbers()
      setSelectedBarber(null)
    } catch (error) {
      console.error('Error updating barber:', error)
    }
  }

  useEffect(() => {
    getBarbers()
  }, [])

  return {
    barbers,
    columns: TABLE_COLUMNS,
    newBarber,
    setNewBarber,
    isCreatingBarber,
    toggleCreateForm,
    createBarber,
    selectedBarber,
    selectBarberForEdit,
    updateSelectedBarber,
    updateBarberForm
  }
}

export default useBarbers
