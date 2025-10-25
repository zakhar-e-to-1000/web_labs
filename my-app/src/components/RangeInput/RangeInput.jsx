import { useId, useState } from 'react';
import styles from "./RangeInput.module.css"

// function num_as_value(num) {
//     if (num != NaN)
// }

function RangeInput({ unitName = '', rangeHook, defaultValue, value, ...props }) {
    const [range, setRange] = useState([NaN, NaN])
    const id1 = useId()
    const id2 = useId()
    if (value === undefined) {
        value = [undefined, undefined]
    }
    if (defaultValue === undefined) {
        defaultValue = [undefined, undefined]
    }
    const handleRange = (p_range) => {
        setRange(p_range)
        rangeHook(p_range)
    }

    const handleMin = (e) => {
        const min = e.target.valueAsNumber
        handleRange([min, range[1]])
    }
    const handleMax = (e) => {
        const max = e.target.valueAsNumber
        handleRange([range[0], max])
    }

    return <div className={styles["input-container"]} {...props}>
        <input type="number" id={id1}
            value={value[0]} onChange={handleMin}
            defaultValue={defaultValue[0]} />
        <label htmlFor={id1}>{unitName}</label>
        <p> - </p>
        <input type="number" id={id2}
            value={value[1]} onChange={handleMax}
            defaultValue={defaultValue[1]} />
        <label htmlFor={id2}>{unitName}</label>
    </div>
}
export default RangeInput;