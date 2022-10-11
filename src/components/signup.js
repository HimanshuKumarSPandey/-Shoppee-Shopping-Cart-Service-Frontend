import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SignUp extends Component {
constructor() {
super();
this.state={
username:'',
email:'',
password:'',

usernameError:'',
emailError:'',
passwordError:'',
isProfile: false, }
this.signup = this.signup.bind(this);
this.handleChange = this.handleChange.bind(this);
}
valid(){
if(this.state.username.length<4 && this.state.email.length<9 &&this.state.password.length<6 && this.state.role.length<1){
this.setState({usernameError:"Invalid Username",
emailError:"Invalid Email Id",
passwordError: "Password length should be more than 6",

})
}
else if(this.state.username.length<4){
this.setState({
usernameError:"Invalid Username"})
}
else if(this.state.email.length<9){
    this.setState({
    emailError:"Enter valid email address"})
    }
else if(this.state.password.length<6){
this.setState({
passwordError:"Password length should be more than 6"})
}

else{
return true
}
}
signup(e){
this.setState({usernameError:"",
emailError: "",
passwordError: "",
})
e.preventDefault();
if(this.valid()){
fetch("http://localhost:8080/api/auth/signup", {
"method": "POST",
"headers": {
"content-type": "application/json",
"accept": "application/json",
"Access-Control-Allow-Origin": "*"
},
"body": JSON.stringify({
username: this.state.username,
email: this.state.email,
password: this.state.password,

})
})
.then(response => response.json())
.then(response => {
alert("your registration is successfully submitted")
})
.catch(err => {
alert("your registration is not submitted")
});
}
}
handleChange(changeObject) {
this.setState(changeObject)
}
render(){
return (
<form>
<h3>SignUp</h3> <div className="form-group">
<label>UserName</label>
<input type="text" className="form-control" placeholder="Enter username"
onChange={(e) => this.handleChange({ username: e.target.value })} />
<p style={{color:"red" }}>{this.state.usernameError}</p>
</div> <div className="form-group">
<label>Email</label>
<input type="email" className="form-control" placeholder="Enter email"
onChange={(e) => this.handleChange({ email: e.target.value })} />
<p style={{color:"red" }}>{this.state.emailError}</p>
</div> <div className="form-group">
<label>Password</label>
<input type="password" className="form-control" placeholder="Enter password"
onChange={(e) => this.handleChange({ password: e.target.value })} />
<p style={{color:"red" }}>{this.state.passwordError}</p>
</div>
<button type="submit" className="btn" onClick={(e)=>this.signup(e)} >SignUp</button>
<p>Have an account? <Link to="/login">Login Here</Link></p>
</form>
);
}
}