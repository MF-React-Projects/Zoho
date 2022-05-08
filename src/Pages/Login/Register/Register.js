import React, {useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {
    useCreateUserWithEmailAndPassword,
    useUpdateProfile
} from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import SocialLogin from "../SocialLogin/SocialLogin";
import {Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Register = () => {
    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const [agree, setAgree] = useState(false);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, {sendEmailVerification: true});
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const navigate = useNavigate();

    const navigateLogin = () =>{
        navigate('/login');
    }

    const handleRegister = async event =>{
        event.preventDefault();

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        //Error handling
        if(error){
            switch (error.code) {
                case 'auth/email-already-in-use':
                    toast.error('Email already in use');
                    break;
                case 'auth/invalid-email':
                    toast.error('Invalid email');
                    break;
                case 'auth/weak-password':
                    toast.error('Weak password');
                    break;
                default:
                    toast.error('Something went wrong');
                    break;
            }
        } else if(!agree){
            toast.error("You must agree to the terms and conditions");
            return;
        }
        //Create user
        createUserWithEmailAndPassword(email, password);

        const {data} = await axios.post('https://peaceful-castle-36366.herokuapp.com/login', {email});
        localStorage.setItem('accessToken', data.accessToken);

        if(updateError){
            switch (updateError.code) {
                case 'auth/requires-recent-login':
                    toast.error('You must sign in again');
                    break;
                case 'auth/user-disabled':
                    toast.error('User disabled');
                    break;
                case 'auth/user-not-found':
                    toast.error('User not found');
                    break;
                case 'auth/wrong-password':
                    toast.error('Wrong password');
                    break;
                default:
                    toast.error('Something went wrong');
                    break;
            }
        } else if(user){
            //Update profile
            await updateProfile({displayName: name});
        }

    }

    if(user){
        navigate('/');
    }

    return (
        <div className="login-wrapper">
            <Container>
                <Row className='justify-content-center'>
                    <Col lg={6}>
                        <div className="ic-login-content">
                            <h2 className='text-center font-bold'><span>Register</span></h2>
                            <Form onSubmit={handleRegister}>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control ref={nameRef} type="text" placeholder="Enter name" required/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control ref={emailRef} type="email" placeholder="name@example.com" required/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required/>
                                </Form.Group>
                                <Form.Group className="" controlId="formTerms">
                                    <Form.Check
                                        type="checkbox"
                                        label="I agree to the terms and conditions"
                                        onChange={() => setAgree(!agree)}
                                    />
                                </Form.Group>
                                <br/>
                                {
                                    loading ?
                                        <Button className='btn-default btnSm mb-3' type="submit" disabled>
                                            Register
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                className='ms-2'
                                            />
                                        </Button>
                                        :
                                        <Button className='btn-default btnSm mb-3' type="submit" disabled={!agree}>Register</Button>
                                }
                                <p className='d-flex'>Already Have An Account? Please, <Button variant='link' className='text-decoration-none py-0 px-1 border-0' onClick={navigateLogin}>Login</Button> Here</p>
                                <SocialLogin/>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Register;