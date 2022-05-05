import React from 'react';
import './SocialLogin.css';
import {useSignInWithGithub, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import {useNavigate} from 'react-router-dom';
import Loading from "../../Common/Loading/Loading";
import {FaGoogle} from "@react-icons/all-files/fa/FaGoogle";
import {FaGithub} from "@react-icons/all-files/fa/FaGithub";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SocialLogin = () => {
    const [signInWithGoogle, googleUser, googleLoading,googleError] = useSignInWithGoogle(auth);
    const [signInWithGithub, githubUser, githubLoading, githubError] = useSignInWithGithub(auth);
    const navigate = useNavigate();

    if (googleError || githubError) {
        switch (googleError?.code || githubError?.code) {
            case 'auth/account-exists-with-different-credential':
                toast.error('You have already signed up with a different auth provider for that email.');
                break;
            case 'auth/popup-blocked':
                toast.error('Please allow popups for this website');
                break;
            case 'auth/popup-closed-by-user':
                toast.error('The popup was closed by the user before finalizing the sign in.');
                break;
            default:
                toast.error(googleError?.message || githubError?.message);
        }
    }

    if (googleUser || githubUser) {
        navigate('/');
    }

    if (googleLoading || githubLoading) {
        return <Loading/>
    }

    return (
        <div className="social-login">
            <h4>Or</h4>
            <ul>
                <li>
                    <button onClick={() => signInWithGoogle()} className='social-google'>
                        <FaGoogle/>
                        <span className='px-2'>Google Sign In</span>
                    </button>
                </li>
                <li>
                    <button onClick={() => signInWithGithub()} className='social-github'>
                        <FaGithub/>
                        <span className='px-2'>Github Sign In</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default SocialLogin;