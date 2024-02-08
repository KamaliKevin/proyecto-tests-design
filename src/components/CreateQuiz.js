import {useEffect, useState} from "react";
import {
    MDBBtn, MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardText,
    MDBInput,
    MDBTypography
} from "mdb-react-ui-kit";
import MainForm from "./CreateQuizComponents/MainForm";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
    // State to store the selected option
    const [selectedOption, setSelectedOption] = useState('');

    // Function to handle change in select option
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };


    return (
        <div className="d-flex justify-content-center align-content-center mt-5">
            <MDBCard>
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="my-3">Crear cuestionario</MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBCardText>
                        <MDBInput className='mb-4' type='text' id='title' label='Título' />
                        <select className="form-select mb-4" id='type'
                            value={selectedOption} onChange={handleSelectChange}>
                            <option value="">-- Elige el tipo de test --</option>
                            <option value="Opcion multiple">Opción múltiple</option>
                            <option value="Verdadero / Falso">Verdadero / Falso</option>
                            <option value="Relacional">Relacional</option>
                        </select>

                        {/* Enseñar contenido según la opción escogida */}
                        {selectedOption === 'Opcion multiple' && (
                            <div>
                                <MainForm></MainForm>
                            </div>
                        )}
                        {selectedOption === 'Verdadero / Falso' && (
                            <div>
                                <p>Texto de muestra para Verdadero / Falso</p>
                            </div>
                        )}
                        {selectedOption === 'Relacional' && (
                            <div>
                                <p>Texto de muestra para Relacional</p>
                            </div>
                        )}
                        {/* {selectedOption !== "" && (
                            <MDBBtn type='submit' className='mb-4' block>
                                Confirmar
                            </MDBBtn>
                        )} */}
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default CreateQuiz;