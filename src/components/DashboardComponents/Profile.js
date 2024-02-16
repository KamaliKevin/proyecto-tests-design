import {useEffect, useState} from 'react';
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
    const [formattedUserData, setFormattedUserData] = useState(JSON.parse(retrievedUserData));

    useEffect(() => {
        // Obtenemos la contraseña del usuario directamente de la base de datos
        // (quizá estaría bien tener una ruta en específica para esto)
        // (no es recomendable almacenar datos sensibles en el almacenamiento local):
        const fetchPassword = async (e) => {
            await fetch('http://localhost:8000/api/user', {
                method: 'GET',
                credentials: 'include', // Important: Include credentials for authentication
            }).then(response => response.json())
                .then(data => {
                    console.log(data);
                    setFormattedUserData(prevUserData => ({...prevUserData, password: data.password}));
                })
                .catch(error => console.error("Fucky wacky", error));
        }

        fetchPassword();
    }, []);


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
            // if (index !== 1) { // Excluir la contraseña en este caso
            //     return !value.trim();
            // }
            return false;
        });

        if (isAnyFieldEmpty) {
            alert('Please fill in all fields.');
            return;
        }

        // Actualizar datos a nivel de almacenamiento local
        const { password, editedUserDataWithoutPassword } = editedUserData;
        const newUserData = JSON.stringify(editedUserDataWithoutPassword);
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
                            label="Nombre"
                            type="text"
                            name="name"
                            value={isEditing ? editedUserData.name : userData.name}
                            disabled={!isEditing}
                            onChange={handleInputChange}
                            className='mb-4'
                        />

                        <MDBInput
                            label="Contraseña"
                            type="password"
                            name="password"
                            value={isEditing ? editedUserData.password : userData.password}
                            disabled={!isEditing}
                            onChange={handleInputChange}
                            className='mb-4'
                        />

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
                                <MDBBtn color="secondary" onClick={handleCancelClick}>Cancelar</MDBBtn>
                                <MDBBtn color="primary" onClick={handleSaveClick}>Guardar cambios</MDBBtn>
                            </div>
                        ) : (
                            <div className="d-grid gap-2">
                                <MDBBtn onClick={handleEditClick}>Editar datos</MDBBtn>
                            </div>
                        )}
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default Profile;