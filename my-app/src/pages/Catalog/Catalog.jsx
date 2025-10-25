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
        const { searchPreffix, sortField, sortOrder, valueRanges } = options
        const searchString = searchPreffix.toLowerCase().trim()
        let ans = films.filter((film) => {
            const boo1 = film.title.toLowerCase().startsWith(searchString)
            if (!boo1) { return false }
            for (let { key, range } of valueRanges) {
                const fitMin = !(film[key] < range[0])
                const fitMax = !(film[key] > range[1])
                if (!fitMax || !fitMin) {
                    return false
                }
            }
            return true
        })
        if (sortField != '') {
            ans.sort((a, b) => {
                let num = 0;
                if (a[sortField] > b[sortField]) {
                    num = 1;
                } else if (a[sortField] < b[sortField]) {
                    num = -1;
                }
                return num
            })
        }
        if (sortOrder == 'des') {
            ans.reverse()
        }
        return ans;
    }

    const [ShowOptions, SetShowOptions] = useState({
        searchPreffix: '',
        sortField: '',
        sortOrder: '',
        valueRanges: []
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