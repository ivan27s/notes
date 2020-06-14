import React from 'react';
import './App.css';
import AuthPage from "./components/AuthPage";
import NotesPage from "./components/NotesPage";

class App extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            isAuthenticated: false
        }
    }

    onLogoutHandler =()=> {
        localStorage.removeItem('userData');
        this.setState({isAuthenticated: false})
    };
    componentDidMount() {
        const data =JSON.parse(localStorage.getItem('userData'));
        if(data && data.token){
            this.setState({isAuthenticated: true});
        }
    }

    render(){

      return (
         <div className="App" >
             {!this.state.isAuthenticated &&
             <AuthPage
                 isAuthenticated={()=>this.setState({isAuthenticated:true})}
            />}
             {this.state.isAuthenticated &&
               <NotesPage
                   onLogout={this.onLogoutHandler}
               />
             }
         </div>
      );
  }
}

export default App;
