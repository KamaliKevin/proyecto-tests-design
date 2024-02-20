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
    const [currentQuestionResult, setCurrentQuestionResult] = useState("");

    const [chosenAnswers, setChosenAnswers] = useState([]);

    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [correctAnswerAmount, setCorrectAnswerAmount] = useState(0);

    const [quizIsFinished, setQuizIsFinished] = useState(false);

    useEffect(() => {
        const fetchQuiz = async (e) => {
            try {
                const response = await fetch(`http://localhost:8000/api/play/` + id, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch quiz data");
                }

                const quizData = await response.json();

                // Eliminamos las respuestas correctas para que no sean accesibles,
                // y de paso, quitamos datos innecesarios:
                quizData.questions.forEach(question => {
                    // Delete data, when api is implemented
                    //delete question.respuestacorrecta;
                    delete question.favorita;
                });

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
        switch(question.tipo){
            case "multipleAnswer":
                setCurrentQuestionType("Respuesta múltiple");
                break;

            case "multipleChoice":
                setCurrentQuestionType("Opción múltiple");
                break;

            case "falsoVerdadero":
                setCurrentQuestionType("Verdadero/Falso");
                break;

            default:
                setCurrentQuestionType("Tipo desconocido");
                break;
        }
    }

    const handleShareButtonClick = async () => {
        // NOTA: El "async" es necesario debido a que "navigator" es una API nativa de JS
        try {
            await navigator.clipboard.writeText(window.location.href);
            console.log("Quiz URL copied to clipboard successfully");
            await Swal.fire({
                icon: "success",
                text: "Enlace del cuestionario copiado al portapapeles",
                timer: 2000
            });
        }
        catch (error) {
            console.error("Failed to copy quiz URL to clipboard: ", error);
        }
    };

    const handlePlayButtonClick = () => {
        setQuizIsPlaying(true);
        setCurrentQuestion(quiz.questions[0]);
        handleCurrentQuestionType(quiz.questions[0]);
        console.log(quiz);

    }

    const handlePreviousButtonClick = () => {
        if (currentQuestionIndex >= 1) {
            setCurrentQuestion(quiz.questions[currentQuestionIndex - 1]);
            handleCurrentQuestionType(quiz.questions[currentQuestionIndex - 1]);
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    }

    const handleNextButtonClick = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestion(quiz.questions[currentQuestionIndex + 1]);
            handleCurrentQuestionType(quiz.questions[currentQuestionIndex + 1]);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    }

    const handleCheckedAnswer = (event) => {
        const newChosenAnswer = {
            index: event.target.id, // Índice de opción
            value: event.target.value, // Texto de la opción
            questionId: currentQuestion.id, // ID de la pregunta que corresponde a la opción
            isCorrect: false // Sirve para poder saber si la respuesta escogida en correcta o no (a manipular después)

            // NOTA: "isCorrect" no muestra explicitamente que la respuesta es correcta, ya que todos los valores
            // al principio serán "false" de manera predeterminada, y luego SÍ se comprueba si la respuesta en incorrecta o no
            // con el botón de "Terminar" ("handleFinishButtonClick")
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

    const showQuestionResult = (question) => {
        if (quizIsFinished) {
            const existingChosenAnswer = chosenAnswers.find(answer => answer.questionId === question.id);
            if (existingChosenAnswer.isCorrect) {
                return <p className="text-success">Respuesta correcta</p>;
            }
            else {
                return <p className="text-danger">Respuesta incorrecta</p>;
            }
        }
    }

    const showGrade = () => {
        const grade = (correctAnswerAmount * 10) / quiz.questions.length;
        return <p className="fw-bold">{`Su nota es ${grade} de 10`}</p>
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
            if (result.isConfirmed) {
                // TODO - Manejar la lógica para cuando se termina el cuestionario
                console.log(chosenAnswers);

                const compareToCorrectAnswers = async (e) => {
                    try {
                        // When api is available, fix this

                        // const response = await fetch(`http://localhost:8000/api/user/test/${quizId}`, {
                        //     method: 'GET',
                        //     credentials: 'include'
                        // });

                        // if (!response.ok) {
                        //     throw new Error("Failed to fetch quiz data to compare to correct answers");
                        // }

                        //const quizData = await response.json();

                        // Comparamos con los datos del back:
                        console.log(quiz);
                        quiz.questions.forEach((question, index) => {
                            if (chosenAnswers[index].index == question.respuestacorrecta) {

                                // Modificar el arreglo de respuestas escogidas para decir si una es correcta o no
                                setChosenAnswers(prevChosenAnswers => prevChosenAnswers.map((answer, indexCorrect) => {
                                    if (index == indexCorrect) {
                                        let temporalAmount = correctAnswerAmount + 1;
                                        setCorrectAnswerAmount(temporalAmount);

                                        return { ...answer, isCorrect: true }

                                    }
                                    return answer;
                                }));
                            }
                        });
                    }
                    catch (error) {
                        console.error(error);
                    }
                    finally {
                        setQuizIsFinished(true);
                        handleCurrentQuestionType(quiz.questions[0]);
                        setCurrentQuestion(quiz.questions[0]);
                        setCurrentQuestionIndex(0);
                    }
                };

                compareToCorrectAnswers();
            }
        })
    }

    const showQuestion = (question) => {
        // NOTA: Esta función se debería modificar una vez haya más tipo de preguntas
        let content;
        switch (currentQuestionType) {
            case "Opción múltiple":
                content = <div>
                    <p>(Opción múltiple)</p>
                    <p>{question.enunciado}</p>
                    {question.respuestas.map((respuesta, index) => (
                        <MDBRadio name='multipleChoiceRadio' id={index.toString()}
                            value={respuesta}
                            checked={chosenAnswers.some(answer => answer.index == index && answer.value === respuesta && answer.questionId === currentQuestion.id)}
                            onChange={handleCheckedAnswer} label={respuesta} disabled={quizIsFinished} />
                    ))}
                </div>
                break;

            case "Verdadero/Falso":
                content = <div>
                    <p>(Verdadero/Falso)</p>
                    <p>{question.enunciado}</p>
                    <MDBRadio name='trueFalseRadio' id={(0).toString()}
                        value={question.respuestas[0]}
                        checked={chosenAnswers.some(answer => answer.index == 0 && answer.value === question.respuestas[0] && answer.questionId === currentQuestion.id)}
                        onChange={handleCheckedAnswer} label={question.respuestas[0]} disabled={quizIsFinished} />

                    <MDBRadio name='trueFalseRadio' id={(1).toString()}
                        value={question.respuestas[1]}
                        checked={chosenAnswers.some(answer => answer.index == 1 && answer.value === question.respuestas[1] && answer.questionId === currentQuestion.id)}
                        onChange={handleCheckedAnswer} label={question.respuestas[1]} disabled={quizIsFinished} />
                </div>
                break;
        }

        return content;
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
            <div className="d-flex justify-content-between align-content-center">
                <MDBTypography tag="h4" color="primary" className="mt-5 ms-3">
                    {quiz.category_names.map((name, index) => (
                        <span>{index === 0 ? name : ", " + name}</span>
                    ))}
                </MDBTypography>

                <MDBBtn color='link' rippleColor='dark' onClick={handleShareButtonClick}>
                    <MDBIcon fas icon="share-alt" />
                </MDBBtn>
            </div>

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
                                    {quiz.description || "Sin descripción"}
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCardTitle>{quiz.name}</MDBCardTitle>
                        <MDBCardText>
                            {quizIsFinished && showGrade()}
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
                            {quizIsFinished && showQuestionResult(currentQuestion)}
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
                                <MDBBtn color='success' className="mt-3" block
                                    onClick={quizIsFinished ? () => { } : handleFinishButtonClick}
                                    disabled={quizIsFinished}>
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