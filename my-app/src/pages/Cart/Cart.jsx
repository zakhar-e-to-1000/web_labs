import styles from './Cart.module.css'
import styles_2 from '../../components/CartLine/CartLine.module.css'
import Container from "../../components/Container/Container"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import { useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import CartLine from '../../components/CartLine/CartLine'
import { Link } from 'react-router'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
function Cart() {
    const filmCart = useSelector((state) => state.filmCart)
    const renderList = useMemo(() => {
        return filmCart.map((item) => {
            return item.id
        })
    }, [filmCart])
    const total = useMemo(() => {
        return filmCart.reduce((sum, item) => {
            return sum + item.price * item.filmCount
        }, 0)
    }, [filmCart])
    console.log("Cart from cart: ", filmCart)
    const renderText = JSON.stringify(renderList)
    return <>
        <Header />
        <Container className={styles['container--cart-container']}>
            {/* <p>{renderText}</p>  */}
            <ul className={styles_2.line_container}>
                {renderList.map((id, ind, arr) =>
                    <li key={id} className={styles_2['line_box']}>
                        <CartLine cartItemId={id} />
                    </li>)}
            </ul>
            <p className={styles['total-label']}>Total: ${total}</p>
            {renderList.length > 0 && <Link to='/test'> <PrimaryButton>Checkout</PrimaryButton></Link>}
        </Container>
        <Footer />
    </>
}

export default Cart;