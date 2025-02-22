'use client'
import React from 'react'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import GenericTable from '@/components/tables/GenericTable'
import Button from '@/components/ui/button/Button'
import { PlusIcon, DocsIcon, CalenderIcon } from '@/icons'
import 'driver.js/dist/driver.css'
import ComponentCard from '@/components/common/ComponentCard'
import Label from '@/components/form/Label'
import Input from '@/components/form/input/InputField'
import useBarbers, { Barber } from '@/hooks/useBarbers'
import { driver, DriveStep } from 'driver.js'

// Components
const BarberForm = ({
  barber,
  onSubmit,
  onCancel,
  onChange,
  isEditing = false
}: {
  barber: Barber
  onSubmit: () => void
  onCancel: () => void
  onChange: (barber: Barber) => void
  isEditing?: boolean
}) => (
  <ComponentCard title={isEditing ? "Editar Barbero" : "Agregar Barbero"}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Label>Nombre Completo</Label>
        <Input
          type="text"
          defaultValue={barber.fullName}
          onChange={(e) => onChange({ ...barber, fullName: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="datePicker">Fecha de Contratación</Label>
        <div className="relative">
          <Input
            type="date"
            id="datePicker"
            name="datePicker"
            defaultValue={isEditing ? new Date(barber.hiringDate).toISOString().split('T')[0] : barber.hiringDate}
            onChange={(e) => onChange({ ...barber, hiringDate: e.target.value })}
          />
          <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
            <CalenderIcon />
          </span>
        </div>
      </div>
      <div className="col-span-full space-y-2">
        <Button className="w-full" size="sm" onClick={onSubmit}>
          {isEditing ? 'Actualizar' : 'Agregar'} Barbero
        </Button>
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          onClick={onCancel}
        >
          Cancelar
        </Button>
      </div>
    </div>
  </ComponentCard>
)

// Tour Configuration
const getTourSteps = () => [
  {
    element: '#barbers-title',
    popover: {
      title: 'Gestión de Barberos',
      description: 'En esta sección podrás administrar todos los barberos de tu negocio.',
      side: 'bottom',
      align: 'start'
    }
  },
  {
    element: '#add-barber-btn',
    popover: {
      title: 'Agregar Nuevo Barbero',
      description: 'Haz clic aquí para registrar un nuevo barbero en el sistema.',
      side: 'left'
    }
  },
  {
    element: '#barbers-table',
    popover: {
      title: 'Lista de Barberos',
      description: 'Aquí encontrarás todos los barberos registrados con su información principal.',
      side: 'top'
    }
  },
  {
    element: '#barber-edit-action',
    popover: {
      title: 'Editar Barbero',
      description: 'Desde aquí podrás editar la información del barbero seleccionado.',
      side: 'left'
    }
  },
  {
    element: '#barber-delete-action',
    popover: {
      title: 'Eliminar Barbero',
      description: 'Desde aquí podrás eliminar el barbero seleccionado.',
      side: 'left'
    }
  }
]

// Main Component
export default function BarbersPage() {
  const {
    barbers,
    showNewBarberForm,
    toggleNewBarberForm,
    columns,
    newBarber,
    setNewBarber,
    addBarber,
    editBarber,
    changeEditBarber,
    updateBarber
  } = useBarbers()

  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      steps: getTourSteps() as DriveStep[]
    })
    driverObj.drive()
  }

  return (
    <div>
      <PageBreadcrumb
        pageTitle="Barberos"
        id="barbers-title"
        TitleExtraComponent={
          <span className="text-sm text-gray-500 dark:text-gray-400">
            <DocsIcon
              className="text-brand-500 cursor-pointer"
              onClick={startTour}
            />
          </span>
        }
        RightComponent={
          <Button
            key="add-barber"
            size="sm"
            startIcon={<PlusIcon />}
            id="add-barber-btn"
            onClick={toggleNewBarberForm}
          />
        }
      />

      {showNewBarberForm && (
        <div className="space-y-6 mb-6">
          <BarberForm
            barber={newBarber}
            onSubmit={addBarber}
            onCancel={toggleNewBarberForm}
            onChange={setNewBarber}
          />
        </div>
      )}

      {editBarber && (
        <div className="space-y-6 mb-6">
          <BarberForm
            barber={editBarber}
            onSubmit={updateBarber}
            onCancel={() => changeEditBarber()}
            onChange={setNewBarber}
            isEditing
          />
        </div>
      )}

      <div className="space-y-6">
        <GenericTable<Barber>
          columns={columns}
          data={barbers}
          actionsHeader="Acciones"
          id="barbers-table"
          onEdit={(row) => changeEditBarber(row.id)}
        />
      </div>
    </div>
  )
}
