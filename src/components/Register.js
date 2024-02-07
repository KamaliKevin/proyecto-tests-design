import {
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
    MDBCard,
    MDBTypography,
    MDBCardHeader, MDBCardBody, MDBCardText
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from "react-router-dom";
import {useState} from "react";

const Register = () => {
    const [errors, setErrors] = useState(null);

    const register = async (e) => {
        e.preventDefault();

        const cookie = await fetch("http://localhost:8000/sanctum/csrf-cookie", {
            method: 'GET',
            credentials: 'include'
        });
        const token = document.cookie.split("; ").find((row) => row.startsWith("XSRF-TOKEN="))?.split("=")[1];
        //const token = getCookies("XSRF-TOKEN");

        console.log(token);
        // Build formData object.

        let formData = new FormData();
        formData.append('name', document.querySelector("#username").value);
        formData.append('email', document.querySelector("#email").value);
        formData.append('password', document.querySelector("#password").value);
        formData.append('password_confirmation', document.querySelector("#password_confirmation").value);


        const register = await fetch("http://localhost:8000/register", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "X-CSRF-Token": token
            },
            body: formData,

        }).then(res => {
            if (!res.ok) {
                handleErrors(res.errors);
                return res.json();
            }
            else {
                navigate("/login");
            }
        })
            
        console.log(register);
    }

    const handleErrors = (errors) => {
        if(errors){
            setErrors(errors);
        }
    }



    return (
        <div className="d-flex justify-content-center align-content-center mt-5">
            <MDBCard>
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="my-3">Register</MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBCardText>
                        <form id="formElement">
                            {errors && (
                                <div className="alert alert-danger" role="alert">
                                    <h6>Has cometido los siguientes errores al registrarte:</h6>
                                    {Object.keys(errors).map((key) => (
                                        <p key={key}>{key}: {errors[key]}</p>
                                    ))}
                                </div>
                            )}

                            <MDBInput className='mb-4' type='text' id='username' label='Username' />
                            <MDBInput className='mb-4' type='email' id='email' label='Email' />
                            <MDBInput className='mb-4' type='password' id='password' label='Password' />
                            <MDBInput className='mb-4' type='password' id='password_confirmation' label='Confirm Password' />
                            {/* <MDBInput className='mb-4' type='tel' id='phoneNumber' label='Phone number' /> */}

                            <MDBCheckbox
                                wrapperClass='d-flex justify-content-center mb-4'
                                id='newsletterSubscription'
                                label='Subscribe to our newsletter'
                                defaultChecked
                            />

                            <MDBBtn type='submit' className='mb-4' block onClick={register}>
                                Sign up
                            </MDBBtn>

                            <div className='text-center'>
                                <p>
                                    Already a member? <Link to="/login">Login</Link>
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

export default Register;