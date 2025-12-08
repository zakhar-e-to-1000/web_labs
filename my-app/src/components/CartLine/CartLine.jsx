import { useMemo } from 'react'
import styles from './CartLine.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setFilmQuant, deleteFilmFromCart } from '../../api/filmCartSlice'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
export default function CartLine({ cartItemId, className, ...props }) {

    const class_name = styles.cart_line + ' ' + className
    const filmCart = useSelector((state) => state.filmCart)
    const filmInfo = filmCart.find((item) => {
        return item.id === cartItemId
    })
    const dispatch = useDispatch()
    console.log(filmInfo)
    const {
        id,
        filmId,
        filmName,
        filmCount,
        variations,
        price
    } = filmInfo;
    let filmColor = ''
    if (variations.directorCut === true) {
        filmColor = styles['red_class']
    }
    return <div className={class_name} {...props}>
        <p>{filmId}</p>
        <p className={filmColor}>{filmName}</p>
        <p>Options: {JSON.stringify(variations)}</p>
        <form>
            <input type="number" value={filmCount} onChange={(e) => {
                const payload = { filmId, variations, filmCount: e.target.valueAsNumber }
                dispatch(setFilmQuant(payload))
            }} />
        </form>
        <p>{price}</p>
        <p>Total: {price * filmCount}</p>
        <PrimaryButton onClick={
            () => {

                console.log(id)

                dispatch(deleteFilmFromCart({
                    id: id
                }))
            }
        }>Delete</PrimaryButton>
    </div >
}