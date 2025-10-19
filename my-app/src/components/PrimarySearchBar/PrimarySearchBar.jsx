import styles from './PrimarySearchBar.module.css'

function PrimarySearchBar({ id, defValue = "", placeholder = '' }) {
    return <input id={id} defaultValue={defValue} placeholder={placeholder} type='text' className={styles['search-bar']} />
}
export default PrimarySearchBar;