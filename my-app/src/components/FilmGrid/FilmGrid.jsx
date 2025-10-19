import Card from "@/components/Card/Card"
import styles from "./FilmGrid.module.css"
function FilmGrid({ filmList }) {
    return <ul className={styles.film_view}>
        {filmList.map((val) =>
            <Card {...val} />)}
    </ul>
}

export default FilmGrid