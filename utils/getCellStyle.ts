export const getCellStyle = (columnName: string, cellValue: any): string => {
    if (columnName === 'status') {
      const lowerCaseStatus = cellValue?.toLowerCase();
  
      if (lowerCaseStatus === 'pending') {
        return 'pendingStyle';
      } else if (lowerCaseStatus === 'approved') {
        return 'approvedStyle';
      } else if (lowerCaseStatus === 'rejected') {
        return 'rejectedStyle';
      }
    }
  
    // Add more conditions as needed for other columns
  
    // Default: No custom styling
    return 'bg-green-500';
  };
  