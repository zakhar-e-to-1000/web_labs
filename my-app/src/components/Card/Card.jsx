import { useSelector } from 'react-redux'
import styles from './Card.module.css'
import { Link } from 'react-router'
import { addFilmToCart } from '../../api/filmCartSlice'
import { useDispatch } from 'react-redux'

function Card({ id, title, duration, reviews }) {
    const dispatch = useDispatch()
    return <>
        <li className={styles.card} id={id}>
            <p className={styles.card__title}>{title}</p>
            <p className={styles.card__duration}>{duration} minutes</p>
            <p className={styles.card__review}>{reviews} reviews</p>
            <Link to={`/films/${id}`}>
                <button className={styles.card__buy} >watch</button>
            </Link >
            <button onClick={() => {
                dispatch(addFilmToCart({
                    filmId: id,
                    filmCount: 1,
                    filmName: title
                }))
            }}>Add to the cart</button>
        </li>
    </>
}

export default Card