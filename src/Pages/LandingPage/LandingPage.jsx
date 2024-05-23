import React from 'react';
import { Container, Row, Col, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import Btn from '../../Components/Btn';
import Footer from '../../Components/Footer';
import { FaChartLine, FaCode, FaTrophy } from "react-icons/fa";
import { LuTrophy } from 'react-icons/lu';

const LandingPage = () => {
  return (
    <>
      <div className="mt-4 mb-5">
        <Container fluid>
          <Row className="mt-5">
            <Col md={6} className="content ">
              <h1 className='text-center'>Test Your Programming Language Expertise</h1>
              <p className='ms-5'>
                Dive into our engaging quiz and challenge yourself to become a
                programming language master.
              </p>
              <Btn size="lg" className="ms-5" name="Read More" />
            </Col>
            <Col md={6}  >
              <img
                src="https://img.freepik.com/premium-vector/pecat_712431-87.jpg?w=740"
                alt="Programming Languages Quiz"
                className="img-fluid ms-5 mb-4"
                style={{ width: "80%" }}

              />
            </Col>
          </Row>

          <Row className="features-section" >
            <Col md={4} className="feature-item" style={{ width: 'calc(33.33% - 20px)', margin: '0 10px' }} >

              <h3> <FaCode /> Diverse Topics</h3>
              <p>
                Explore a wide range of programming languages, from popular
                choices to emerging technologies.
              </p>
            </Col>
            <Col md={4} className="feature-item" style={{ width: 'calc(33.33% - 20px)', margin: '0 10px' }}>

              <h3><LuTrophy /> Competitive Leaderboard</h3>
              <p>
                Compete with friends and colleagues to showcase your programming
                language expertise.
              </p>
            </Col>
            <Col md={4} className="feature-item" style={{ width: 'calc(33.33% - 20px)', margin: '0 10px' }}>

              <h3><FaChartLine />  Personalized Insights</h3>
              <p>
                Receive detailed performance reports and personalized
                recommendations to improve your skills.
              </p>
            </Col>
          </Row>

          <Row className="section">
            <Col md={12}>
              <h2>Ready to Test Your Programming Knowledge?</h2>
              <Link to="/login"><Btn name="Start" /></Link>
            </Col>
          </Row>
        </Container>

      </div>
      <Footer />
    </>

  );
};

export default LandingPage;