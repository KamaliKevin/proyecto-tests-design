import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCardHeader, MDBCardLink,
    MDBCardText,
    MDBCardTitle, MDBIcon, MDBInput, MDBListGroup, MDBListGroupItem, MDBRadio,
    MDBTypography
} from "mdb-react-ui-kit";
import RelationalQuestionDots from "./QuizComponents/RelationalQuestionDots";
import Swal from "sweetalert2";


const Quiz = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true); // Estado de carga (NOTA: Importante dejar, pues los datos pueden llegar tarde desde la API)

    const [quiz, setQuiz] = useState({});
    const [quizIsPlaying, setQuizIsPlaying] = useState(false);

    const [currentQuestionType, setCurrentQuestionType] = useState("");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState({});

    const [chosenAnswers, setChosenAnswers] = useState([]);


    useEffect(() => {
        const fetchQuiz = async (e) => {
            try {
                const response = await fetch(`http://localhost:8000/api/play/`+id, {
                    method: 'GET',
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch quiz data");
                }
                const quizData = await response.json();
                console.log(quizData);
                setQuiz(quizData);
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [id]);


    const handleTimestamp = (timestamp) => {
        const formattedTimestamp = new Date(timestamp);
        return `${formattedTimestamp.getDate()}/${formattedTimestamp.getMonth()}/${formattedTimestamp.getFullYear()} 
        a las ${formattedTimestamp.getHours()}:${formattedTimestamp.getMinutes()}`;
    }

    const handleCurrentQuestionType = (question) => {
        // NOTA: Esta función se debería modificar una vez haya más tipo de preguntas
        if(question.respuestas.length === 2 && question.respuestas.includes("Verdadero") && question.respuestas.includes("Falso")){
            setCurrentQuestionType("Verdadero/Falso");
        }
        else {
            setCurrentQuestionType("Opción múltiple");
        }
    }

    const handlePlayButtonClick = () => {
        setQuizIsPlaying(true);
        setCurrentQuestion(quiz.questions[0]);
        handleCurrentQuestionType(quiz.questions[0]);
    }

    const handlePreviousButtonClick = () => {
        if(currentQuestionIndex >= 1){
            setCurrentQuestion(quiz.questions[currentQuestionIndex - 1]);
            handleCurrentQuestionType(quiz.questions[currentQuestionIndex - 1]);
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    }

    const handleNextButtonClick = () => {
        if(currentQuestionIndex < quiz.questions.length - 1){
            setCurrentQuestion(quiz.questions[currentQuestionIndex + 1]);
            handleCurrentQuestionType(quiz.questions[currentQuestionIndex + 1]);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    }

    const handleCheckedAnswer = (event) => {
        const newChosenAnswer = {
            index: event.target.id, // Índice de opción
            value: event.target.value, // Texto de la opción
            questionId: currentQuestion.id // ID de la pregunta que corresponde a la opción
        };

        // Comprobamos si la respuesta marcada ya existe en el arreglo de respuestas escogidas:
        const repeatedChosenAnswerIndex = chosenAnswers.findIndex(answer => answer.questionId === newChosenAnswer.questionId);


        if (repeatedChosenAnswerIndex !== -1) {
            // Si la respuesta ya existía, reemplazamos con la nueva respuesta:
            const updatedChosenAnswers = [...chosenAnswers];
            updatedChosenAnswers[repeatedChosenAnswerIndex] = newChosenAnswer;
            setChosenAnswers(updatedChosenAnswers);
        }
        else {
            // Si no, simplemente la añadimos al arreglo de respuestas escogidas:
            setChosenAnswers([...chosenAnswers, newChosenAnswer]);
        }

    };

    const showQuestion = (question) => {
        // NOTA: Esta función se debería modificar una vez haya más tipo de preguntas
        let content;

        switch (currentQuestionType){
            case "Opción múltiple":
                content = <div>
                    <p>(Opción múltiple)</p>
                    <p>{question.enunciado}</p>
                    {question.respuestas.map((respuesta, index) => (
                        <MDBRadio name='multipleChoiceRadio' id={index.toString()}
                                  value={respuesta}
                                  checked={chosenAnswers.some(answer => answer.index === index && answer.value === respuesta && answer.questionId === currentQuestion.id)}
                                  onChange={handleCheckedAnswer} label={respuesta} />
                    ))}
                </div>
                break;

            case "Verdadero/Falso":
                content = <div>
                    <p>(Verdadero/Falso)</p>
                    <p>{question.enunciado}</p>
                    <MDBRadio name='trueFalseRadio' id={(0).toString()}
                              value={question.respuestas[0]}
                              checked={chosenAnswers.some(answer => answer.index === 0 && answer.value === question.respuestas[0] && answer.questionId === currentQuestion.id)}
                              onChange={handleCheckedAnswer} label={question.respuestas[0]} />

                    <MDBRadio name='trueFalseRadio' id={(1).toString()}
                              value={question.respuestas[1]}
                              checked={chosenAnswers.some(answer => answer.index === 1 && answer.value === question.respuestas[1] && answer.questionId === currentQuestion.id)}
                              onChange={handleCheckedAnswer} label={question.respuestas[1]} />
                </div>
                break;
        }

        return content;
    }

    const handleFinishButtonClick = () => {
        Swal.fire({
            icon: "warning",
            text: "Está a punto de finalizar el cuestionario. ¿Desea continuar?",
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonText: "Continuar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "green",
            cancelButtonColor: "red"
        }).then(result => {
            if(result.isConfirmed){
                // TODO - Manejar la lógica para cuando se termina el cuestionario
            }
        })
    }


    if (loading) {
        // Mostrar el indicador de carga si los datos aún no se cargan
        return (
            <div className="d-flex justify-content-center mt-5">
                <MDBCard>
                    <MDBCardBody>
                        <MDBTypography tag="h2">Cargando...</MDBTypography>
                    </MDBCardBody>
                </MDBCard>
            </div>
        );
    }


    return (
        <div>
            <MDBTypography tag="h4" color="primary" className="mt-5 ms-3">
                {quiz.category_names.map((name, index) => (
                    <span>{index === 0 ? name : ", " + name}</span>
                ))}
            </MDBTypography>

            <div className="d-flex justify-content-center align-content-center mt-5">
                <MDBCard>
                    <MDBCardHeader>
                        <MDBTypography>
                            <MDBTypography tag='h3' className="text-center my-3">
                                <MDBIcon fas icon="question" /> {quiz.name}
                            </MDBTypography>
                        </MDBTypography>
                    </MDBCardHeader>
                    <MDBCardBody>

                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBCardText>
                                    {quiz.description || "[Sin descripción]"}
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCardTitle>{quiz.name}</MDBCardTitle>
                        <MDBCardText>
                            {quizIsPlaying && showQuestion(currentQuestion)}
                            {/*
                                <div>
                                <p>(Rellenar)</p>
                                <MDBInput label="Respuesta" id="fillAnswer1" type="text" />
                                </div>
                                <hr/>
                                <div>
                                    <p>(Relacionar)</p>
                                    <RelationalQuestionDots/>
                                </div>
                            */}
                        </MDBCardText>

                        {quizIsPlaying ? (
                            <div>
                                <div className="d-flex align-items-center mb-4">
                                    <MDBBtn color='primary' className='flex-grow-1 me-2' onClick={handlePreviousButtonClick}>
                                        <MDBIcon fas icon="angle-double-left" /> Anterior
                                    </MDBBtn>
                                    <MDBBtn color='primary' className='flex-grow-1' onClick={handleNextButtonClick}>
                                        Siguiente <MDBIcon fas icon="angle-double-right" />
                                    </MDBBtn>
                                </div>
                                <MDBBtn color='success' className="mt-3" block onClick={handleFinishButtonClick}>
                                    <MDBIcon fas icon="stop" /> Terminar
                                </MDBBtn>
                            </div>
                        ) : (
                            <MDBBtn color='success' className='mb-4' block onClick={handlePlayButtonClick}>
                                <MDBIcon fas icon="play" /> Jugar
                            </MDBBtn>
                        )}

                        <div className="d-flex justify-content-between mt-3">
                            <MDBBtn color='link' rippleColor='success'>
                                <span className="fs-6"><MDBIcon far icon="thumbs-up" /> 120</span>
                            </MDBBtn>
                            {/* NOTA: Añadir un campo tipo INT "play_times", para contar la veces que se le da a "Jugar" */}
                            <span className="fs-6">Jugado 350 veces</span>
                        </div>
                    </MDBCardBody>
                    <MDBCardFooter className='text-muted'>
                        <MDBListGroup horizontal>
                            <MDBListGroupItem noBorders>
                                {/* NOTA: Ver como relacionar un test concreto con un usuario */}
                                Hecho por <MDBCardLink href="#">{quiz.author}</MDBCardLink>
                            </MDBListGroupItem>
                            <MDBListGroupItem noBorders>
                                Creado el {handleTimestamp(quiz.created_at)}
                            </MDBListGroupItem>
                            <MDBListGroupItem noBorders>
                                Actualizado el {handleTimestamp(quiz.updated_at)}
                            </MDBListGroupItem>
                        </MDBListGroup>
                    </MDBCardFooter>
                </MDBCard>
            </div>
        </div>
    );
}

export default Quiz;