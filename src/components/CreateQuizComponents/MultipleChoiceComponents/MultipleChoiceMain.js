import { useEffect, useContext } from 'react';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import {CreateQuizContext} from "../CreateQuizContext";

function MultipleChoiceMain() {
  const { currentQuestionId, questions } = useContext(CreateQuizContext);
  const { preguntas, setPreguntas } = questions;
  let { idPreguntaActual, setIdPreguntaActual} = currentQuestionId;

  

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
