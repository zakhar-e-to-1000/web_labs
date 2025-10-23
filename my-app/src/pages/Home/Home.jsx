import Container from "@/components/Container/Container";
import Card from "@/components/Card/Card";
import styles from './Home.module.css'
import { FilmsContext } from '@/context/context'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import FilmGrid from '@/components/FilmGrid/FilmGrid'
import { useContext, useState } from "react";
function Home() {
    const films = useContext(FilmsContext)
    const [viewLength, setViewLength] = useState(3);
    return <>
        <Header />
        <main>
            <Container>
                <section className={styles.home__hero}>
                    <img src="/src/assets/vintage-film-roll-stockcake.jpg" />
                    <div>
                        <h1 className={styles.home__title}>Кіно_тека</h1>
                        <p>Найкраща тека на всій планеті!</p>
                    </div>
                </section>
                <section>
                    <h2 className={styles.home__subtitle}>Найкращий вибір:</h2>
                    <FilmGrid filmList={films.slice(0, viewLength)} />
                    {(films.length > viewLength) &&
                        <button onClick={() => setViewLength(3 + viewLength)}> Show More</button>}
                </section>
            </Container>
        </main >
        <Footer />
    </>
}

export default Home;