import { TablePagination } from '@mui/material'

interface ListPaginationProps {
  total: number
  rowsPerPage: number
  page: number
  rowsPerPageOptions?: number[]
  onPaginationChange: (page: number, limit: number) => void
}

function ListPagination ({
  total,
  rowsPerPage,
  page,
  rowsPerPageOptions = [5, 10, 15],
  onPaginationChange
}: ListPaginationProps) {
  const onPageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    onPaginationChange(newPage, rowsPerPage)
  }

  const onRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onPaginationChange(0, parseInt(event.target.value, 10))
  }

  return (
        <TablePagination
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            rowsPerPageOptions={rowsPerPageOptions}
            onRowsPerPageChange={onRowsPerPageChange}
            onPageChange={onPageChange}
        />
  )
}

export { ListPagination }
