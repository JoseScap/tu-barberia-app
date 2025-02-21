import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import GenericTable, { TableColumn, ColumnValue } from "@/components/tables/GenericTable";

import React from "react";
import Badge from "@/components/ui/badge/Badge";

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

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Barberos" />
      <div className="space-y-6">
        <GenericTable columns={columns} data={tableData} />
      </div>
    </div>
  );
}
