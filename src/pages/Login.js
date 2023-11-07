import React from 'react';
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuth }) {

    let navegate = useNavigate();

    const signInWithGoogle = () =>{
        signInWithPopup(auth, provider).then((result)=>{
            localStorage.getItem("isAuth", true);
            setIsAuth(true);
            navegate("/")
        })
    };

  return (
    <div className='loginPage'>
          <p>Faça login com o Google para continuar</p>
          <button className='login-with-google-btn' onClick={signInWithGoogle}>
              Login com o Google
          </button>
    </div>
  );
}

export default Login;