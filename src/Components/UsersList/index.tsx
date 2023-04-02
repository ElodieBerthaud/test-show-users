import { User } from '../../services/users'
import { useState } from 'react'
import {
  TableCell
} from '@mui/material'
import { UserRow } from '../UserRow'
import { PaginatedList } from '../PaginatedList'
import { Loader } from '../Loader'

interface UsersListProps {
  users?: User[]
  page?: number
  perPage?: number
  total?: number
  totalPages?: number
  rowsPerPagesOptions?: number[]
  onPaginationChange: (page: number, perPage: number) => void
  deleteUser: (id: number) => Promise<Response>
  onUserDeleted: () => void
  isLoading: boolean
}

function UsersList ({
  users = [],
  page = 0,
  perPage = 5,
  total = 0,
  rowsPerPagesOptions,
  onPaginationChange,
  deleteUser,
  isLoading,
  onUserDeleted
}: UsersListProps) {
  const cols: string[] = ['Id', 'Avatar', 'First name', 'Last name', 'email', '', '']

  /**
   * Returns formatted rows
   */
  const getRows = () => {
    return (users).map((user) => {
      return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        avatar: user.avatar
      }
    })
  }

  if (isLoading) {
    return <Loader isLoading={true}/>
  } else {
    return (<div className="flex flex-col gap-y-[12px] items-end">
            <PaginatedList
                rows={getRows()}
                cols={cols}
                total={total}
                rowPerPage={perPage}
                page={page}
                renderRow={(user: User) => <UserRow user={user} onDelete={deleteUser} onUserDeleted={onUserDeleted}/>}
                renderCol={(col: string) => <TableCell>{col}</TableCell>}
                onPaginationChange={onPaginationChange}
                rowsPerPagesOptions={rowsPerPagesOptions}/>
        </div>)
  }
}

export { UsersList }
