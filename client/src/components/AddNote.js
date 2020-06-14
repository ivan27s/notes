import React from 'react'
import { Modal, ModalHeader,
    ModalBody, Form,FormGroup,Button, Label, Input} from 'reactstrap';

export class AddNote extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            title: '',
            text: ''
        };
    }

    toggleModal =()=> {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    };
    handleChange = (event) =>{
        this.setState({[event.target.name]: event.target.value});
    };
    handleSubmit=async (event)=> {
        event.preventDefault();
        const userData =JSON.parse(localStorage.getItem('userData'));
        const data = {title: this.state.title, text: this.state.text};
        this.toggleModal();
        this.props.isLoading();
        await fetch('/api/notes/addNote',{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userData.token}`
            }
        });
        this.props.getNotes()

    };
    render() {
        return (
            <div className="container">
                <div className="add-note">
                    <Button color="warning"onClick={this.toggleModal} > + Добавить новую заметку</Button>{' '}

                 <Modal  isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                    <ModalHeader className="modal-notes" toggle={this.toggleModal}>Новая заметка</ModalHeader>
                    <ModalBody className="modal-notes" >
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="title">Заголовок заметки</Label>
                                <Input type="text" id="title" name="title"
                                       value={this.state.title} onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="text">Текст заметки</Label>
                                <textarea className="form-control" id="text" name="text"
                                          value={this.state.text} onChange={this.handleChange} required/>
                            </FormGroup>
                            <Button type="submit" value="submit" color="warning">Добавить</Button>
                        </Form>
                    </ModalBody>
                 </Modal>
                </div>
            </div>
        )
    }


}