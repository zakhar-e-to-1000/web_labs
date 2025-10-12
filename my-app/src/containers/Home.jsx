import Container from "../components/Container";
import Card from "../components/Card";
import styles from './Home.module.css'
function Home() {
    const numbers = [1, 2, 3, 4]
    const films = numbers.map((num) => <Card id={num} key={num}
        title={`Film ${num}`} duration={num * 2} reviews={num * 3} />)
    return <main>
        <Container>
            <h1 className={styles.home__title}>Кіно_тека</h1>
            <p>Найкраща тека на всій планеті!</p>
            <ul className={styles.film_view}>{films}</ul>
        </Container>
    </main>
}

export default Home;