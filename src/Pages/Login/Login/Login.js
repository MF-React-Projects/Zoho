import React, {useRef} from 'react';
import {Container, Row, Form, Col, Button, Spinner} from 'react-bootstrap';
import {useSendPasswordResetEmail, useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';
import {useLocation, useNavigate} from 'react-router-dom';
import auth from '../../../firebase.init';
import SocialLogin from "../SocialLogin/SocialLogin";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    const handleSubmit = async event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        // Error handling
        if(error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    toast.error('User not found');
                    break;
                case 'auth/wrong-password':
                    toast.error('Wrong password');
                    break;
                case 'auth/missing-email':
                    toast.error('User not found with this email');
                    break;
                case 'auth/invalid-email':
                    toast.error('Invalid email');
                    break;
                default:
                    toast.error('Something went wrong');
                    break;
            }
        }

        // Sign in with email and password
        signInWithEmailAndPassword(email, password);

        const {data} = await axios.post('https://peaceful-castle-36366.herokuapp.com/login', {email});
        localStorage.setItem('accessToken', data.accessToken);
    }

    const navigateRegister = () => {
        navigate('/register');
    }

    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast.success("Email sent to reset password");
        } else {
            toast.error('please enter your email address');
        }
    }

    //redirect user to previous page
    let from = location.state?.from?.pathname || "/";

    if (user) {
        navigate(from, {replace: true});
    }

    return (
        <div className="login-wrapper">
            <Container>
                <Row className='justify-content-center'>
                    <Col lg={6}>
                        <div className="ic-login-content">
                            <h2 className='text-center font-bold'><span>Login</span></h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control ref={emailRef} type="email" placeholder="name@example.com" required/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required/>
                                </Form.Group>
                                <Button variant='link' className='text-primary text-decoration-none px-0 mb-2' onClick={resetPassword}>Forget Password?</Button>
                                <br/>
                                {
                                    loading ?
                                        <Button className='btn-default btnSm mb-3' type="submit" disabled>
                                            Login
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
                                        <Button className='btn-default btnSm mb-3' type="submit">Login</Button>

                                }
                                <p className='d-flex'>Don't Have An Account? Please, <Button variant='link' className='text-decoration-none py-0 px-1 border-0' onClick={navigateRegister}>Create Account</Button> Here</p>
                                <SocialLogin/>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;