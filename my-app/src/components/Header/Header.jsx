import Container from "@/components/Container/Container"
import styles from "./Header.module.css"
import { Link, useNavigate } from "react-router"
import PrimaryButton from "../PrimaryButton/PrimaryButton"
function Header() {
    const nav = useNavigate();
    return <header>
        <Container className={styles.header}>
            <Link to='/' className={styles.left}>Home</Link>
            <Link to='/catalog'>Catalog</Link>
            <Link to='/cart'>Cart</Link>
            <PrimaryButton onClick={() => {
                localStorage.removeItem("email")
                nav("/login");
            }} >Log out</PrimaryButton>
        </ Container>
    </header >
}

export default Header