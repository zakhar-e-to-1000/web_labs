import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'
import Home from '@/pages/Home/Home'
import Catalog from '@/pages/Catalog/Catalog'
import './assets/global.css'

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/catalog", element: <Catalog /> }

])
ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
