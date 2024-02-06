import {
    MDBBadge,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
    MDBTypography
} from "mdb-react-ui-kit";

const QuizHistory = () => {
    const playedQuizzes = [
        { category: 'Category #1', name: 'Quiz #1', creator: 'RandomUser', image_src: 'https://mdbootstrap.com/img/new/fluid/city/113.webp'},
        { category: 'Category #2', name: 'Quiz #2', creator: 'RandomUser2', image_src: 'https://mdbootstrap.com/img/new/fluid/city/114.webp'},
        { category: 'Category #3', name: 'Quiz #3', creator: 'RandomUser3', image_src: 'https://mdbootstrap.com/img/new/fluid/city/115.webp'}
    ];

    const madeQuizzes = [
        { category: 'Category #4', name: 'Quiz #4', image_src: 'https://mdbootstrap.com/img/new/fluid/city/116.webp' },
        { category: 'Category #5', name: 'Quiz #5', image_src: 'https://mdbootstrap.com/img/new/fluid/city/117.webp' },
        { category: 'Category #6', name: 'Quiz #6', image_src: 'https://mdbootstrap.com/img/new/fluid/city/118.webp' }
    ];

    return (
        <div className="d-flex justify-content-center">
            <MDBCard>
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="my-3">
                        <MDBIcon fas icon="list-alt" /> Quiz History
                    </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBTypography tag='h5' className="py-3 border-bottom">
                        Played quizzes
                    </MDBTypography>

                    <MDBListGroup light className='mb-3'>
                        {playedQuizzes.map((quiz, index) => (
                            <MDBListGroupItem key={index}>
                                <MDBBadge pill light color='primary' className="mb-3">
                                    {quiz.category}
                                </MDBBadge>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='d-flex align-items-center'>
                                        <img
                                            src={quiz.image_src}
                                            alt='Quiz image'
                                            style={{ width: '45px', height: '45px' }}
                                            className='rounded-circle'
                                        />
                                        <div className='ms-3'>
                                            <p className='fw-bold mb-1'>{quiz.name}</p>
                                            <p className='text-muted mb-0'>Created by <a href="#">{quiz.creator}</a></p>
                                        </div>
                                    </div>
                                    <div className="ms-5">
                                        <MDBBtn size='sm' rounded color='link'>
                                            View
                                        </MDBBtn>
                                    </div>
                                </div>
                            </MDBListGroupItem>
                        ))}
                    </MDBListGroup>

                    <MDBTypography tag='h5' className="py-3 border-bottom">
                        Quizzes made by you
                    </MDBTypography>

                    <MDBListGroup light className='mb-4'>
                        {madeQuizzes.map((quiz, index) => (
                            <MDBListGroupItem key={index}>
                                <MDBBadge pill light color='primary' className="mb-3">
                                    {quiz.category}
                                </MDBBadge>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='d-flex align-items-center'>
                                        <img
                                            src={quiz.image_src}
                                            alt='Quiz image'
                                            style={{ width: '45px', height: '45px' }}
                                            className='rounded-circle'
                                        />
                                        <div className='ms-3'>
                                            <p className='fw-bold mb-1'>{quiz.name}</p>
                                        </div>
                                    </div>
                                    <div className="ms-5">
                                        <MDBBtn size='sm' rounded color='link'>
                                            View
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

export default QuizHistory;