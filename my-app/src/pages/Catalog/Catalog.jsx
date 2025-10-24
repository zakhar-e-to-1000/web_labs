import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import FilmGrid from '@/components/FilmGrid/FilmGrid'
import Container from "@/components/Container/Container"
import styles from "./Catalog.module.css"
import { useContext, useState } from "react"
import { FilmsContext } from "@/context/context"
import SearchForm from "@/components/SearchForm/SearchForm"
function Catalog() {
    const films = useContext(FilmsContext)
    function getShowFilms(options) {
        const { searchPreffix, sortField } = options
        const searchString = searchPreffix.toLowerCase().trim()
        let ans = films.filter((value) => {
            return value.title.toLowerCase().startsWith(searchString)
        })
        if (sortField != '') {
            ans.sort((a, b) => a[sortField] - b[sortField])
        }
        return ans;
    }
    const [ShowOptions, SetShowOptions] = useState({
        searchPreffix: '',
        sortField: ''
    })
    return <>
        <Header />
        <main>
            <Container>
                <h1>Каталог товарів</h1>
                <SearchForm optionsHook={SetShowOptions} />
                <FilmGrid filmList={getShowFilms(ShowOptions)} />
            </Container>
        </main>
        <Footer />
    </>
}
export default Catalog