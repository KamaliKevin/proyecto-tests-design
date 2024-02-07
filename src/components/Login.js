import {
    MDBBtn,
    MDBCard,
    MDBCardBody, MDBCardHeader, MDBCardText,
    MDBCheckbox,
    MDBCol, MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);

    const login = async (e) => {
        e.preventDefault();

        const cookie = await fetch("http://localhost:8000/sanctum/csrf-cookie", {
            method: 'GET',
            credentials: 'include'
        });

        const csrfToken = document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];

        // Build formData object.

        let formData = new FormData();
        formData.append('email', document.querySelector("#email").value);
        formData.append('password', document.querySelector("#password").value);

        await fetch("http://localhost:8000/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/json',
                //'X-Requested-With': 'XMLHttpRequest',
                'X-XSRF-TOKEN': decodeURIComponent(csrfToken), // Include the CSRF token in the headers
            },
            credentials: 'include', // Include cookies in the request
            body: formData
        }).then(async (res) => {
            if (!res.ok) {
                return res.json();
            }
            else {
                await fetch('http://localhost:8000/api/user', {
                    method: 'GET',
                    credentials: 'include', // Important: Include credentials for authentication
                }).then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error("Fucky wacky", error));
                navigate('/home');
            }
        })

    }

    const handleErrors = (errors) => {
        if (errors) {
            setErrors(errors);
        }
    }

    return (
        <div className="d-flex justify-content-center align-content-center mt-5">
            <MDBCard>
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="my-3">Login</MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBCardText>
                        <form>
                            {errors && (
                                <div className="alert alert-danger" role="alert">
                                    <h4>Has cometido los siguientes errores al iniciar sesión:</h4>
                                    {Object.keys(errors).map((key) => (
                                        <p key={key}>{key}: {errors[key]}</p>
                                    ))}
                                </div>
                            )}

                            <MDBInput className='mb-4' type='email' id='email' label='Email address' />
                            <MDBInput className='mb-4' type='password' id='password' label='Password' />

                            <MDBRow className='mb-4'>
                                <MDBCol className='d-flex justify-content-center'>
                                    <MDBCheckbox id='rememberMe' label='Remember me' defaultChecked />
                                </MDBCol>
                                <MDBCol>
                                    <a href='#'>Forgot password?</a>
                                </MDBCol>
                            </MDBRow>

                            <MDBBtn type='submit' className='mb-4' block onClick={login}>
                                Sign in
                            </MDBBtn>

                            <div className='text-center'>
                                <p>
                                    Not a member? <Link to="/register">Register</Link>
                                </p>
                                <p>or sign up with:</p>

                                <MDBBtn floating color="secondary" className='mx-1'>
                                    <MDBIcon fab icon='facebook-f' />
                                </MDBBtn>

                                <MDBBtn floating color="secondary" className='mx-1'>
                                    <MDBIcon fab icon='google' />
                                </MDBBtn>

                                <MDBBtn floating color="secondary" className='mx-1'>
                                    <MDBIcon fab icon='twitter' />
                                </MDBBtn>

                                <MDBBtn floating color="secondary" className='mx-1'>
                                    <MDBIcon fab icon='github' />
                                </MDBBtn>
                            </div>
                        </form>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default Login;