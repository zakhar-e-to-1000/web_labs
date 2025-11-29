import styles from './Cart.module.css'
import Container from "../../components/Container/Container"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import { useSelector } from 'react-redux'
import store from '../../api/store'
import { useEffect, useMemo, useState } from 'react'
import get_film from '../../api/getFilm'
function Cart() {
    const dict = useSelector((state) => state.filmCart)
    const renderList = useMemo(() => {
        return Object.entries(dict)
    }, [dict]
    )
    const renderText = JSON.stringify(renderList)
    return <>
        <Header />
        <Container>

            <p>List of Films</p>
            <p>{renderText}</p>
        </Container>
        <Footer />
    </>
}

export default Cart;