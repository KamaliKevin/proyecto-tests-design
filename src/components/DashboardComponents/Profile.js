import { useState } from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardText, MDBIcon,
    MDBInput, MDBTypography
} from 'mdb-react-ui-kit';

const Profile = () => {
    // Obtenemos los datos del usuario que inició sesión
    const retrievedUserData = localStorage.getItem("USER") ?? "";
    const formattedUserData = JSON.parse(retrievedUserData);

    const [userData, setUserData] = useState(formattedUserData);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUserData, setEditedUserData] = useState({ ...formattedUserData });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedUserData({ ...userData });
    };

    const handleSaveClick = () => {
        // Check if any input field (except for password) is empty or contains only spaces
        const isAnyFieldEmpty = Object.values(editedUserData).some((value, index) => {
            if (index !== 1) { // Exclude the password field
                return !value.trim();
            }
            return false;
        });

        if (isAnyFieldEmpty) {
            alert('Please fill in all fields.');
            return;
        }

        // Actualizar datos a nivel de almacenamiento local
        const newUserData = JSON.stringify(editedUserData);
        localStorage.setItem("USER", newUserData);

        // Actualizar datos del usuario a nivel de componente
        setUserData({ ...editedUserData });
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData({ ...editedUserData, [name]: value });
    };

    return (
        <div className="d-flex justify-content-center">
            <MDBCard>
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="my-3">
                        <MDBIcon fas icon="user-cog" /> Perfil
                    </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBCardText>
                        <MDBInput
                            label="Nombre de usuario"
                            type="text"
                            name="username"
                            value={isEditing ? editedUserData.name : userData.name}
                            disabled={!isEditing}
                            onChange={handleInputChange}
                            className='mb-4'
                        />
                        {/* NOTA: Encontrar una manera de actualizar la contraseña */}
                        {/*
                            <MDBInput
                                label="Contraseña"
                                type="password"
                                name="password"
                                value={isEditing ? editedUserData.password : userData.password}
                                disabled={!isEditing}
                                onChange={handleInputChange}
                                className='mb-4'
                            />
                        */}
                        <MDBInput
                            label="Correo electrónico"
                            type="email"
                            name="email"
                            value={isEditing ? editedUserData.email : userData.email}
                            disabled={!isEditing}
                            onChange={handleInputChange}
                            className='mb-4'
                        />
                        {isEditing ? (
                            <div className="d-grid gap-2">
                                <MDBBtn color="secondary" onClick={handleCancelClick}>Cancel</MDBBtn>
                                <MDBBtn color="primary" onClick={handleSaveClick}>Save</MDBBtn>
                            </div>
                        ) : (
                            <div className="d-grid gap-2">
                                <MDBBtn onClick={handleEditClick}>Edit</MDBBtn>
                            </div>
                        )}
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default Profile;