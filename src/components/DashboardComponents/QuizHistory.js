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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const QuizHistory = () => {
    const navigate = useNavigate();

    const [madeQuizzes, setMadeQuizzes] = useState(
        []
    )


    // NOTA: Sustituir "playedQuizzes" después con datos de los tests jugados por un usuario desde la BD
    const playedQuizzes = [
        { category: 'Category #1', name: 'Quiz #1', creator: 'RandomUser', image_src: 'https://mdbootstrap.com/img/new/fluid/city/113.webp' },
        { category: 'Category #2', name: 'Quiz #2', creator: 'RandomUser2', image_src: 'https://mdbootstrap.com/img/new/fluid/city/114.webp' },
        { category: 'Category #3', name: 'Quiz #3', creator: 'RandomUser3', image_src: 'https://mdbootstrap.com/img/new/fluid/city/115.webp' }
    ];

    useEffect(() => {
        async function fetchAndSetUserTests() {
            try {
                const response = await fetch('http://localhost:8000/api/user/tests', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user tests');
                }

                const data = await response.json();
                const userTests = data.tests;

                let userTestData = userTests.map(test => ({
                    id: test.id,
                    name: test.name,
                    category_names: test.category_names,
                    image_src: 'https://mdbootstrap.com/img/new/fluid/city/116.webp', // NOTA: Sustituir después por imagen relacionada desde la BD
                }));

                setMadeQuizzes(userTestData);
            }
            catch (error) {
                console.error('Error fetching user tests:', error);
            }
        }

        fetchAndSetUserTests();
    }, []);



    const onView = async (id) => {
        // console.log("aa"+id);
        // navigate("/create-quiz?id="+id)
        navigate(`/quiz/edit/${id}`);
    }

    const onDelete = async (id) => {
        Swal.fire({
            icon: "warning",
            text: "AVISO: Está apunto de BORRAR un cuestionario. Esto significa que no podrá volver a verlo o editarlo. ¿Está seguro de eliminarlo de nuestra base de datos?",
            showCancelButton: true,
            confirmButtonText: "Sí, estoy seguro",
            confirmButtonColor: "green",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "red"
        }).then(result => {
            if (result.isConfirmed) {
                const csrfToken = document.cookie
                    .split('; ')
                    .find(cookie => cookie.startsWith('XSRF-TOKEN='))
                    ?.split('=')[1];

                const deleteQuiz = async (e) => {
                    try {
                        const response = await fetch(`http://localhost:8000/api/user/test/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'X-XSRF-TOKEN': decodeURIComponent(csrfToken), // Include the CSRF token in the headers
                            },
                            credentials: 'include' // Include cookies for the domain
                        });

                        if (!response.ok) {
                            throw new Error("Failed to delete quiz");
                        }

                        console.log("Quiz deleted successfully");
                        await Swal.fire({
                            icon: "success",
                            text: "Cuestionario borrado con éxito",
                            timer: 2000
                        }).then(result => {
                            window.location.reload();
                        });
                    }
                    catch (error) {
                        console.error(error);
                    }
                };

                deleteQuiz();
            }
        });
    }



    // madeQuizzes = [
    //     {id: 1, name: 'El arte de la ciencia', category_names: ['Arte', 'Ciencia'], image_src: 'https://mdbootstrap.com/img/new/fluid/city/116.webp' },
    //     {id: 2, name: 'Cielo y tierra', category_names: ['Geografía'], image_src: 'https://mdbootstrap.com/img/new/fluid/city/117.webp' },
    //     {id: 3, name: 'Historia del álgebra', category_names: ['Matemáticas', 'Historia'], image_src: 'https://mdbootstrap.com/img/new/fluid/city/118.webp' }
    // ];

    return (
        <div className="d-flex justify-content-center">
            <MDBCard>
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="my-3">
                        <MDBIcon fas icon="list-alt" /> Historial de cuestionarios
                    </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBTypography tag='h5' className="py-3 border-bottom">
                        Cuestionarios jugados
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
                                            <p className='text-muted mb-0'>Creado por <a href="#">{quiz.creator}</a></p>
                                        </div>
                                    </div>
                                    <div className="ms-5">
                                        <MDBBtn size='sm' rounded color='link' >
                                            Ver
                                        </MDBBtn>
                                    </div>
                                </div>
                            </MDBListGroupItem>
                        ))}
                    </MDBListGroup>

                    <MDBTypography tag='h5' className="py-3 border-bottom">
                        Cuestionarios hechos por ti
                    </MDBTypography>

                    <MDBListGroup light className='mb-4'>
                        {madeQuizzes.map((quiz, index) => (
                            <MDBListGroupItem key={index}>
                                {quiz.category_names.map(name => (
                                    <MDBBadge pill light color='primary' className="mb-3 me-1">
                                        {name}
                                    </MDBBadge>
                                ))}
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
                                    <div className="d-flex align-content-center ms-5">
                                        <MDBBtn className='me-2' color='danger' onClick={() => onDelete(quiz.id)}>
                                            <MDBIcon fas icon="trash" />
                                        </MDBBtn>
                                        <MDBBtn size='sm' rounded color='link' onClick={() => onView(quiz.id)}>
                                            Ver
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
