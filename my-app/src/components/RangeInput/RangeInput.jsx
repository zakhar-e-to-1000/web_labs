import { useId } from 'react';
import styles from "./RangeInput.module.css"
function RangeInput({ unitName = '', id }) {
    const id1 = useId()
    const id2 = useId()
    return <div id={id} className={styles["input-container"]}>
        <input type="number" id={id1} />
        <label htmlFor={id1}>{unitName}</label>
        <p> - </p>
        <input type="number" id={id2} />
        <label htmlFor={id2}>{unitName}</label>
    </div>
}

export default RangeInput;