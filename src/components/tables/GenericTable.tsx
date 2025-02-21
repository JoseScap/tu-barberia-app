import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

export type ColumnKey<T> = keyof T;
export type ColumnValue<T> = T[ColumnKey<T>];
export type ColumnAlign = "start" | "center" | "end";

// Definimos los tipos para las columnas
export interface TableColumn<T> {
  key: ColumnKey<T>;
  header: string;
  render?: (value: ColumnValue<T>, row: T) => React.ReactNode;
}

// Props del componente
export interface GenericTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
  actionsHeader?: string;
  ActionsComponents?: React.ReactNode[];
  id?: string;
}

export default function GenericTable<T extends object>({
  columns,
  data,
  className = "",
  actionsHeader,
  ActionsComponents,
  id,
}: GenericTableProps<T>) {
  return (
    <div className={`overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] ${className}`}>
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-full">
          <Table id={id}>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={String(column.key)}
                    isHeader
                    className={`px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400`}
                  >
                    {column.header}
                  </TableCell>
                ))}
                {actionsHeader && (
                  <TableCell
                    isHeader
                    className={`px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400`}
                  >
                    {actionsHeader}
                  </TableCell>
                )}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell
                      key={String(column.key)}
                      className={`px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400`}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : String(row[column.key])}
                    </TableCell>
                  ))}
                  {actionsHeader !== undefined && ActionsComponents && (
                    <TableCell
                      className={`px-4 py-3 flex items-center justify-end gap-2 text-gray-500 text-end text-theme-sm dark:text-gray-400`}
                    >
                      {ActionsComponents.map((component, index) => (
                        <React.Fragment key={index}>
                          {component}
                        </React.Fragment>
                      ))}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
} 