"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import GenericTable, { TableColumn, ColumnValue } from "@/components/tables/GenericTable";
import React from "react";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import { PencilIcon, PlusIcon, TrashBinIcon, DocsIcon } from "@/icons";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

interface Barber {
  id: string;
  fullName: string;
  status: boolean;
  hiringDate: string;
}

const columns: TableColumn<Barber>[] = [
  {
    key: "fullName",
    header: "Nombre Completo",
  },
  {
    key: "status",
    header: "Estado",
    render: (value: ColumnValue<Barber>) => {
      return (
        <Badge
          color={value ? "success" : "error"}
          size="sm"
        >
          {value ? "Activo" : "Inactivo"}
        </Badge>
      );
    },
  },
  {
    key: "hiringDate",
    header: "Fecha de Contratación",
  },
];

// Define the table data using the interface
const tableData: Barber[] = [
  {
    id: "1",
    fullName: "Juan Perez",
    status: true,
    hiringDate: "2024-01-01",
  },
  {
    id: "2",
    fullName: "Juan Perez",
    status: true,
    hiringDate: "2024-01-01",
  },
];

export default function BarbersPage() {
  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: "#barbers-title",
          popover: {
            title: "Gestión de Barberos",
            description: "En esta sección podrás administrar todos los barberos de tu negocio.",
            side: "bottom",
            align: "start"
          }
        },
        {
          element: "#add-barber-btn",
          popover: {
            title: "Agregar Nuevo Barbero",
            description: "Haz clic aquí para registrar un nuevo barbero en el sistema.",
            side: "left"
          }
        },
        {
          element: "#barbers-table",
          popover: {
            title: "Lista de Barberos",
            description: "Aquí encontrarás todos los barberos registrados con su información principal.",
            side: "top"
          }
        },
        {
          element: "#barber-actions",
          popover: {
            title: "Acciones",
            description: "Desde aquí podrás editar o eliminar la información de cada barbero.",
            side: "left"
          }
        }
      ]
    });

    driverObj.drive();
  };

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
            variant="outline" 
            startIcon={<PlusIcon />}
            id="add-barber-btn"
          />
        }
      />
      <div className="space-y-6">
        <GenericTable<Barber>
          columns={columns}
          data={tableData}
          actionsHeader="Acciones"
          id="barbers-table"
          ActionsComponents={[
            <Button 
              key="edit-barber" 
              size="sm" 
              variant="outline" 
              startIcon={<PencilIcon />}
              id="barber-actions"
            />,
            <Button 
              key="delete-barber" 
              size="sm" 
              variant="outline" 
              startIcon={<TrashBinIcon />} 
            />,
          ]}
        />
      </div>
    </div>
  );
}
