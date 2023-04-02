export interface ApiPaginationResponse<T> {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: T
}

export interface ApiResponse<T> {
  data: T
}

export interface ApiPaginationRequest {
  page: number
  limit: number
}

/**
 * Returns a serialized queryParams object
 * @param params{ApiPaginationRequest}
 */
function serializePagination (params: ApiPaginationRequest): string {
  return `?page=${params.page}&per_page=${params.limit}`
}

/**
 * Return all resources from an API endpoint
 * @param url
 * @param pagination
 */
export async function getAll<T> (url: string, pagination: ApiPaginationRequest): Promise<ApiPaginationResponse<T[]>> {
  return await fetch(`${url}${serializePagination(pagination)}`)
    .then(async (response) => await response.json())
}


/**
 * Return one resource from an API endpoint
 * @param url
 * @param id(string): id of remote resource
 */
export async function getOne<T> (url: string, id: string): Promise<ApiResponse<T>> {
  return await fetch(`${url}/${id}`)
    .then(async (response) => {
      if (!response.ok) {
        throw response.status
      }
      return await response.json()
    })
}


/**
 * Delete one resource from an API endpoint
 * @param url
 * @param id(string): id of remote resource
 */
export async function deleteOne (url: string, id: string): Promise<Response> {
  return await fetch(`${url}/${id}`, { method: 'DELETE' })
    .then((response) => {
      if (!response.ok) {
        throw response.status
      }
      return response
    })
}
