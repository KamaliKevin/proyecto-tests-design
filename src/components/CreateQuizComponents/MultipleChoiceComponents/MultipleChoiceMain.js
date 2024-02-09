import { useEffect, useContext } from 'react';
import { useSearchParams } from "react-router-dom";
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import {CreateQuizContext} from "../CreateQuizContext";

function MultipleChoiceMain() {
  const { currentQuestionId, questions } = useContext(CreateQuizContext);
  const { preguntas, setPreguntas } = questions;
  let { idPreguntaActual, setIdPreguntaActual} = currentQuestionId;

  const [searchParams, setSearchParams] = useSearchParams();
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
        console.log(testJson);

      }
      downloadID();
      console.log(id);
    }

  }, id);

  const addQuestion = (nueva) => {
    nueva.id = idPreguntaActual;
    setIdPreguntaActual(idPreguntaActual + 1); {/* NOTA: No usar el incrementor "++": ¡no funciona! */}
    setPreguntas([...preguntas, nueva]);
  }

  // let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(preguntas));
  // let dlAnchorElem = document.getElementById('downloadAnchorElem');
  // dlAnchorElem.setAttribute("href",     dataStr     );
  // dlAnchorElem.setAttribute("download", "scene.json");
  // dlAnchorElem.click();



  return (
    <>
      <MultipleChoiceQuestion
        addPregunta={addQuestion}>
      </MultipleChoiceQuestion>
    </>
  );
}

export default MultipleChoiceMain;
