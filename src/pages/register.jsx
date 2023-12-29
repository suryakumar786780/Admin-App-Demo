import React, { useState } from 'react'

import { Link, useHistory } from 'react-router-dom';

import InputComp from '../components/inputcomp';
import TitleComp from '../components/title';

import Avatar from "../utilities/main.jpg"

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Register = () => {

    let history = useHistory();

    const [isLoading, setIsLoading] = useState(false);

    const [success, setSuccess] = useState(false);
    const [registerData, setRegisterData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    })

    const [validation, setValidation] = useState({
        first_name: false,
        last_name: false,
        email: false,
        password: false,
    })

    const changeInput = (ele) => {
        const { name, value } = ele.target;
        setRegisterData(prevState => ({
            ...prevState, [name]: value
        }));
    }

    const validateInputValue = async () => {
        let isValid = 0;
        let ischeck;
        for (const i in registerData) {
            ischeck = false;
            if (registerData[i]) {
                if (i === 'email') {
                    ischeck = (/^[a-z0-9]{4,}@g(oogle)?mail\.com$/).test(registerData[i]);
                    changeValidateState(i, !ischeck)
                    ischeck && ++isValid;
                } else if (i === 'password') {
                    ischeck = registerData[i].length >= 4;
                    changeValidateState(i, !ischeck)
                    ischeck && ++isValid;
                } else {
                    ischeck = (/^([A-Za-z\s]){3,}$/).test(registerData[i]);
                    changeValidateState(i, !ischeck)
                    ischeck && ++isValid;
                }
            } else {
                changeValidateState(i, true)
                --isValid;
            }
        }

        if (isValid === 4) {
            try {
                setIsLoading(true);
                const response = await fetch('http://node.mitrahsoft.co.in/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(registerData),
                });

                if (!response.ok) {
                    throw Error(response.status);
                } else {
                    setSuccess(true);
                    history.push('/login');
                }

                const data = await response.json();

            } catch (error) {
                console.error('Error:', error);
            }
            setIsLoading(false);
        };

    }

    const changeValidateState = (i, valid) => {
        setValidation(prevState => ({
            ...prevState, [i]: valid
        }));
    }

    return (
        <>{
            isLoading ?
                <div className='vh-100 text-center d-flex justify-content-center align-items-center'>
                    <CircularProgress />
                </div>
                :
                <>
                    <TitleComp title={"Register User"} />
                    <div className='d-flex justify-content-center min-vh-90 mx-5 border border-2'>
                        <div className=''>
                            <img src={Avatar} alt="person" width="200px" height="200px" />
                            <Box
                                component="form"
                                sx={{ m: 0, width: '25ch' }}
                                noValidate
                                autoComplete="off"
                            >
                                <InputComp name={"first_name"} type={"text"} label={"First Name"} placeHolder={"Enter First Name"} size={"small"} isError={validation.first_name} click={(e) => changeInput(e)} />
                                <InputComp name={"last_name"} type={"text"} label={"Last Name"} placeHolder={"Enter Last Name"} size={"small"} isError={validation.last_name} click={(e) => changeInput(e)} />
                                <InputComp name={"email"} type={"text"} label={"Email Address"} placeHolder={"Enter Email Address"} size={"small"} isError={validation.email} click={(e) => changeInput(e)} />
                                <InputComp name={"password"} type={"password"} label={"Password"} placeHolder={"Enter Password"} size={"small"} isError={validation.password} click={(e) => changeInput(e)} />
                                <button type="button" onClick={validateInputValue} className="btn btn-success mt-4 py-2 px-3 rounded-0 w-auto d-flex mx-auto">Register</button>
                            </Box>
                            <div className='text-success fw-bold mt-3 bg-warning'>{success && "User Registered Successfully..."}</div>
                            <div className='mt-3'>Already have an account? <Link to="/login">Login</Link></div>
                        </div>
                    </div>
                </>
        }
        </>
    )
}

export default Register