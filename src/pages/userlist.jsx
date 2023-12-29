import React, { useContext, useEffect, useState } from 'react'

import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../app';
import Card from '../components/imgcard';

import { Button } from '@mui/material';
import TitleComp from '../components/title';

const Userlist = () => {

  const [data, setData] = useState([]);
  const history = useHistory();
  const user = useContext(UserContext);

  const editFunc = (e) => {
    history.push(`/edituser/${e}`);
  }

  const deleteFunc = (e) => {
    const verify = confirm("User Data will be delete");
    if (verify) {
      const user = JSON.parse(localStorage.getItem('newUsers'));
      const pos = user.findIndex((u) => {
        return u.id === e;
      })
      user.splice(pos, 1);
      localStorage.setItem('newUsers', JSON.stringify(user));
      setData(user)
    }

  }

  const logout = () => {
    localStorage.setItem('isLogin', "false");
    user.setUser(false);
  }

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('newUsers') ?? "[]"))
  }, [])

  return (
    <div className='bg-secondary'>
      <TitleComp title={"User List"} />
      <div className='min-vh-100 mx-5 mb-3 w-75 mx-auto'>
        <div className='d-flex justify-content-between m-2'>
          <Link to="/dashboard"><Button variant="contained" color='info'>Back</Button></Link>
          <Link to="/adduser"><Button variant="contained" color='success'>Add User +</Button></Link>
        </div>
        <div className='container'>
          {
            data.length > 0 ? <div className="row" >{
              data.map((e) => {
                return <div className="col-xl-3 col-md-4 col-sm-6" key={e.id}>
                  <Card id={e.id} imgsrc={e.profile_img} imgalt={e.name} imgheight={"200"} cardtitle={e.name} cardcontent={e.job} editbtn={true} editFunc={() => editFunc(e.id)} deleteFunc={() => deleteFunc(e.id)} />
                </div>

              })}
            </div> : <div className='fs-3 fw-bold text-light text-center'> Data Not Found!</div>
          }
        </div>
        <div className='py-5 d-flex flex-row-reverse mx-2'>
          <Button variant="contained" color="error" onClick={logout}>Logout</Button>
        </div>
      </div>
    </div>
  )
}

export default Userlist