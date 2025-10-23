import { useId } from 'react';
import styles from "./RangeInput.module.css"

function RangeInput({ unitName = '', id }, setMax, setMin) {
    const handleMin = (e) => {
        setMin(e.target.value)
    }
    const handleMax = (e) => {
        setMax(e.target.value)
    }
    const id1 = useId()
    const id2 = useId()
    return <div id={id} className={styles["input-container"]}>
        <input type="number" id={id1} onChange={handleMin} />
        <label htmlFor={id1}>{unitName}</label>
        <p> - </p>
        <input type="number" id={id2} onChange={handleMax} />
        <label htmlFor={id2}>{unitName}</label>
    </div>
}
export default RangeInput;