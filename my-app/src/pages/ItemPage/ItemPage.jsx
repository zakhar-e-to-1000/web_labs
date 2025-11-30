import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import { use, useContext, useEffect, useState } from "react";
import { FilmsContext } from "@/context/context";
import { useParams } from "react-router";
import Container from '@/components/Container/Container'
import styles from './ItemPage.module.css'
import get_film from "../../api/getFilm";
import LoaderWheel from "../../components/LoaderWheel/LoaderWheel";
import { addFilmToCart } from "../../api/filmCartSlice";
import { useDispatch } from "react-redux";
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'

function ItemPage() {
    const { id } = useParams()
    const [film, setFilm] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const [isDirector, setIsDirector] = useState(false)

    let iconClassName = styles['film_icon']
    if (isDirector) {
        iconClassName += ' ' + styles['director-cut']
    }
    useEffect(() => {
        get_film({
            id: id,
            setError: setError,
            setLoading: setLoading
        }).then((film) => {
            setFilm(film)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

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
                            <img src="/src/assets/vintage-film-roll-stockcake.jpg" className={iconClassName} />
                            <section className={styles['info-pannel']}>
                                <h1>{film.title}</h1>
                                <h2>Stats</h2>
                                <p>Duration: {film.duration}</p>
                                <p>Reviews: {film.reviews}</p>
                                <div className={styles['select-group']}>
                                    <PrimaryButton onClick={() => { setIsDirector(false) }}>🩶Normal</PrimaryButton>
                                    <PrimaryButton onClick={() => { setIsDirector(true) }}>❤️Director Cut</PrimaryButton>
                                </div>
                                <PrimaryButton onClick={() => {
                                    dispatch(addFilmToCart({
                                        filmId: id,
                                        filmCount: 1,
                                        filmName: film.title,
                                        variations: {
                                            directorCut: isDirector
                                        }
                                    }))
                                }}>Add to the cart</PrimaryButton>
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