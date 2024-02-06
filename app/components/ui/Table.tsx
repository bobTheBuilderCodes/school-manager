import { ReactNode } from "react";
import Actions from "../feature/Actions";
import { formatDate } from "@/utils";
import Pagination from "../feature/Pagination";

interface TableProps {
  data: Array<{ [key: string]: any }>;
  getCellStyle?: (columnName: string, cellValue: any) => string;
  visibleColumns?: string[];
  content: string;
  pagination?: ReactNode; // New prop for pagination component
}

const Table: React.FC<TableProps> = ({
  data,
  getCellStyle,
  visibleColumns,
  content,
  pagination,
}) => {
  const columns =
    visibleColumns || (data.length > 0 ? Object.keys(data[0]) : []);

  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          <tr className="text-left">
            {columns.map((column, index) => (
              <th className="p-4 bg-gray-900 text-gray-200" key={index}>
                {column.slice(0,1).toUpperCase() + column.slice(1)} 
              </th>
            ))}
            <th className="p-4 bg-gray-900"></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="p-4 text-gray-200"
              style={{
                backgroundColor: rowIndex % 2 === 0 ? "#0D1218" : "#161B22",
              }}
            >
              {columns.map((column, columnIndex) => (
                <td
                  style={{ padding: 10, color: "#B7B8BA", fontSize: 14 }}
                  key={columnIndex}
                  className={
                    getCellStyle ? getCellStyle(column, row[column]) : ""
                  }
                >
                  {formatDate(row[column])}
                </td>
              ))}
              <td style={{ padding: 10 }} className="flex justify-end">
                <Actions ticketId={row["ticketId"]} />
              </td>
            </tr>
          ))}
        </tbody>
       
      </table>
      <div>
      {/* <Pagination totalItems={3} currentPage={1} itemsPerPage={2} /> */}
      </div>
    </div>
  );
};

export default Table;
