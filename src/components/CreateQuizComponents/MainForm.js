import Swal from 'sweetalert2';

import { useState } from 'react';
import { FormularioPregunta } from './FormularioPregunta';
import { PreguntasCreadas } from './PreguntasCreadas';
import { Route, Routes } from 'react-router-dom';
import { FormularioUsuario } from './FormularioUsuario';
import { MDBBtn, MDBFile } from "mdb-react-ui-kit";

let idActualPregunta = 1;

function MainForm() {
  const [preguntas, setPreguntas] = useState([]);

  const addQuestion = (nueva) => {
    nueva.id = idActualPregunta;
    idActualPregunta++;
    setPreguntas([...preguntas, nueva]);
  }

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

        Swal.fire({
          title: "¡Eliminada!",
          text: "La pregunta fue eliminada correctamente",
          icon: "success"
        });
      }
    });

  }

  const saveToAccount = async () => {


    const formData = new FormData();
    formData.append('name', 'Test Name'); // Replace 'Test Name' with the actual test name
    let blob = new Blob([JSON.stringify(preguntas)], { type: "application/json" });
    let file = new File([blob], "preguntas.json", {
      type: "application/json",
      lastModified: new Date()
    });
    //encodeURIComponent()
    formData.append('test_file', file); // Assuming 'file' is a File object from an <input> or drag-and-drop
    await fetch('http://localhost:8000/api/upload-test', {
      headers: {
        'Accept': 'application/json'
      },
      method: 'POST',
      credentials: 'include', // Include cookies for the domain
      body: formData,
    })
      .then(response => response.json())
      .then(data => console.log(data))
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
      idActualPregunta = importedQuestions.length;
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

  // let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(preguntas));
  // let dlAnchorElem = document.getElementById('downloadAnchorElem');
  // dlAnchorElem.setAttribute("href",     dataStr     );
  // dlAnchorElem.setAttribute("download", "scene.json");
  // dlAnchorElem.click();



  return (
    <>
      <FormularioPregunta
        addPregunta={addQuestion}>
      </FormularioPregunta>

      {/* Comprobar que solo se puede exportar cuestionarios si hay al menos una pregunta */}
      {preguntas.length > 0 && (
        <div className="mt-5">
          <a id="downloadAnchorElem" href={"data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(preguntas))}
            download="preguntas.json">
            <MDBBtn color="info" block>Exportar cuestionario</MDBBtn>
          </a>
        </div>
      )}

      <div className="mt-5">
        <MDBFile label="Importar cuestionario" id="avatar" name="avatar" accept=".json" onChange={uploadJson} />
      </div>

      <PreguntasCreadas
        preguntas={preguntas}
        removeQuestion={removeQuestion}
      ></PreguntasCreadas>

      <FormularioUsuario
        preguntas={preguntas}
      ></FormularioUsuario>
      <MDBBtn type='submit' className='mb-4' block onClick={saveToAccount}>
        Confirmar
      </MDBBtn>
    </>
  );
}

export default MainForm;
