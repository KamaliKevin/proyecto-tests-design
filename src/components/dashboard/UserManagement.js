import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
    MDBTypography
} from "mdb-react-ui-kit";

const UserManagement = () => {
    const users = [
        { username: 'RandomUser', image_src: 'https://mdbootstrap.com/img/new/avatars/1.jpg' },
        { username: 'RandomUser2', image_src: 'https://mdbootstrap.com/img/new/avatars/2.jpg' },
        { username: 'RandomUser3', image_src: 'https://mdbootstrap.com/img/new/avatars/3.jpg' }
    ];


    return (
        <div className="d-flex justify-content-center">
            <MDBCard>
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="my-3">
                        <MDBIcon fas icon="users-cog" /> User Management
                    </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBListGroup light className='mb-3'>
                        {users.map((user, index) => (
                            <MDBListGroupItem key={index}>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='d-flex align-items-center'>
                                        <img
                                            src={user.image_src}
                                            alt='User image'
                                            style={{ width: '45px', height: '45px' }}
                                            className='rounded-circle'
                                        />
                                        <div className='ms-3'>
                                            <p className='fw-bold mb-1'>{user.username}</p>
                                        </div>
                                    </div>
                                    <div className="ms-5">
                                        <MDBBtn size='sm' rounded color='link'>
                                            View
                                        </MDBBtn>
                                        <MDBBtn size='sm' rounded color='danger' className="ms-2">
                                            Delete
                                        </MDBBtn>
                                        <MDBBtn size='sm' rounded color='primary' className="ms-2">
                                            Promote to admin
                                        </MDBBtn>
                                    </div>
                                </div>
                            </MDBListGroupItem>
                        ))}
                    </MDBListGroup>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default UserManagement;