import React from 'react'
import {NoteItem} from "./NoteItem";


export const NotesList =(props)=> {
    return (
        <div className="container mt-5">
          <div className="row ">
              {props.notes.map((note,index) =>{
                  return (
                      <NoteItem
                          key={note._id}
                          id={note._id}
                          title={note.title}
                          text={note.text}
                          buttonName={'Редактировать'}
                          closeClick={props.closeClick}
                      />
                  )
              })}
          </div>
        </div>
    )
}