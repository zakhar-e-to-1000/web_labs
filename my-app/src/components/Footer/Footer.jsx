import {
    AiOutlineTwitter, AiFillFacebook,
    AiFillLinkedin, AiFillYoutube,
} from "react-icons/ai";
import { IconContext } from 'react-icons'
import styles from './Footer.module.css'
import Container from "@/components/Container/Container"

export default function Footer() {
    return <footer className={styles.footer}>
        <Container className={styles['сontainer--footer']}>
            <p>Залишайтесь на хвилі</p>
            <div className={styles.iconsPannel}>
                <IconContext.Provider value={{
                    size: '30px',
                    style: {
                        backgroundColor: '#fff'
                    }
                }}>
                    <AiFillFacebook style={{ color: '#304d8a' }} />
                    <AiOutlineTwitter style={{ color: '#35a2f4' }} />
                    <AiFillLinkedin style={{ color: '#147baf' }} />
                    <AiFillYoutube style={{ color: '#f44336' }} />
                </IconContext.Provider>
            </div>
        </Container>

    </footer >
}