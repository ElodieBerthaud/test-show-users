import { useEffect, useState } from 'react'
import { deleteOneUser, getAllUsers, User } from '../../services/users'
import { ApiPaginationResponse } from '../../services/api'
import { UsersList } from '../../Components/UsersList'
import { Paper } from '@mui/material'

function Users () {
  const [paginatedUsers, setPaginatedUsers] = useState<ApiPaginationResponse<User[]> | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Fetch users from API
   * @param page
   * @param perPage
   */
  const getUsers = async (page: number = 1, perPage: number = 5) => {
    setIsLoading(true)
    const users = await getAllUsers(page, perPage)
    setPaginatedUsers(users)
    setIsLoading(false)
  }

  useEffect(() => {
    getUsers()
  }, [])

  // Re-trigger request on pagination
  const onPaginationChange = (page: number, perPage: number) => {
    getUsers(page + 1, perPage)
  }

  // Fake delete user
  const deleteUser = async (id: number): Promise<Response> => {
    return await deleteOneUser(id.toString())
  }

  return (
        <div className="h-screen flex flex-col justify-center mx-[44px]">
            <Paper elevation={3}>
                <UsersList
                    users={paginatedUsers?.data}
                    page={(paginatedUsers?.page ?? 1) - 1}
                    perPage={paginatedUsers?.per_page}
                    total={paginatedUsers?.total}
                    totalPages={paginatedUsers?.total_pages}
                    onPaginationChange={onPaginationChange}
                    deleteUser={deleteUser}
                    isLoading={isLoading}
                    onUserDeleted={getUsers}
                />
            </Paper>
        </div>
  )
}

export { Users }
