import React, { useContext, useState } from 'react'

import InputComp from '../components/inputcomp';
import { UserContext } from '../app'
import Avatar from "../utilities/main.jpg"

import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TitleComp from '../components/title';


const Login = () => {
    const user = useContext(UserContext);

    const [registerData, setRegisterData] = useState({
        email: '',
        password: ''
    })

    const [validation, setValidation] = useState({
        email: false,
        password: false,
    })
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const changeInput = (ele) => {
        const { name, value } = ele.target;
        setRegisterData(prevState => ({
            ...prevState, [name]: value
        }));
    }

    const validateInputValue = async () => {
        let isValid = 0;
        let isCheck;
        for (const i in registerData) {
            isCheck = false;
            if (registerData[i]) {
                if (i === 'email') {
                    isCheck = (/^[a-z0-9]{4,}@g(oogle)?mail\.com$/).test(registerData[i]);
                    changeValidateState(i, !isCheck)
                    isCheck && ++isValid;
                } else if (i === 'password') {
                    isCheck = registerData[i].length >= 4;
                    changeValidateState(i, !isCheck)
                    isCheck && ++isValid;
                }
            } else {
                changeValidateState(i, true)
                --isValid;
            }
        }

        if (isValid) {
            try {
                setIsLoading(true);
                const response = await fetch('http://node.mitrahsoft.co.in/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(registerData),
                });

                if (!response.ok) {
                    localStorage.setItem("isLogin", "false");
                    throw Error(response);
                } else {
                    setError(false);
                    localStorage.setItem("isLogin", "true");
                    user.setUser(true);
                };
            } catch (error) {
                console.error('Error:', error);
                setError(true);
            }
            setIsLoading(false);
        }
    }

    const validateInput = (e) => {
        let returnValidate = /^([a-z0-9]){4,}@g(oogle)?mail\.com$/.test(e);
        return returnValidate;
    }

    const changeValidateState = (i, valid) => {
        setValidation(prevState => ({
            ...prevState, [i]: valid
        }));
    }


    return (
        <> {
            isLoading ?
                <div className='vh-100 text-center d-flex justify-content-center align-items-center'>
                    <CircularProgress />
                </div>
                :
                <>
                    <TitleComp title={"Login User"} />
                    <div className='d-flex justify-content-center min-vh-90 mx-5 border border-2'>
                        <div className=''>
                            <img src={Avatar} alt="person" width="200px" height="200px" />
                            <Box
                                component="form"
                                sx={{ m: 0, width: '25ch' }}
                                noValidate
                                autoComplete="off"
                            >
                                <InputComp name={"email"} type={"text"} label={"Email Address"} placeHolder={"Enter Email Address"} size={"small"} isError={validation.email} click={(e) => changeInput(e)} />
                                <InputComp name={"password"} type={"password"} label={"Password"} placeHolder={"Enter Password"} size={"small"} isError={validation.password} click={(e) => changeInput(e)} />
                                <button type="button" onClick={validateInputValue} className="btn btn-success mt-4 py-2 px-3 rounded-0 d-flex mx-auto">Login</button>
                            </Box>
                            <div className='text-danger'>{error ? "Invalid Email ID or Password" : ""}</div>
                            <div className='mt-3'>Don't have an account? <Link to="/">Register</Link></div>
                        </div>
                    </div>
                </>
        }

        </>
    )
}

export default Login