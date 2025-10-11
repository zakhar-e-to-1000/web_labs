import styles from './Сontainer.module.css'

function Container({ children, className }) {
    let class_string = styles.container;
    if (className != null) {
        class_string += ' ' + className
    }
    return <div className={class_string}>
        {children}
    </div>
}

export default Container