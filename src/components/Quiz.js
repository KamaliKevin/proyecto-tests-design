import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCardHeader, MDBCardLink,
    MDBCardText,
    MDBCardTitle, MDBIcon, MDBInput, MDBRadio,
    MDBTypography
} from "mdb-react-ui-kit";
import RelationalQuestionDots from "./QuizComponents/RelationalQuestionDots";


const Quiz = () => {
    return (
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
                    <MDBTypography tag="h4" color="primary">
                        Categoría
                    </MDBTypography>
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
                    <MDBBtn type='submit' className='mb-4' block>Seguir</MDBBtn>
                    <div className="d-flex justify-content-between">
                        <MDBBtn color='link' rippleColor='success'>
                            <span className="fs-6"><MDBIcon far icon="thumbs-up" /> 120</span>
                        </MDBBtn>
                        <span className="fs-6">Jugado 350 veces</span>
                    </div>
                </MDBCardBody>
                <MDBCardFooter className='text-muted'>
                    <MDBTypography listInLine className='mb-0'>
                        <li className='list-inline-item'>Hecho por <MDBCardLink href="#">RandomUser</MDBCardLink></li>
                        <li className='list-inline-item'>Creado el 30/01/2024 a las 12:30</li>
                        <li className='list-inline-item'>Actualizado el 31/01/2024 a las 10:42</li>
                    </MDBTypography>
                </MDBCardFooter>
            </MDBCard>
        </div>
    );
}

export default Quiz;