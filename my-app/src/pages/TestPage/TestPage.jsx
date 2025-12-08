import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import CartLine from "../../components/CartLine/CartLine"
import styles from "../../components/CartLine/CartLine.module.css"
export default function TestPage() {
    return <>
        <Header />
        <div className={styles.line_container}>
        </div>
        <Footer />
    </>
}