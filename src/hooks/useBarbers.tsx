import { ColumnValue, TableColumn } from '@/components/tables/GenericTable'
import Badge from '@/components/ui/badge/Badge'
import { Dispatch, SetStateAction, useState } from 'react'

// Types
export type Barber = {
  id: string
  fullName: string
  status: boolean
  hiringDate: string
}

// Constants
const INITIAL_BARBER: Barber = {
  id: '',
  fullName: '',
  status: true,
  hiringDate: new Date().toISOString().split('T')[0]
}

const MOCK_BARBERS: Barber[] = [
  {
    id: '1',
    fullName: 'Juan Perez',
    status: true,
    hiringDate: '01-01-2024'
  },
  {
    id: '2',
    fullName: 'Pedro Martinez',
    status: true,
    hiringDate: '01-01-2024'
  }
]

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
  newBarber: Barber
  setNewBarber: Dispatch<SetStateAction<Barber>>
  isCreatingBarber: boolean
  toggleCreateForm: () => void
  createBarber: () => void
  selectedBarber: Barber | null
  selectBarberForEdit: (barberId?: string) => void
  updateSelectedBarber: () => void
}

// Hook Implementation
const useBarbers = (): UseBarbersReturn => {
  const [barbers, setBarbers] = useState<Barber[]>(MOCK_BARBERS)
  const [isCreatingBarber, setIsCreatingBarber] = useState(false)
  const [newBarber, setNewBarber] = useState<Barber>(INITIAL_BARBER)
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null)

  const toggleCreateForm = () => {
    setIsCreatingBarber(!isCreatingBarber)
    setNewBarber(INITIAL_BARBER)
  }

  const createBarber = () => {
    const newBarberWithId: Barber = {
      ...newBarber,
      id: (barbers.length + 1).toString()
    }
    setBarbers([...barbers, newBarberWithId])
    toggleCreateForm()
  }

  const selectBarberForEdit = (barberId?: string) => {
    if (!barberId) {
      setSelectedBarber(null)
      return
    }

    const barber = barbers.find((barber) => barber.id === barberId)
    if (barber) {
      setSelectedBarber(barber)
    }
  }

  const updateSelectedBarber = () => {
    setBarbers(barbers.map((b) => 
      b.id === selectedBarber?.id ? selectedBarber : b
    ))
    setSelectedBarber(null)
  }

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
    updateSelectedBarber
  }
}

export default useBarbers
