import { Avatar, Button, TableCell, TableRow } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { DeleteUser } from '../DeleteUser'
import { User } from '../../services/users'

interface UserRowProps {
  user: User
  onDelete: (id: number) => Promise<any>
  onUserDeleted: () => void
}

function UserRow (props: UserRowProps) {
  const navigate = useNavigate()

  const onClickUser = () => {
    navigate(props.user.id.toString())
  }

  return (
            <TableRow
                key={props.user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell>{props.user.id}</TableCell>
                <TableCell component="th" scope="row">
                    <Avatar src={props.user.avatar} />
                </TableCell>
                <TableCell>{props.user.first_name}</TableCell>
                <TableCell>{props.user.last_name}</TableCell>
                <TableCell>{props.user.email}</TableCell>
                <TableCell>
                    <DeleteUser user={props.user} onDelete={props.onDelete} onUserDeleted={props.onUserDeleted}/>
                </TableCell>
                <TableCell>
                    <Button variant="outlined" className="w-full" onClick={onClickUser}>
                        Show details
                    </Button>
                </TableCell>
            </TableRow>
  )
}

export { UserRow }
