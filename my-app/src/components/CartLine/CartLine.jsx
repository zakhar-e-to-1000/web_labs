import { useMemo } from 'react'
import styles from './CartLine.module.css'
import { useSelector } from 'react-redux'
export default function CartLine({ filmId, ...props }) {

    const className = styles.cart_line
    const filmCart = useSelector((state) => state.filmCart)
    const filmInfo = filmCart[filmId]
    console.log(filmInfo)
    const name = filmInfo.filmName;
    const count = filmInfo.filmCount;
    return <div className={className} {...props}>
        <p>{filmId}</p>
        <p>{name}</p>
        <p>Options: Director cut</p>
        <div className={styles.price_subgroup}>
            <p>{count}</p>
            <button>+</button>
            <button>-</button>
        </div>
        <p>$300</p>
    </div >
}