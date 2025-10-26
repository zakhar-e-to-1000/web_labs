import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import { use, useContext, useEffect, useState } from "react";
import { FilmsContext } from "@/context/context";
import { useParams } from "react-router";
import Container from '@/components/Container/Container'
import styles from './ItemPage.module.css'
import get_film from "../../api/getFilm";
import LoaderWheel from "../../components/LoaderWheel/LoaderWheel";
function ItemPage() {
    const { id } = useParams()
    const [film, setFilm] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        get_film({
            id: id,
            setFilm: setFilm,
            setError: setError,
            setLoading: setLoading
        })
    }, [])
    // if (res == null) {
    //     return <>
    //         <Header />
    //         <p>404 No item with such id</p>
    //         <Footer />
    //     </>
    // }
    return <>
        <Header />
        <Container>
            <div className={styles.v_main}>
                {loading && < LoaderWheel />}
                {error != undefined && <p>"Bro, something wrong "<br></br>
                    {error.message}</p>}
                {
                    film != undefined &&
                    <>
                        <div className={styles.main}>
                            <img src="/src/assets/vintage-film-roll-stockcake.jpg" />
                            <section className={styles['info-pannel']}>
                                <h1>{film.title}</h1>
                                <h2>Stats</h2>
                                <p>Duration: {film.duration}</p>
                                <p>Reviews: {film.reviews}</p>
                            </section>
                        </div>
                        <h2>Description</h2>
                        <p>{film.description}</p>
                    </>
                }
            </div>
        </Container>
        <Footer />
    </>
}

export default ItemPage;