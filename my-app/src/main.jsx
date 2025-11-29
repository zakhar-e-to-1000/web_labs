import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'
import Home from '@/pages/Home/Home'
import Catalog from '@/pages/Catalog/Catalog'
import './assets/global.css'
import { FilmsContext } from '@/context/context'
import ItemPage from './pages/ItemPage/ItemPage'
import getFilms from "@/api/getFIlms";
import { Provider } from "react-redux"
import store from './api/store'
import Cart from './pages/Cart/Cart'
import TestPage from './pages/TestPage/TestPage'

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/catalog", element: <Catalog /> },
    { path: '/films/:id', element: <ItemPage /> },
    { path: '/cart', element: <Cart /> },
    { path: '/test', element: <TestPage /> },
    { path: '*', element: <p>Not Found 404</p> },
])

// const numbers = [1, 2, 3, 5, 6]
// const films = numbers.map((num) => {
//     return {
//         title: `Film ${num}`,
//         id: num,
//         duration: 2 * num,
//         reviews: 3 * num
//     }
// })
// const films = getFilms(100)


ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>,
)
