import React from 'react'
import { Form, FormGroup,
    Button, Input, Label,Alert } from 'reactstrap';

class AuthPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            alertMessage: null,
        }
        }

    handleChange = event =>{
        this.setState({[event.target.name]: event.target.value});
    };

    registerHandler =async ()=>{
        try {
            const form ={ email: this.state.email, password: this.state.password};
            const response =await fetch('/api/auth/register',{
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json'
                }

            });
            const data = await response.json();
            this.setState({alertMessage: data.message});
        }catch (e) {}
    };
    loginHandler =async ()=>{
        try {
            const form ={ email : this.state.email, password : this.state.password};
            const response =await fetch('/api/auth/login',{
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if(data.token){
                localStorage.setItem('userData',JSON.stringify({
                    userId : data.userId, token: data.token
                }));
                this.props.isAuthenticated()

            }else {
                this.setState({alertMessage:data.message});
            }

        }catch (e) {}
    };

    alert = ()=>{
        setTimeout(()=> this.setState({alertMessage: null}), 3000);
        return (
            <div className="auth-alert">
             <Alert color="warning"  >
                {this.state.alertMessage}
             </Alert>
            </div>
        )
    };

    render(){
        return (
            <div className="container">
                {
                    this.state.alertMessage && this.alert()
                }
                <Form className="col-md-6 auth-form">
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="Email"
                               value={this.state.email} onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Пароль</Label>
                        <Input type="password" name="password" id="password" placeholder="Пароль"
                               value={this.state.password} onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Button color="warning" onClick={this.loginHandler}
                            className="pl-4 pr-4 mr-2"> Вход </Button>
                    <Button color="success"
                            onClick={this.registerHandler}
                       > Регистрация</Button>
                </Form>
            </div>
        )
    }
}

export default AuthPage