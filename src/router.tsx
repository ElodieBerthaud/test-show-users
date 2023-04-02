import {
  createBrowserRouter
} from 'react-router-dom'
import { Users } from './Pages/Users'
import { UserDetailsPage } from './Pages/User'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Users/>
  },
  {
    path: '/:id',
    element: <UserDetailsPage/>
  }
])

export default router
