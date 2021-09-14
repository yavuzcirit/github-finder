import React,{Fragment,Component} from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar'
import UserItem from './components/users/UserItem'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import User from './components/users/User'

import axios from 'axios'


class App extends Component{

  state={
    users:[],
    user:{},
    loading:false,
    alert:null
  }

  async componentDidMount(){
    // console.log(process.env.REACT_APP_GITHUB_CLIENT_ID)
    this.setState({loading:true});

    const response=await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({user:response.data, loading:false})
   
  }
  
//Search Github Users
  searchUsers=async text=>{
    this.setState({loading:true})
    const response=await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({users:response.data.items, loading:false})
    
  }

  //Get a Single Github User

  getUser=async (username)=>{
    this.setState({loading:true})
    const response=await axios.get(`https://api.github.com/search/users/${username}?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({user:response.data, loading:false})
  }

//Clear users
  clearUsers=()=>{
    this.setState({
      users:[],
      loading:false
    })
  }
//Set Alert
  setAlert=(msg,type)=>{
    this.setState({
      alert:{msg,type}
    })

    setTimeout(()=>this.setState({
      alert:null
    }),5000)
  }


  render(){
    const {users,loading,user}=this.state

    return (
      <Router>
      <div className='App'>
      <Navbar/>

      <div className='container'>
      <Alert alert={this.state.alert}/>

      <Switch>
        <Route exact path='/' render={props=>(
          <Fragment>
             <Search 
               setAlert={this.setAlert}
                searchUsers={this.searchUsers} 
                 clearUsers={this.clearUsers} 
                    showClear={users.length>0?true:false}/>
                 <Users loading={loading} users={users}/>
          </Fragment>
          )} />

          <Route exact path='/about' component={About}/>
          <Route exact path='/user/:login' render={props=>(
            <User {...props} getUser={this.getUser} user={user} loading={loading} />
            )}/>



      </Switch>


     
      </div>

      </div>
      </Router>

   );
  }
}

export default App;
