import styles from './PrimaryButton.module.css'

function PrimaryButton({ children }) {
    return <button type='button' className={styles["primary-button"]}>
        {children}
    </button>
}

export default PrimaryButton;