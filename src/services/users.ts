import { ApiPaginationResponse, ApiResponse, deleteOne, getAll, getOne } from './api'

export interface User {
  id:	number
  email:	string
  first_name:	string
  last_name:	string
  avatar:	string
}

/**
 * Get all users from API
 * @param offset
 * @param limit
 */
export async function getAllUsers (offset = 1, limit = 5): Promise<ApiPaginationResponse<User[]>> {
  return await getAll<User>(`${process.env.REACT_APP_API_HOST}users`, { page: offset, limit })
}

/**
 * Get one user from API
 * @param id(string) id of remote resource
 */
export async function getOneUser (id: string): Promise<ApiResponse<User>> {
  return await getOne<User>(`${process.env.REACT_APP_API_HOST}users`, id)
}

/**
 * Delete one user from API
 * @param id(string) id of remote resource
 */
export async function deleteOneUser (id: string): Promise<Response> {
  return await deleteOne(`${process.env.REACT_APP_API_HOST}users`, id)
}
