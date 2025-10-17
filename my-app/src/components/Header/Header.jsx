import Container from "@/components/Container/Container"
import styles from "./Header.module.css"
function Header() {
    return <header><Container className={styles.header}>
        <a className={styles.left}>Home</a>
        <a>Catalog</a>
        <a>Cart</a>
    </ Container></header >
}

export default Header