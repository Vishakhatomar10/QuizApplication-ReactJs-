import React from 'react';
import Footer from '../../Components/Footer';

const AboutUs = () => {
  return (
    <>
    <div className="container my-5">
      <h1 className="text-center mb-4">About Our Quiz Application</h1>
      <div className="row">
        <div className="col-md-6 mt-4">
          <img
            src="https://i.pinimg.com/736x/a6/15/2c/a6152c294382a7f34c5312be5920e3b5.jpg"
            alt="Quiz Application"
            className="img-fluid rounded"
            style={{width:"450px"}}
          />
        </div>
        <div className="col-md-6 mt-4">
          <h2>Our Mission</h2>
          <p>
            Our quiz application aims to provide a fun and engaging way for users
            to test their knowledge on a variety of topics. We believe that
            learning should be an enjoyable experience, and our quizzes are
            designed to challenge and educate our users in a friendly and
            interactive manner.
          </p>
          <h2>Our Features</h2>
          <ul>
            <li>Wide range of quiz categories</li>
            <li>Timed quizzes for added challenge</li>
            <li>Leaderboard to track your progress</li>
            <li>Detailed results and explanations</li>
          </ul>
          <h2>Our Team</h2>
          <p>
            Our quiz application is developed and maintained by a passionate team
            of developers and content creators. We are constantly working to
            improve and expand our platform to provide the best possible
            experience for our users.
          </p>
        </div>
      </div>
    </div>
   <Footer />
    </>
  );
};

export default AboutUs;