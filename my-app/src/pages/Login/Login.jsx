import Container from "../../components/Container/Container";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate, useRoutes } from "react-router";
import * as Yup from 'yup';
import styles from './Login.module.css'
import { resetFilmCart } from "../../api/filmCartSlice";
const schema = Yup.object().shape({
    Email: Yup.string().trim().email("Incorrect email").matches(/\..{2,}$/u, "less than two character for domain").required(),
    Password: Yup.string().min(8).required(),
})

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return <>
        <Container>
            <Formik initialValues={{
                Email: "",
                Password: "",
            }} validationSchema={schema}
                onSubmit={({ Email }) => {
                    console.log(Email)
                    localStorage.setItem('email', Email)
                    dispatch(resetFilmCart())
                    navigate('/')
                }}

            >
                {({ errors, touched }) => (
                    <Form className={styles.form}>
                        < Field name='Email' placeholder='Email' />
                        {
                            errors.Email && touched.Email ? (
                                <div>{errors.Email}</div>
                            ) : null
                        }
                        <Field name='Password' placeholder='Password' />
                        {
                            errors.Password && touched.Password ? (
                                <div>{errors.Password}</div>
                            ) : null
                        }
                        <button type="submit">Submit</button>

                    </Form>
                )}
            </Formik>
        </Container >
    </>
}