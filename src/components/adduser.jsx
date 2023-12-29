import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box';
import InputComp from './inputcomp';
import RadioButtonComp from './radiobutton';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import TitleComp from './title';

const AddUser = () => {
    const useP = useParams();
    const history = useHistory();

    if (useP.id) {
        const user = JSON.parse(localStorage.getItem('newUsers'));
        const pos = user.findIndex((u) => {
            return u.id === +useP.id
        })
        const url = user[pos];
        if (!url) {
            history.push("/dashboard");
            return <></>
        }
    }
    const [newuser, setNewUser] = useState({
        name: '',
        gender: '',
        job: '',
        profile_img: '',
    });

    const [validation, setValidation] = useState({
        name: false,
        profile_img: false,
        job: false,
        gender: false,
    });

    const [result, setResult] = useState(false);

    const handleChange = (event) => {
        setNewUser(prevState => ({
            ...prevState, gender: event.target.value
        }));
    };

    const changeInput = (ele) => {
        const { name, value } = ele.target;
        setNewUser(prevState => ({
            ...prevState, [name]: value
        }));

    }

    const validateInputValue = () => {
        //-----------------------------------------------------------------------------------
        let isValid = 0;
        let ischeck;
        for (const i in newuser) {
            ischeck = false;
            if (newuser[i]) {
                if (i === 'profile_img') {
                    let crtURL = false;
                    try {
                        crtURL = new URL(newuser[i]);
                    }
                    catch (e) {
                        crtURL = "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png";
                        newuser.profile_img = crtURL
                    }
                    changeValidateState(i, false);
                    ++isValid;
                } else if (i === 'gender') {
                    ischeck = newuser[i].length > 0;
                    changeValidateState(i, !ischeck)
                    ischeck && ++isValid;
                } else {
                    ischeck = (/^([A-Za-z\s]){3,}$/).test(newuser[i]);
                    changeValidateState(i, !ischeck)
                    ischeck && ++isValid;
                }
            } else {
                changeValidateState(i, true)
                --isValid;
            }
        }
        //-----------------------------------------------------------------------------------

        if (isValid === 4 && !useP.id) {
            function generateCustomId() {
                return Math.floor(100000 + Math.random() * 900000);
            }
            setResult(true);
            const users = JSON.parse(localStorage.getItem('newUsers'));
            const cusId = generateCustomId();
            newuser["id"] = cusId;
            if (users.length > 0) {
                localStorage.setItem('newUsers', JSON.stringify([...users, newuser]))
            } else {
                localStorage.setItem('newUsers', JSON.stringify([newuser]))
            }
            setTimeout(() => {
                history.push('/userlist')
            }, 1000);

        } else if (isValid === 4) {
            setResult(true);
            const user = JSON.parse(localStorage.getItem('newUsers'));
            const pos = user.findIndex((u) => {
                return u.id === +useP.id
            })
            user.splice(pos, 1, newuser);
            localStorage.setItem('newUsers', JSON.stringify(user));
            setTimeout(() => {
                history.push('/userlist')
            }, 1000);
        }
        //-----------------------------------------------------------------------------------

    }

    const changeValidateState = (i, valid) => {
        setValidation(prevState => ({
            ...prevState, [i]: valid
        }));
    }

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('newUsers'));
        if (!users) {
            localStorage.setItem('newUsers', JSON.stringify(newuser))
        }
        if (useP.id) {
            const user = JSON.parse(localStorage.getItem('newUsers'));
            const pos = user.findIndex((u) => {
                return u.id === +useP.id
            })
            setNewUser(user[pos]);
        }
    }, [useP])

    return (
        <div>
            <TitleComp title={`${useP.id ? "Edit" : "Add"} User Details`} />
            <div className='d-flex justify-content-center min-vh-90 mx-md-5 mx-sm-3 border border-2 mb-3'>
                <Box
                    component="form"
                    sx={{ m: 0, width: '25ch' }}
                    noValidate
                    autoComplete="off"
                >
                    <InputComp name={"name"} type={"text"} label={"Name"} placeHolder={"Enter your Name"} size={"small"} isError={validation.name} click={(e) => changeInput(e)} inputVal={useP && newuser ? newuser.name : ""} />
                    <InputComp name={"profile_img"} type={"text"} label={"Profile Image URL"} placeHolder={"Enter Profile Url"} size={"small"} isError={validation.profile_img} click={(e) => changeInput(e)} inputVal={useP && newuser ? newuser.profile_img : ""} />
                    <InputComp name={"job"} type={"text"} label={"Job"} placeHolder={"Enter Job Title"} size={"small"} isError={validation.job} click={(e) => changeInput(e)} inputVal={useP && newuser ? newuser.job : ""} />
                    <RadioButtonComp name={"gender"} value={newuser.gender} click={handleChange} isError={validation.gender} inputVal={useP && newuser ? newuser.gender : ""} />
                    <button type="button" onClick={validateInputValue} className="btn btn-success mt-4 py-2 px-3 rounded-0 w-auto d-flex mx-auto">submit</button>
                    <div className='fw-bold text-success mt-2 text-center'>{result ? `User ${useP.id ? "Edited" : "Added"} Successfully` : ""}</div>
                </Box>
            </div>
        </div>
    )
}

export default AddUser