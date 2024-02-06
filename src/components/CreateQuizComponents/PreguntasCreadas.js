import { Pregunta } from './Pregunta';
import { useState } from 'react';
import {MDBListGroup} from "mdb-react-ui-kit";

export const PreguntasCreadas = ({ preguntas, removeQuestion }) => {


    


    return (

        <div className="mt-5">
            <MDBListGroup light>
                {
                    preguntas.map(p => {
                        console.log(p);
                        return (<Pregunta key={p.id} pregunta={p} removeQuestion={removeQuestion} />)
                    })
                }
            </MDBListGroup>
        </div>
    )
}