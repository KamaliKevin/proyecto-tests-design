import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardText,
    MDBInput,
    MDBTypography
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";

const ChangePassword = () => {
    // Obtenemos los datos del usuario que inició sesión
    const retrievedUserData = localStorage.getItem("USER") ?? "";
    const formattedUserData = JSON.parse(retrievedUserData);

    const navigate = useNavigate();
    const { token } = useParams(); // Token de la URL del mensaje por email para cambiar la contraseña
    const [userData, setUserData] = useState(formattedUserData);
    const [errors, setErrors] = useState(null);

    const changePassword = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('email', userData.email);
        formData.append('password', document.querySelector("#new_password").value);
        formData.append('token', token);

        // NOTA: "http://localhost:8000/reset-password" es la ruta del back usada por Sanctum para COMPLETAR
        // el proceso de cambiar una contraseña
        await fetch("http://localhost:8000/reset-password", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/json',
                //'X-Requested-With': 'XMLHttpRequest',
                'X-XSRF-TOKEN': decodeURIComponent(localStorage.getItem("XSRF-TOKEN")), // Include the CSRF token in the headers
            },
            credentials: 'include', // Include cookies in the request
            body: formData
        }).then(async (res) => {
            if (!res.ok) {
                handleErrors(res.errors);
                return res.json();
            }
            else {
                Swal.fire({
                    title: "La contraseña ha sido cambiada con éxito",
                    icon: "success",
                    timer: 2000
                }).then(result => {
                    navigate("/dashboard");
                });
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
                    <MDBTypography tag='h3' className="my-3">Cambiar contraseña</MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBCardText>
                        <form>
                            {errors && (
                                <div className="alert alert-danger" role="alert">
                                    <h4>Has cometido los siguientes errores al intentar cambiar la contraseña:</h4>
                                    {Object.keys(errors).map((key) => (
                                        <p key={key}>{key}: {errors[key]}</p>
                                    ))}
                                </div>
                            )}

                            <MDBInput className='mb-4' type='password' id='new_password' label='Contraseña nueva' />


                            <MDBBtn type='submit' className='mb-4' block onClick={changePassword}>
                                Enviar
                            </MDBBtn>
                        </form>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}
export default ChangePassword;