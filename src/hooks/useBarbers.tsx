import { ColumnValue, TableColumn } from '@/components/tables/GenericTable'
import Badge from '@/components/ui/badge/Badge'
import { Dispatch, SetStateAction, useState } from 'react'

export type Barber = {
  id: string;
  fullName: string;
  status: boolean;
  hiringDate: string;
}

const NEW_INITIAL_BARBER: Barber = {
  id: '',
  fullName: '',
  status: true,
  hiringDate: '01-01-2024'
}

interface UseBarbersReturn {
  barbers: Barber[];
  columns: TableColumn<Barber>[];
  newBarber: Barber;
  setNewBarber: Dispatch<SetStateAction<Barber>>;
  showNewBarberForm: boolean;
  toggleNewBarberForm: () => void;
  addBarber: () => void;
  editBarber: Barber | null;
  changeEditBarber: (barberId?: string) => void;
  updateBarber: () => void;
}

const mockBarbers: Barber[] = [
  {
    id: '1',
    fullName: 'Juan Perez',
    status: true,
    hiringDate: '01-01-2024'
  },
  {
    id: '2',
    fullName: 'Juan Perez',
    status: true,
    hiringDate: '01-01-2024'
  }
]

const columns: TableColumn<Barber>[] = [
  {
    key: 'fullName',
    header: 'Nombre Completo'
  },
  {
    key: 'status',
    header: 'Estado',
    render: (value: ColumnValue<Barber>) => {
      return (
        <Badge
          color={value ? 'success' : 'error'}
          size="sm"
        >
          {value ? 'Activo' : 'Inactivo'}
        </Badge>
      )
    }
  },
  {
    key: 'hiringDate',
    header: 'Fecha de Contratación'
  }
]

const useBarbers = (): UseBarbersReturn => {
  const [barbers, setBarbers] = useState<Barber[]>(mockBarbers)
  const [showNewBarberForm, setShowNewBarberForm] = useState(false)
  const [newBarber, setNewBarber] = useState<Barber>(NEW_INITIAL_BARBER)
  const [editBarber, setEditBarber] = useState<Barber | null>(null)

  const toggleNewBarberForm = () => {
    setShowNewBarberForm(!showNewBarberForm)
    setNewBarber(NEW_INITIAL_BARBER)
  }

  const addBarber = () => {
    const newBarberWithId: Barber = {
      ...newBarber,
      id: (barbers.length + 1).toString()
    }
    setBarbers([...barbers, newBarberWithId])
    toggleNewBarberForm()
  }

  const changeEditBarber = (barberId?: string) => {
    if (barberId === undefined) {
      setEditBarber(null)
      return
    }

    const barber = barbers.find((barber) => barber.id === barberId)
    if (barber) {
      setEditBarber(barber)
    }
  }

  const updateBarber = () => {
    const updatedBarbers = barbers.map((b) => b.id === editBarber?.id ? editBarber : b)
    setBarbers(updatedBarbers)
    setEditBarber(null)
  }

  return { barbers, columns, newBarber, setNewBarber, showNewBarberForm, toggleNewBarberForm, addBarber, editBarber, changeEditBarber, updateBarber }
}

export default useBarbers
