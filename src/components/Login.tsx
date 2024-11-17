import { Email } from '@mui/icons-material'
import { Button, Card, CardContent, Container, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import * as yup from 'yup'
export interface IValues {
    email: string,
    password: string
}

export const Login = () => {

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .email('Invalid type')
            .required('Email is required'),
        password: yup
            .string()
            .required('Password is required')
    })
    const initialValues = {
        email: "",
        password: ""
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            let data = JSON.stringify(values)
            console.log(data);
            try {
                axios.post('http://localhost:4444/auth/login', JSON.parse(data))
                    .then((res: any) => {
                        if (res.status === 200) {
                            localStorage.setItem("Token", res.data.token)
                            localStorage.setItem("type", res.data.type)
                            console.log(res.data);

                            toast.success("Login Successfull")
                        }
                        else{
                            toast.error("error" + res.data.message)
                        }
                        console.log("Response -----------------", res);
                        
                    })
            } catch (err: any) {
                console.log("Response -----------------", err.data);
                toast.error("Error : " + err)
            }

        }

    })

    return (
        <>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80svh' }}>
                <Card sx={{ minWidth: '22rem' }}>
                    <CardContent>
                        <Typography textAlign='center' variant='h3' mb='2rem'>Login</Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <Stack spacing='1rem'>
                                <TextField
                                    label="Email"
                                    name='email'
                                    id='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <TextField
                                    type='password'
                                    label="Password"
                                    name='password'
                                    id='password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                                <Button variant='contained' type='submit'>Login</Button>
                            </Stack>
                        </form>
                    </CardContent>
                </Card>
            </Container>

        </>
    )
}
