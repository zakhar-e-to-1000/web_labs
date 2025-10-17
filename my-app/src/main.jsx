import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'
import Home from '@/pages/Home/Home'
import Header from "@/components/Header/Header"
const router = createBrowserRouter([
    { path: "/", element: <Home /> }
])
ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Header></Header>
        <RouterProvider router={router} />
    </StrictMode>,
)
