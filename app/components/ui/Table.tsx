"use client"

import { formatDistanceToNow, parseISO } from "date-fns";
import Actions from "../feature/Actions";
import { Paragraph } from "..";
import { ReactElement } from "react";
import { deleteTicket } from "@/services/getData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface TableProps {
  data: Array<{ [key: string]: any }>;
  getCellStyle?: (columnName: string, cellValue: any) => string;
  visibleColumns?: string[];
  onDelete?: (itemId: string | number) => void
  onEdit?: (itemId: string | number) => void
  actions?: ReactElement;
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
  visibleColumns, onDelete, onEdit,
  actions,
}) => {
  const columns =
    visibleColumns || (data.length > 0 ? Object.keys(data[0]) : []);

    const session = useSession()
    const authToken = session.data?.user.accessToken!
    const router = useRouter()

    // const handleDelete = async(ticketId: number) => {
    //   try {
    //     await deleteTicket(ticketId, authToken)
    //     router.refresh()
    //     alert("Deleted successfully")
    //   } catch (error) {
    //     console.log("Error", error)
        
    //   }
    //   }

      // const handleEdit = async(ticketId: number) => {
      //   alert(ticketId)
      // }

  return (
    <table className="w-full">
      <thead>
        <tr className="text-left">
          {columns.map((column, index) => (
            <th className="p-4 bg-gray-900 text-gray-200" key={index}>
              {column}
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
            <Actions
                ticketId={row['ticketId']}
                authToken={authToken}
              
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
