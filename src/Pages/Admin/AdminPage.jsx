import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import Btn from '../../Components/Btn';

const AdminPage = () => {
  return (
    <>
      <Header>
        <p className="text-light mb-0">  <img src="https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"
          className="rounded-circle mt-0" width="20" height="20"></img> Admin
          <Link to="/login"><button className="btn btn-outline-light ms-2" > Logout</button></Link>
        </p>
      </Header>
      <div className="row mt-5 ms-4 me-5 p-5 " >
        <div className="col-md-5 p-3 ms-5 me-5 shadow  bg-body rounded "  >
          <div className="card home-card" style={{ backgroundColor: "#fffafa" }}>
            <div className="card-body p-5">
              <h5 className="card-title">Question Table</h5>
              <p className="card-text">View and manage the list of questions.</p>

              <Link to="/questionTable" >
                <Btn name=" Go to Questions" />

              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-5 p-3 ms-5 me-5 shadow  bg-body rounded ">
          <div className="card home-card" style={{ backgroundColor: "#fffafa" }}>
            <div className="card-body p-5 ">
              <h5 className="card-title ">Add Question</h5>
              <p className="card-text">Create a new question for your application.</p>
              <Link to="/addQuestion" >
                <Btn name="Add Question" />

              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;