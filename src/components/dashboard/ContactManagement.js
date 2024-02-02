import {
    MDBBadge, MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
    MDBTypography
} from "mdb-react-ui-kit";

const ContactManagement = () => {
    const contacts = [
        { category: 'Feedback', type: 'Feature idea', title: 'Private messages', creator: 'RandomUser', image_src: 'https://mdbootstrap.com/img/new/avatars/1.jpg'},
        { category: 'Feedback', type: 'Feature improvement', title: 'Quiz types', creator: 'RandomUser2', image_src: 'https://mdbootstrap.com/img/new/avatars/2.jpg'},
        { category: 'Report', type: 'Spam', title: 'Nonsense quizzes', creator: 'RandomUser3', image_src: 'https://mdbootstrap.com/img/new/avatars/3.jpg'}
    ];


    return (
        <div className="d-flex justify-content-center">
            <MDBCard>
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="my-3">
                        <MDBIcon fas icon="phone-square" /> Contact Management
                    </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBListGroup light className='mb-3'>
                        {contacts.map((contact, index) => (
                            <MDBListGroupItem key={index}>
                                <div className="d-flex justify-content-start align-items-center mb-3">
                                    <MDBBadge pill light color={contact.category === 'Feedback' ? 'warning' : 'danger'}>
                                        {contact.category}
                                    </MDBBadge>
                                    <MDBBadge pill light color='primary' className="ms-2">
                                        {contact.type}
                                    </MDBBadge>
                                </div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='d-flex align-items-center'>
                                        <img
                                            src={contact.image_src}
                                            alt='User image'
                                            style={{ width: '45px', height: '45px' }}
                                            className='rounded-circle'
                                        />
                                        <div className='ms-3'>
                                            <p className='fw-bold mb-1'>{contact.title}</p>
                                            <p className='text-muted'>{contact.creator}</p>
                                        </div>
                                    </div>
                                    <div className="ms-5">
                                        <MDBBtn size='sm' rounded color='link'>
                                            View
                                        </MDBBtn>
                                        <MDBBtn size='sm' rounded color='danger' className="ms-2">
                                            Dismiss
                                        </MDBBtn>
                                        <MDBBtn size='sm' rounded color='success' className="ms-2">
                                            Resolve
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

export default ContactManagement;