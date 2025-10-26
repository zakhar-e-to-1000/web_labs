import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import FilmGrid from '@/components/FilmGrid/FilmGrid'
import Container from "@/components/Container/Container"
import styles from "./Catalog.module.css"
import { useContext, useEffect, useState } from "react"
import get_films from "../../api/getFIlms"
import SearchForm from "@/components/SearchForm/SearchForm"
import axios from 'axios'

function Catalog() {

    const [ShowOptions, SetShowOptions] = useState({
        searchPreffix: '',
        sortField: '',
        sortOrder: '',
        durationRange: [NaN, NaN],
        reviewsRange: [NaN, NaN],
    }, [])
    const [showList, setShowList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    useEffect(() => {
        get_films({
            options: ShowOptions,
            setLoading, setError, setShowList
        })
    }, [ShowOptions])

    return <>
        <Header />
        <main>
            <Container>
                <h1>Каталог товарів</h1>
                <SearchForm optionsHook={SetShowOptions} />
                {loading && <h1>...Loading</h1>}
                <FilmGrid filmList={showList} />
            </Container>
        </main>
        <Footer />
    </>
}
export default Catalog