import { useId } from "react"
import styles from './Select.module.css'
function Select({ options = [], defaultValue = '', id }) {
    return <select className={styles["default-select"]} id={id} defaultValue={defaultValue} >
        {
            options.map((item) =>
                <option key={item.value} value={item.value}>
                    {item.text}
                </option>)
        }
    </select >
}

export default Select