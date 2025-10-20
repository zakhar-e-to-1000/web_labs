import Card from "@/components/Card/Card"
import styles from "./FilmGrid.module.css"
function FilmGrid({ filmList }) {
    return <ul className={styles.film_view}>
        {filmList.map((val, ind) =>
            <Card key={val.id + "-" + ind} {...val} />)}
    </ul>
}

export default FilmGrid