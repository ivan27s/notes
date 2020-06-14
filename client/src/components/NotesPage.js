import React from 'react'
import {NavbarNotes} from "./Navbar";
import {NotesList} from "./NotesList";
import {AddNote} from "./AddNote";
import {Spinner} from "reactstrap";

class NotesPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            notes: []
        }
    }
    getNotes = async ()=>{
        try{
            const userData = JSON.parse(localStorage.getItem('userData'));
            const response = await fetch('/api/notes/',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userData.token}`
                }
            });
            const notes = await response.json();
            this.setState({notes: notes});
            this.setState({isLoading: false});
        }catch (e) {
            console.log(e)
        }


    };
    componentDidMount() {
      this.getNotes();
    }

    removeHandlerClick= async (noteId)=>{
        const userData = JSON.parse(localStorage.getItem('userData'));
        let notes =[...this.state.notes];
        notes = notes.filter(note=> note._id !== noteId);

        this.setState({notes: notes});
        fetch(`/api/notes/${noteId}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userData.token}`
            }
        });
    }


    render() {
        return (
            <React.Fragment>
                <NavbarNotes onLogoutClick={this.props.onLogout}/>
                <div className="container">
                   <AddNote
                       isLoading={()=> this.setState({isLoading: true})}
                       getNotes ={this.getNotes}
                   />

                   {this.state.isLoading &&  <div className="spinner"><Spinner  color="warning" /></div>}

                   <NotesList
                       notes={this.state.notes}
                       closeClick={this.removeHandlerClick}
                   />
                </div>
            </React.Fragment>
        )
    }
}

export default NotesPage