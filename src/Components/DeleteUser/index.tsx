import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { useState } from 'react'
import { User } from '../../services/users'

interface DeleteUserProps<T> {
  user: User
  onDelete: (id: number) => Promise<T>
  onUserDeleted: () => void
}

function DeleteUser<T> ({
  user,
  onDelete,
  onUserDeleted
}: DeleteUserProps<T>) {
  const [confirm, setConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState({ error: false, message: '' })

  const handleDeleteUser = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    setIsLoading(true)
    onDelete(id).then((response) => {
      setIsLoading(false)
      setFeedback({ error: false, message: 'The user has been removed...' })
      setTimeout(() => {
        onUserDeleted()
      }, 3000)
    }).catch(() => {
      setIsLoading(false)
      setFeedback({ error: true, message: 'An error as occured. The user couldn\'t have been removed.' })
    })
  }

  const handleClose = () => {
    setFeedback({ error: false, message: '' })
    setConfirm(false)
  }

  return (
        <div>
            <Button variant="outlined" color="error" className="w-full" onClick={() => { setConfirm(true) }}>
                Delete user
            </Button>
            <Dialog
                open={confirm}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {
                    feedback.message
                      ? <DialogContent>
                            <Alert severity={feedback.error ? 'error' : 'success'}>
                                {feedback.message}
                            </Alert>
                        </DialogContent>
                      : (isLoading
                          ? <CircularProgress />
                          : <>
                            <DialogTitle id="alert-dialog-title">
                                Are you sur you want to delete {`${user.first_name} ${user.last_name}`} ?
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    This action is irreversible.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={async (e) => { await handleDeleteUser(e, user.id) }} autoFocus>
                                    Delete
                                </Button>
                            </DialogActions>
                        </>
                        )
                }
            </Dialog>
        </div>
  )
}

export { DeleteUser }
