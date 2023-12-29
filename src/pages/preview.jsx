import { Button } from '@mui/material'
import React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import TitleComp from '../components/title';

const Preview = () => {
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

    const user = JSON.parse(localStorage.getItem('newUsers'));
    const pos = user.findIndex((u) => {
        return u.id === +useP.id
    })
    const data = user[pos];

    return (
        <>
            <TitleComp title={"User Details"} />
            <div className='min-vh-90 mx-auto mb-3 w-75 mx-auto border border-2 p-md-5 p-3'>
                <div className='d-flex justify-content-between m-2'>
                    <Link to="/userlist"><Button variant="contained" color='info'>Back</Button></Link>
                </div>
                <div className="preview d-md-flex justify-content-around ">
                    <div className="pre-content p-md-5 p-sm-3 border border-2 ms-md-5 h-auto w-sm-auto">
                        <h3 className='text-break'>{data.name}</h3>
                        <p>ID: {data.id}</p>
                        <p className='text-break'>{data.job}</p>
                        <p className='text-break'>{data.name} is a {data.job}</p>
                    </div>
                    <div className="w-50 previewImg">
                        <img src={useP.id && data.profile_img} alt={data.name} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Preview