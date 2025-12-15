import { Field, Formik, Form } from "formik"
import PrimaryButton from "../PrimaryButton/PrimaryButton"
import styles from "./CheckoutForm.module.css"
import * as Yup from 'yup';
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { clearFilmCart } from "../../api/filmCartSlice";
const myRegex = /^[\p{L}]+$/u;
const phoneRegex = /^\+?380(\s*\d){9}$/;

const schema = Yup.object().shape({
    FirstName: Yup.string().trim().matches(myRegex, "Only letter").required(),
    LastName: Yup.string().trim().matches(myRegex, "Only letter").required(),
    Email: Yup.string().trim().email("Incorrect email").matches(/\..{2,}$/u, "less than two character for domain").required(),
    Phone: Yup.string().trim().matches(phoneRegex, 'wrong phone').required(),
    Adress: Yup.string().min(10).required(),
})

export default function CheckoutForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return <div>

        <Formik initialValues={{
            FirstName: '',
            LastName: '',
            Email: '',
            Phone: '',
            Adress: ''
        }}
            validationSchema={schema}
            onSubmit={(vals) => {
                console.log(vals)
                dispatch(clearFilmCart())
                navigate('/success')
            }}>
            {({ errors, touched }) => (
                <Form className={styles.form}>
                    <Field name='FirstName' className={styles['input']} placeholder='First Name' />
                    {errors.FirstName && touched.FirstName ? (
                        <div>{errors.FirstName}</div>
                    ) : null}
                    <Field name='LastName' placeholder='Last Name' />
                    {errors.LastName && touched.LastName ? (
                        <div>{errors.LastName}</div>
                    ) : null}
                    <Field name='Email' placeholder='email' />
                    {errors.Email && touched.Email ? (
                        <div>{errors.Email}</div>
                    ) : null}
                    <Field name='Phone' placeholder='phone' />
                    {errors.Phone && touched.Phone ? (
                        <div>{errors.Phone}</div>
                    ) : null}
                    <Field name='Adress' placeholder='Adress' />
                    {errors.Adress && touched.Adress ? (
                        <div>{errors.Adress}</div>
                    ) : null}

                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    </div>
}