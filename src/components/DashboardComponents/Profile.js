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
    const initialUserData = {
        username: 'John Doe',
        password: 'password123',
        email: 'johndoe@example.com',
        phoneNumber: '123-456-7890',
        profileImage: 'https://example.com/profile.jpg'
    };

    const [userData, setUserData] = useState(initialUserData);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUserData, setEditedUserData] = useState({ ...initialUserData });

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
                        <MDBIcon fas icon="user-cog" /> Profile
                    </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBCardText>
                        <MDBInput
                            label="Username"
                            type="text"
                            name="username"
                            value={isEditing ? editedUserData.username : userData.username}
                            disabled={!isEditing}
                            onChange={handleInputChange}
                            className='mb-4'
                        />
                        <MDBInput
                            label="Password"
                            type="password"
                            name="password"
                            value={isEditing ? editedUserData.password : userData.password}
                            disabled={!isEditing}
                            onChange={handleInputChange}
                            className='mb-4'
                        />
                        <MDBInput
                            label="Email"
                            type="email"
                            name="email"
                            value={isEditing ? editedUserData.email : userData.email}
                            disabled={!isEditing}
                            onChange={handleInputChange}
                            className='mb-4'
                        />
                        <MDBInput
                            label="Phone Number"
                            type="tel"
                            name="phoneNumber"
                            value={isEditing ? editedUserData.phoneNumber : userData.phoneNumber}
                            disabled={!isEditing}
                            onChange={handleInputChange}
                            className='mb-4'
                        />
                        <MDBInput
                            label="Profile Image"
                            type="text"
                            name="profileImage"
                            value={isEditing ? editedUserData.profileImage : userData.profileImage}
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