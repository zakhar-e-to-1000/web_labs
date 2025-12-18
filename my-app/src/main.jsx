import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, Routes, createBrowserRouter } from 'react-router'
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
import SuccessPage from './pages/Success/Success'
import { Navigate, Outlet } from "react-router";
import Login from './pages/Login/Login'
import { BrowserRouter } from 'react-router'
function PrivateRoute() {
    const isAuth = Boolean(localStorage.getItem("email"));

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
const router = createBrowserRouter([
    { path: "/", element: (<Home />) },
    { path: "/login", element: <Login /> },
    { path: "/catalog", element: (<PrivateRoute><Catalog /></PrivateRoute>) },
    { path: '/films/:id', element: <ItemPage /> },
    { path: '/cart', element: <Cart /> },
    { path: '/test', element: <TestPage /> },
    { path: '/success', element: <SuccessPage /> },
    { path: '*', element: <p>Not Found 404</p> },
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route element={<PrivateRoute />}>
                        <Route path='/' element={<Home />} />
                        <Route path='/test' element={<TestPage />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/catalog' element={<Catalog />} />
                        <Route path='/success' element={<SuccessPage />} />
                        <Route path='/films/:id' element={<ItemPage />} />
                        <Route path='*' element={<p>Not Found 404</p>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
)
