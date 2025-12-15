import styles from './PrimaryButton.module.css'

function PrimaryButton({ children, onClick, ...props }) {
    return <button {...props} onClick={onClick} type='button' className={styles["primary-button"]}>
        {children}
    </button>
}

export default PrimaryButton;