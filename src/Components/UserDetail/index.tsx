import { User } from '../../services/users'
import { Alert, Avatar, TextField } from '@mui/material'
import { DeleteUser } from '../DeleteUser'
import { Loader } from '../Loader'

interface UserDetailsProps<T> {
  user: User | null
  onDelete: (id: number) => Promise<T>
  onUserDeleted: () => void
  error: string
  isLoading: boolean
}

function UserDetails<T> ({
  user,
  onDelete,
  onUserDeleted,
  error,
  isLoading
}: UserDetailsProps<T>) {
  if (isLoading) {
    return <Loader isLoading={true}/>
  } else {
    return (<div className="flex flex-col justify-end gap-y-[24px] w-fit">
            {error
              ? <Alert severity="error">
                    {error}
                </Alert>
              : ((user != null)
                  ? <>
                    {`${user.first_name} ${user.last_name}'s profile`}
                    <div className="flex items-start gap-x-[24px]">
                        <Avatar src={user.avatar}
                                sx={{ width: 72, height: 72 }}
                        />
                        <div className="flex flex-col items-center justify-center gap-y-[12px]">
                            <TextField
                                label="First name"
                                InputProps={{
                                  readOnly: true
                                }}
                                value={user.first_name}
                                className="w-[300px]"
                            />
                            <TextField
                                label="Last name"
                                InputProps={{
                                  readOnly: true
                                }}
                                value={user.last_name}
                                className="w-[300px]"
                            />
                            <TextField
                                label="Email"
                                InputProps={{
                                  readOnly: true
                                }}
                                value={user.email}
                                className="w-[300px]"
                            />
                        </div>
                    </div>
                    <DeleteUser user={user} onDelete={onDelete} onUserDeleted={onUserDeleted}/>
                </>
                  : <></>
                )
            }
        </div>)
  }
}

export { UserDetails }
