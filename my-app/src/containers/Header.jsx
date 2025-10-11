import Container from "../components/Container"
import styles from "./Header.module.css"
function Header() {
    return <Container className={styles.header}>
        <p className={styles.left}>Home</p>
        <p>Catalog</p>
        <p>Cart</p>
    </ Container>
}

export default Header