import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import { useContext } from "react";
import { FilmsContext } from "@/context/context";
import { useParams } from "react-router";
import Container from '@/components/Container/Container'
import styles from './ItemPage.module.css'
function ItemPage() {
    const films = useContext(FilmsContext)
    const { id } = useParams()
    let res = null
    for (let film of films) {
        if (film.id == id) {
            res = film
            break
        }
    }
    if (res == null) {
        return <>
            <Header />
            <p>404 No item with such id</p>
            <Footer />
        </>
    }
    return <>
        <Header />
        <Container>
            <div className={styles.v_main}>

                <div className={styles.main}>
                    <img src="/src/assets/vintage-film-roll-stockcake.jpg" />
                    <section class={styles['info-pannel']}>
                        <h1>{res.title}</h1>
                        <h2>Stats</h2>
                        <p>Duration: {res.duration}</p>
                        <p>Reviews: {res.reviews}</p>
                    </section>
                </div>
                <h2>Description</h2>
                <p>{res.description}</p>
            </div>
        </Container>
        <Footer />
    </>
}

export default ItemPage;