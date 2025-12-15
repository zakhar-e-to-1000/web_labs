import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import CartLine from "../../components/CartLine/CartLine"
import styles from "../../components/CartLine/CartLine.module.css"
import CheckoutForm from "../../components/checkoutForm/CheckoutForm"
import Container from "../../components/Container/Container"
export default function TestPage() {
    return <>
        <Header />
        <Container className={styles.line_container}>
            <CheckoutForm></CheckoutForm>
        </Container>
        <Footer />
    </>
}