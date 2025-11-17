import styles from './Cart.module.css'
import Container from "../../components/Container/Container"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import { useSelector } from 'react-redux'
import store from '../../api/store'
import { useEffect, useState } from 'react'
import get_film from '../../api/getFilm'
function Cart() {
    const list = useSelector((state) => Object.entries(state.filmCart))
    const [renderList, setRenderList] = useState([])
    useEffect(() => {
        async function get_names() {
            const temp_list = []
            for (let [filmId, filmCount] of list) {
                console.log(filmId)
                const temp = await get_film({ id: filmId })
                temp_list.push({
                    filmTitle: temp.title,
                    filmId,
                    filmCount,
                })
            }
            setRenderList(temp_list)
        }
        get_names()
    }, [])
    return <>
        <Header />
        <Container>

            <p>List of Films</p>
            <p>{JSON.stringify(list)}</p>
            <ul>
                {renderList.map(({ filmTitle, filmId, filmCount }) => {
                    return <li>
                        <span>{filmId + ': '}</span>
                        <span>{filmTitle + ': '}</span>
                        <span>{filmCount + ": "}</span>
                    </li>
                })}
            </ul>
        </Container>
        <Footer />
    </>
}

export default Cart;