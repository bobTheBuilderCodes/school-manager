import { formatDistanceToNow, parseISO } from "date-fns";
import Actions from "../feature/Actions";
import { Paragraph } from "..";
import { ReactElement } from "react";

interface TableProps {
  data: Array<{ [key: string]: any }>;
  getCellStyle?: (columnName: string, cellValue: any) => string;
  visibleColumns?: string[]; 
  actions?: ReactElement
}

const isDate = (value: any): boolean => {
  return (
    value instanceof Date ||
    (typeof value === "string" && !isNaN(parseISO(value).getTime()))
  );
};

const formatDate = (value: any): string => {
  const date = isDate(value) ? parseISO(value) : null;
  return date ? formatDistanceToNow(date, { addSuffix: true }) : value;
};

const Table: React.FC<TableProps> = ({
  data,
  getCellStyle,
  visibleColumns,
  actions
}) => {
  const columns =
    visibleColumns || (data.length > 0 ? Object.keys(data[0]) : []);

  return (
    <table className="w-full">
      <thead>
        <tr className="text-left">
          {columns.map((column, index) => (
            <th className="p-4 bg-gray-900" key={index}>
              {column}
            </th>
          ))}
          <th className="p-4 bg-gray-900"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="p-4"
            style={{
              backgroundColor: rowIndex % 2 === 0 ? "#0D1218" : "#161B22",
            }}
          >
            {columns.map((column, columnIndex) => (
              <td
                style={{ padding: 10 }}
                key={columnIndex}
                className={
                  getCellStyle ? getCellStyle(column, row[column]) : ""
                }
              >
                {formatDate(row[column])}
              </td>
            ))}
            <td style={{ padding: 10 }} className="flex justify-end">
              {actions}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
