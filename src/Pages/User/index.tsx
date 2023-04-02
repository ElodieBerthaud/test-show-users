import { useNavigate, useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { deleteOneUser, getOneUser, User } from '../../services/users'
import { Button } from '@mui/material'
import { UserDetails } from '../../Components/UserDetail'
import ArrowBack from '@mui/icons-material/ArrowBack'

function UserDetailsPage () {
  const { id } = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const getUser = useCallback(() => {
    if (id) {
      setIsLoading(true)
      getOneUser(id).then((user) => {
        setUser(user.data)
        setIsLoading(false)
      }).catch((status) => {
        setIsLoading(false)
        if (status === 404) {
          setError('User not found.')
        } else {
          setError('Unexpected error. Please try again.')
        }
      })
    }
  }, [id])

  const deleteUser = async (id: number): Promise<Response> => {
    return await deleteOneUser(id.toString())
  }

  useEffect(() => {
    getUser()
  }, [getUser])

  const onUserDeleted = (): void => {
    navigate('/')
  }

  return (
            <div className="h-screen mt-[24px] flex flex-col mx-[44px] gap-y-[24px]">
                <div>
                    <Button onClick={() => { navigate(-1) }} startIcon={<ArrowBack />}>Go back</Button>
                </div>
                    <UserDetails
                        error={error}
                        isLoading={isLoading}
                        user={user}
                        onDelete={deleteUser}
                        onUserDeleted={onUserDeleted}/>
            </div>
  )
}

export { UserDetailsPage }
