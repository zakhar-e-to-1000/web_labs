import Container from "@/components/Container/Container";
import Card from "@/components/Card/Card";
import styles from './Home.module.css'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import FilmGrid from '@/components/FilmGrid/FilmGrid'
function Home() {
    const numbers = [1, 2, 3]
    const films = numbers.map((num) => {
        return {
            title: `Film ${num}`,
            id: num,
            duration: 2 * num,
            reviews: 3 * num
        }
    })
    const bo = false;
    return <>
        <Header />
        <main>
            <Container>
                <section className={styles.home__hero}>
                    <img src="src/assets/vintage-film-roll-stockcake.jpg" />
                    <div>
                        <h1 className={styles.home__title}>Кіно_тека</h1>
                        <p>Найкраща тека на всій планеті!</p>
                    </div>
                </section>
                <section>
                    <h2 className={styles.home__subtitle}>Найкращий вибір:</h2>
                    <FilmGrid filmList={films} />
                </section>
            </Container>
            {bo ? <p>jjjjj</p> : <p>hhh</p>}
        </main>
        <Footer />
    </>
}

export default Home;