import { useState, useContext, useEffect } from "react";
import { CreateQuizContext } from "./CreateQuizComponents/CreateQuizContext";
import { useSearchParams } from "react-router-dom";
import MultipleChoiceMain from "./CreateQuizComponents/MultipleChoiceComponents/MultipleChoiceMain";
import CreatedQuestions from "./CreateQuizComponents/CreatedQuestions";
import CheckQuestions from "./CreateQuizComponents/CheckQuestions";
import Swal from "sweetalert2";
import {
    MDBBtn, MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardText, MDBFile, MDBIcon,
    MDBInput,
    MDBTypography
} from "mdb-react-ui-kit";

import TrueFalseMain from "./CreateQuizComponents/TrueFalseComponents/TrueFalseMain";


const CreateQuiz = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedCategory, setSelectedCategory] = useState([]);

    const { currentQuestionId, questions } = useContext(CreateQuizContext);
    const { preguntas, setPreguntas } = questions;
    const { idPreguntaActual, setIdPreguntaActual } = currentQuestionId;

    const [searchParams, setSearchParams] = useSearchParams();
    const [categoryData, setCategoryData] = useState([]);

    // Conseguir los datos de las categorías existentes:
    useEffect(() => {
        const categories = async (e) => {
            await fetch('http://localhost:8000/api/categories', {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setCategoryData(data);
                })
                .catch(error => console.error("error", error));
        };

        categories();
    }, []);
    let id = null;
    id = searchParams.get("id");

    useEffect(() => {
        if (id != null) {
            const downloadID = async (e) => {
                const response = await fetch("http://localhost:8000/api/download-test/" + id, {
                    method: 'GET',
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Failed to download test');
                }

                const testJson = await response.json();
                setPreguntas(testJson);
                setIdPreguntaActual(testJson.length + 1);

            }
            downloadID();
            console.log(id);
        }

    }, id);

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleCategoryAdd = (event) => {
        // Multiple category WIP
        //setSelectedCategory([...selectedCategory ,event.target.value]);
        setSelectedCategory(event.target.value);
    };

    const removeQuestion = (id) => {
        Swal.fire({
            title: `¿Borrar la pregunta nº${id}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0ca104",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sí, bórrala"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Aa" + id);
                console.log(id);

                // Hacer que las preguntas estén ordenadas, independientemente de cuál se borre:
                setPreguntas(preguntas
                    .filter((pregunta) => pregunta.id != id)
                    .map((pregunta, index) => ({ ...pregunta, id: index + 1 })));
                setIdPreguntaActual(preguntas.length);

                Swal.fire({
                    title: "¡Eliminada!",
                    text: "La pregunta fue eliminada correctamente",
                    icon: "success"
                });
            }
        });

    }


    const saveToAccount = async () => {
        const csrfToken = document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];

        const formData = new FormData();
        formData.append('name', document.querySelector("#title").value);
        formData.append('category', selectedCategory);
        let blob = new Blob([JSON.stringify(preguntas)], { type: "application/json" });
        let file = new File([blob], "preguntas.json", {
            type: "application/json",
            lastModified: new Date()
        });
        //encodeURIComponent()
        formData.append('test_file', file);
        await fetch('http://localhost:8000/api/upload-test', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'X-XSRF-TOKEN': decodeURIComponent(csrfToken), // Include the CSRF token in the headers
            },
            credentials: 'include', // Include cookies for the domain
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    icon: "success",
                    title: "El cuestionario se sido subido a la plataforma con éxito",
                    showConfirmButton: true,
                })
            })
            .catch(error => console.error('Error:', error));

        await fetch('http://localhost:8000/api/user', {
            method: 'GET',
            credentials: 'include', // Important: Include credentials for authentication
        }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error("Fucky wacky", error));

    }


    const uploadJson = (event) => {
        const file = event.target.files[0];

        if (file.size === 0) {
            console.error("El cuestionario a importar está vacío");
            Swal.fire({
                icon: "error",
                title: "El cuestionario a importar está vacío",
                showConfirmButton: true,
            })
            return;
        }

        let reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(file);

        function onReaderLoad(event) {
            const result = event.target.result;

            // Verificar si el resultado es nulo o el archivo está vacío
            if (!result) {
                console.error("El cuestionario a importar está vacío");
                Swal.fire({
                    icon: "error",
                    title: "El cuestionario importado está vacío",
                    showConfirmButton: true,
                })
                return;
            }

            console.log(result);
            const importedQuestions = JSON.parse(result);

            // Verificar el formato del archivo
            if (!checkFileFormat(importedQuestions)) {
                console.error("El formato del archivo es inválido");
                Swal.fire({
                    icon: "error",
                    title: "El formato del archivo es inválido. Por favor, revise que su cuestionario esté bien escrito o no infringa ninguna norma",
                    showConfirmButton: true,
                })
                return;
            }

            // Continuar con el procesamiento del archivo
            setPreguntas(importedQuestions);
            setIdPreguntaActual(importedQuestions.length + 1);
            Swal.fire({
                icon: "success",
                title: "El cuestionario ha sido importado con éxito",
                showConfirmButton: true,
            })
            console.log("El cuestionario ha sido importado con éxito")
        }

        function checkFileFormat(preguntas) {
            // Verificar si el cuestionario es un arreglo
            if (!Array.isArray(preguntas)) {
                return false;
            }

            const idsUnicos = new Set();
            const enunciadosUnicos = new Set();

            // Verificar cada pregunta en el cuestionario
            for (const pregunta of preguntas) {
                // Comprobar si el ID de la pregunta es único
                if (idsUnicos.has(pregunta.id)) {
                    return false;
                }
                idsUnicos.add(pregunta.id);


                // Comprobar si el enunciado de la pregunta es único
                if (enunciadosUnicos.has(pregunta.enunciado)) {
                    return false;
                }
                enunciadosUnicos.add(pregunta.enunciado);


                // Comprobar si las respuestas no se repiten
                const respuestasUnicas = new Set(pregunta.respuestas);
                if (respuestasUnicas.size !== pregunta.respuestas.length) {
                    return false; // Respuestas no son únicas, formato inválido
                }

                // Comprueba si cada respuesta es una cadena de texto
                if (!pregunta.respuestas.every(respuesta => typeof respuesta === 'string')) {
                    return false;
                }


                // Verificar si la pregunta tiene todas las propiedades necesarias y cumple el formato
                if (
                    typeof pregunta.enunciado !== "string" ||
                    !Array.isArray(pregunta.respuestas) ||
                    pregunta.respuestas.length < 2 ||
                    typeof pregunta.respuestacorrecta !== "number" ||
                    pregunta.respuestacorrecta < 0 ||
                    pregunta.respuestacorrecta % 1 !== 0 ||
                    pregunta.respuestacorrecta >= pregunta.respuestas.length ||
                    typeof pregunta.favorita !== "boolean" ||
                    typeof pregunta.id !== "number" ||
                    pregunta.id % 1 !== 0 ||
                    pregunta.id < 1
                ) {
                    return false;
                }
            }

            // Si todas las preguntas pasan la verificación, el formato es válido
            return true;
        }
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
                        <select className="form-select mb-4" id='category'
                            value={selectedCategory} onChange={handleCategoryAdd}>
                            <option value="">-- Elige las categorias del test --</option>
                            {
                                categoryData.map(category => (
                                    <option value={category.id}>{category.name}</option>
                                ))
                            }
                        </select>

                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>

                        <select className="form-select mb-4" id='type'
                            value={selectedOption} onChange={handleSelectChange}>
                            <option value="">-- Elige el tipo de pregunta --</option>
                            <option value="Opcion multiple">Opción múltiple</option>
                            <option value="Verdadero / Falso">Verdadero / Falso</option>
                            <option value="Relacional">Relacional</option>
                        </select>

                        {/* Enseñar pregunta según el tipo elegido */}
                        {selectedOption === 'Opcion multiple' && (
                            <div>
                                <MultipleChoiceMain />
                            </div>
                        )}
                        {selectedOption === 'Verdadero / Falso' && (
                            <div>
                                <TrueFalseMain />
                            </div>
                        )}
                        {selectedOption === 'Relacional' && (
                            <div>
                                <p>Texto de muestra para Relacional</p>
                            </div>
                        )}


                        {/* Importación de cuestionario */}
                        <div className="mt-5">
                            <MDBFile label="Importar cuestionario" id="avatar" name="avatar" accept=".json" onChange={uploadJson} />
                        </div>


                        <CreatedQuestions
                            preguntas={preguntas}
                            removeQuestion={removeQuestion}
                        ></CreatedQuestions>

                        <CheckQuestions
                            preguntas={preguntas}
                        ></CheckQuestions>

                        {/* Comprobar que solo se puede exportar o terminar cuestionarios si hay al menos una pregunta */}
                        {preguntas.length > 0 && (
                            <>
                                <div className="mt-5">
                                    <a id="downloadAnchorElem" href={"data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(preguntas))}
                                        download="preguntas.json">
                                        <MDBBtn color="info" block>
                                            <MDBIcon fas icon="file-export" /> Exportar cuestionario
                                        </MDBBtn>
                                    </a>
                                </div>
                                <MDBBtn type='submit' className='mt-4' block onClick={saveToAccount}>
                                    <MDBIcon fas icon="check-double" /> Terminar cuestionario
                                </MDBBtn>
                            </>
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