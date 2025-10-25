import { useId } from "react"
import styles from './Select.module.css'
function Select({ options = [], valueHook, ...props }) {

    return <select className={styles["default-select"]}
        onChange={
            (e) => valueHook(e.target.value)
        } {...props} >
        {
            options.map((item) =>
                <option key={item.value} value={item.value}>
                    {item.text}
                </option>)
        }
    </select >
}

export default Select