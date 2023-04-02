import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider
} from 'react-router-dom'
import router from './router'
import { StrictMode } from 'react'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>
)
