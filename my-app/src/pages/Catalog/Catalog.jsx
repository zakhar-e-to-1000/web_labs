import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import Card from "@/components/Card/Card"
import RangeInput from '@/components/RangeInput/RangeInput'
import FilmGrid from '@/components/FilmGrid/FilmGrid'
import Container from "@/components/Container/Container"
import Select from "@/components/Select/select"
import styles from "./Catalog.module.css"
import { useId } from "react"
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton"
import PrimarySearchBar from "@/components/PrimarySearchBar/PrimarySearchBar"
function Catalog() {
    const numbers = [1, 2, 3, 5, 6]
    const films = numbers.map((num) => {
        return {
            title: `Film ${num}`,
            id: num,
            duration: 2 * num,
            reviews: 3 * num
        }
    })
    const sortOptions = [
        { value: "", text: 'None' },
        { value: "1", text: "Name" },
        { value: "2", text: "Duration" }
    ]
    const selectId = useId();
    return <>
        <Header />
        <main>
            <Container>
                <h1>Каталог товарів</h1>
                <form className={styles.catalog__form}>
                    <PrimarySearchBar placeholder="search" />
                    <div>
                        <label className={styles.select__label} htmlFor={selectId}>Sort by</label>
                        <Select options={sortOptions} id={selectId} />
                    </div>
                    <p>Filters</p>
                    <div>
                        <p>Duration</p>
                        <RangeInput unitName='min.' />
                    </div>
                    <div>
                        <p>Reviews</p>
                        <RangeInput unitName='count' />
                    </div>
                    <div>
                        <PrimaryButton>Apply</PrimaryButton>
                        <PrimaryButton>Reset</PrimaryButton>
                    </div>
                </form>
                <FilmGrid filmList={films} />
            </Container>
        </main>
        <Footer />
    </>
}
export default Catalog