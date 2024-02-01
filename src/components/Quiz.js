import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Basket from './Basket';
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


const Quiz = () => {
    return (
        <div className="d-flex justify-content-center align-content-center mt-5">
            <DndProvider backend={HTML5Backend}>
                <Basket/>
            </DndProvider>
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
                            <MDBRadio name='flexRadioDefault' id='flexRadioDefault1' label='Opción 1' />
                            <MDBRadio name='flexRadioDefault' id='flexRadioDefault2' label='Opción 2' />
                            <MDBRadio name='flexRadioDefault' id='flexRadioDefault3' label='Opción 3' />
                            <MDBRadio name='flexRadioDefault' id='flexRadioDefault4' label='Opción 4' />
                        </div>
                        <hr/>
                        <div>
                            <p>(Rellenar)</p>
                            <MDBInput label="Respuesta" id="fillAnswer1" type="text" />
                        </div>
                        <hr/>
                        <div>
                            <p>(Relacionar)</p>
                            <span>???</span>
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