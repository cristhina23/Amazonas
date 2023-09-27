import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import "../index.css";
const Signin = () => {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  return (
    <Container className='small-container'>
      <h1 className='my-3'>Sign In</h1>
      <Form>
        <Form.Group
          className='mb-3'
          controlId='email'
        >
          <Form.Label>Email </Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            required
          />
        </Form.Group>
        <Form.Group
          className='mb-3'
          controlId='password'
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            required
          />
        </Form.Group>
        <div className='mb-3'>
          <Button type='submit'>Sign In</Button>
        </div>
        <div className='mb-3'>
          New Customer?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
};

export default Signin;
