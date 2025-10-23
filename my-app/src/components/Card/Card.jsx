import styles from './Card.module.css'
import { Link } from 'react-router'
function Card({ id, title, duration, reviews }) {
    return <li className={styles.card} id={id}>
        <p className={styles.card__title}>{title}</p>
        <p className={styles.card__duration}>{duration} minutes</p>
        <p className={styles.card__review}>{reviews} reviews</p>
        <Link to={`/films/${id}`}>
            <button className={styles.card__buy}>watch</button>
        </Link>
    </li>
}

export default Card