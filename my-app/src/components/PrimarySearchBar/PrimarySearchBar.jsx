import styles from './PrimarySearchBar.module.css'


function PrimarySearchBar({ onSubmit, valueHook, ...props }) {
    const handleSubmit = (e) => {
        if (e.key == "Enter") {
            onSubmit(e.target.value)
        }
    }
    const handleChange = (e) => {
        valueHook(e.target.value)
    }
    return <input
        type='text'
        className={styles['search-bar']}
        onKeyDown={handleSubmit} onChange={handleChange}
        {...props} />
}
export default PrimarySearchBar;