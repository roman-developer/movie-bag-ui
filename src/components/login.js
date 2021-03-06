import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
    Form,
    Button,
    Container
  } from 'react-bootstrap';


class Login extends Component {
  constructor() {
    super();
    this.state={
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      email: this.state.email,
      password: this.state.password
    };

    fetch('http://localhost:5000/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log('Success:', response);
      // Save token on LocalStorage
      localStorage.setItem('token', response.token);
    });
  }

  render () {
    return (
      <Container>
        <center><h1>Log in</h1></center>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Link to="/signup">Don't have an account?</Link>
      </Container>      
    );
  }
}
  
export default Login
