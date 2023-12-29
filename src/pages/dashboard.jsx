import React, { useContext } from 'react';

import TotalUsersImg from "../utilities/users.jpg";
import MenUserImg from "../utilities/men.jpg";
import WomenUserImg from "../utilities/women.jpg";
import CardContent from '../components/card';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserContext } from '../app';
import TitleComp from '../components/title';

const Dashboard = () => {
    const user = useContext(UserContext);
    const data = JSON.parse(localStorage.getItem('newUsers') ?? "[]");

    let menCount = 0, womenCount = 0;
    data.length > 0 && data.forEach((e) => {
        e.gender === "male" ? menCount++ : womenCount++;
    })

    const jobType = data.length > 0 && data.reduce((acc, curr) => {
        let job = curr.job.toLowerCase()
        if (acc[job]) {
            acc[job] = ++acc[job]
        }
        else acc[job] = 1;
        return acc;
    }, {})

    const logout = () => {
        localStorage.setItem('isLogin', "false");
        user.setUser(false);
    }

    return (
        <>
            <TitleComp title={"Dashboard"} />
            <div className='min-vh-90 mx-md-5 border border-2 mb-2'>
                <div className='w-60'>
                    <div className='d-flex justify-content-end my-3'>
                        <Link to="/userlist"><Button variant="contained">User List</Button></Link>
                    </div>
                    <div className='imgcards row justify-content-around shadow-lg p-3 mb-5 bg-body rounded'>
                        <CardContent imgsrc={MenUserImg} imgalt={"men_users"} imgheight={"200"} cardtitle={"Men Users Count"} cardcontent={menCount} />
                        <CardContent imgsrc={TotalUsersImg} imgalt={"total_users"} imgheight={"200"} cardtitle={"Total Users Count"} cardcontent={!data ? "0" : data.length} />
                        <CardContent imgsrc={WomenUserImg} imgalt={"women_users"} imgheight={"200"} cardtitle={"Women Users Count"} cardcontent={womenCount} />
                    </div>
                    <div className="worktype row mt-3 mb-sm-4 justify-content-center shadow-lg p-3 mb-5 bg-body rounded">
                        <TitleComp title={"Job Types"} />
                        {
                            data.length > 0 && Object.keys(jobType).map((e, index) => {
                                return <div key={index} className='col-xl-3 col-md-4 col-sm-6 mt-2 job-card'>
                                    <CardContent key={index} cardtitle={e.toUpperCase()} cardcontent={jobType[e]} />
                                </div>
                            })
                        }
                    </div>
                    <div className='d-flex justify-content-end pb-2 my-3'>
                        <Button variant="contained" color="error" onClick={logout}>Logout</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard