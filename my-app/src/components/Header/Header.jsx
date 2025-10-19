import Container from "@/components/Container/Container"
import styles from "./Header.module.css"
import { Link } from "react-router"
function Header() {
    return <header>
        <Container className={styles.header}>
            <Link to='/' className={styles.left}>Home</Link>
            <Link to='/catalog'>Catalog</Link>
            <Link to='/cart'>Cart</Link>
        </ Container>
    </header >
}

export default Header