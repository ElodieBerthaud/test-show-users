import { Paper, Table, TableBody, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'
import { ListPagination } from '../ListPagination'

interface PaginatedListProps<T> {
  rows: T[]
  cols: string[]
  total: number
  rowPerPage: number
  page: number
  renderRow: (row: T) => JSX.Element
  renderCol: (col: string) => JSX.Element
  rowsPerPagesOptions?: number[]
  onPaginationChange: (page: number, perPage: number) => void
}

function PaginatedList<T> ({
  rows = [],
  cols = [],
  renderRow,
  renderCol,
  total,
  rowPerPage,
  page,
  rowsPerPagesOptions = [5, 10, 15],
  onPaginationChange
}: PaginatedListProps<T>) {
  const Row = ({ row }: { row: T }) => {
    return renderRow(row)
  }

  const Col = ({ col }: { col: string }) => {
    return renderCol(col)
  }

  return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="users list">
            <TableHead>
                <TableRow>
                    {cols.map((col: string, index) => (
                        <Col col={col} key={index}/>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row: T, index) => (
                    <Row row={row} key={index}/>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <ListPagination
                        total={total}
                        rowsPerPage={rowPerPage}
                        page={page}
                        rowsPerPageOptions={rowsPerPagesOptions}
                        onPaginationChange={onPaginationChange}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    </TableContainer>
  )
}

export { PaginatedList }
