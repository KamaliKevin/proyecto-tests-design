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


const Quiz = () => {
    return (
        <div>
            <MDBTypography tag="h4" color="primary" className="mt-5 ms-3">
                Categoría
            </MDBTypography>

            <div className="d-flex justify-content-center align-content-center mt-5">
                <MDBCard>
                    <MDBCardHeader>
                        <MDBTypography>
                            <MDBTypography tag='h3' className="text-center my-3">
                                <MDBIcon fas icon="question" /> Cuestionario
                            </MDBTypography>
                        </MDBTypography>
                    </MDBCardHeader>
                    <MDBCardBody>

                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBCardText>
                                    ¡Prepárate para desafiar tus conocimientos con nuestro emocionante cuestionario de trivia!
                                    Pon a prueba tu memoria y cultura general mientras te sumerges en una variedad de preguntas fascinantes.
                                    ¡Demuestra que eres el maestro de la trivia y compite por el título de campeón!
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCardTitle>Enunciado</MDBCardTitle>
                        <MDBCardText>
                            <div>
                                <p>(Opción múltiple)</p>
                                <MDBRadio name='multipleChoiceRadio' id='multipleChoiceRadio1' label='Opción 1' />
                                <MDBRadio name='multipleChoiceRadio' id='multipleChoiceRadio2' label='Opción 2' />
                                <MDBRadio name='multipleChoiceRadio' id='multipleChoiceRadio3' label='Opción 3' />
                                <MDBRadio name='multipleChoiceRadio' id='multipleChoiceRadio4' label='Opción 4' />
                            </div>
                            <hr/>
                            <div>
                                <p>(Verdadero / Falso)</p>
                                <MDBRadio name='trueFalseRadio' id='trueFalseRadio1' label='Verdadero' />
                                <MDBRadio name='trueFalseRadio' id='trueFalseRadio2' label='Falso' />
                            </div>
                            <hr/>
                            <div>
                                <p>(Rellenar)</p>
                                <MDBInput label="Respuesta" id="fillAnswer1" type="text" />
                            </div>
                            <hr/>
                            <div>
                                <p>(Relacionar)</p>
                                <RelationalQuestionDots/>
                            </div>
                        </MDBCardText>
                        <MDBBtn type='submit' color='success' className='mb-4' block>
                            <MDBIcon fas icon="play" /> Jugar
                        </MDBBtn>
                        <div className="d-flex justify-content-between mt-3">
                            <MDBBtn color='link' rippleColor='success'>
                                <span className="fs-6"><MDBIcon far icon="thumbs-up" /> 120</span>
                            </MDBBtn>
                            <span className="fs-6">Jugado 350 veces</span>
                        </div>
                    </MDBCardBody>
                    <MDBCardFooter className='text-muted'>
                        <MDBListGroup horizontal>
                            <MDBListGroupItem noBorders>
                                Hecho por <MDBCardLink href="#">RandomUser</MDBCardLink>
                            </MDBListGroupItem>
                            <MDBListGroupItem noBorders>
                                Creado el 30/01/2024 a las 12:30
                            </MDBListGroupItem>
                            <MDBListGroupItem noBorders>
                                Actualizado el 31/01/2024 a las 10:42
                            </MDBListGroupItem>
                        </MDBListGroup>
                    </MDBCardFooter>
                </MDBCard>
            </div>
        </div>
    );
}

export default Quiz;