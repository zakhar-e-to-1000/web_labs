import styles from './PrimarySearchBar.module.css'


function PrimarySearchBar({ id, defValue = "", placeholder = '', onSubmit, onChange }) {
    const handleSubmit = (e) => {
        if (e.key == "Enter") {
            onSubmit(e.target.value)
        }
    }
    const handleChange = (e) => {
        onChange(e.target.value)
    }
    return <input id={id} defaultValue={defValue}
        placeholder={placeholder} type='text'
        className={styles['search-bar']} onKeyDown={handleSubmit} onChange={handleChange} />
}
export default PrimarySearchBar;