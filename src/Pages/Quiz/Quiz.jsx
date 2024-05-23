import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Row } from 'react-bootstrap';

import Card from 'react-bootstrap/Card';
import { UserContext } from '../../App';
import Btn from '../../Components/Btn';
import { Link, useParams } from 'react-router-dom';


function Quiz() {
  const { quizData, setQuizData } = useContext(UserContext);
  const { selectedOptions, setSelectedOptions } = useContext(UserContext);
  const { questionId, id } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    showData(id);
  }, []);

  const showData = (id) => {
    let subject_id = '';

    if (id === 'HTML') {
      subject_id = '001';
    } else if (id === 'CSS') {
      subject_id = '002';
    } else if (id === 'JavaScript') {
      subject_id = '003';
    }

    const sub = {
      subject_id: subject_id,
    };

    fetch('http://localhost:5000/quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sub),
    })
      .then((response) => response.json())
      .then((data) => {
        setQuizData(data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(parseInt(questionId) || 0);

  const [showNextButton, setShowNextButton] = useState(true);

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptions((prevOptions) => [
        ...prevOptions.slice(0, currentQuestionIndex),
        selectedOptions[currentQuestionIndex] || null,
        ...prevOptions.slice(currentQuestionIndex + 1),
      ]);
      setShowNextButton(true);
    } else {
      setShowNextButton(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOptions((prevOptions) => [
        ...prevOptions.slice(0, currentQuestionIndex),
        prevOptions[currentQuestionIndex] || null,
        ...prevOptions.slice(currentQuestionIndex + 1),
      ]);
      setShowNextButton(true);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOptions((prevOptions) => [
      ...prevOptions.slice(0, currentQuestionIndex),
      option,
      ...prevOptions.slice(currentQuestionIndex + 1),
    ]);
  };

  return (
    <>


      < Container fluid  style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: " #DEEFF5",
        justifyContent: 'center',
        alignItems: 'center',
      }}>


        <Container className=" mt-0 mb-5  ">
          <Card className='shadow'>
            <Card.Header style={{ backgroundColor: "#318CE7", color: "white" }} as="h3" className='text-center '>{id}  Quiz <br></br> <span>{currentQuestionIndex + 1}/{quizData.length}</span></Card.Header>
            <Card.Body >

              <Row className="ms-3 me-auto">
                {quizData.length > 0 && (
                  <>
                    <Card.Title as="h3">Q{currentQuestionIndex + 1}:  {quizData[currentQuestionIndex].question}</Card.Title>
                    <Card.Text>
                      <Form>
                        <Form.Check

                          type="radio"
                          label={quizData[currentQuestionIndex].option1}
                          name={`question${currentQuestionIndex}`}
                          id={`question${currentQuestionIndex}option1`}
                          checked={selectedOptions[currentQuestionIndex] === quizData[currentQuestionIndex].option1}
                          onChange={() => handleOptionChange(quizData[currentQuestionIndex].option1)}
                        />

                        <Form.Check
                          type="radio"
                          label={quizData[currentQuestionIndex].option2}
                          name={`question${currentQuestionIndex}`}
                          id={`question${currentQuestionIndex}option2`}
                          checked={selectedOptions[currentQuestionIndex] === quizData[currentQuestionIndex].option2}
                          onChange={() => handleOptionChange(quizData[currentQuestionIndex].option2)}
                        />
                        <Form.Check
                          type="radio"
                          label={quizData[currentQuestionIndex].option3}
                          name={`question${currentQuestionIndex}`}
                          id={`question${currentQuestionIndex}option3`}
                          checked={selectedOptions[currentQuestionIndex] === quizData[currentQuestionIndex].option3}
                          onChange={() => handleOptionChange(quizData[currentQuestionIndex].option3)}
                        />
                        <Form.Check
                          type="radio"
                          label={quizData[currentQuestionIndex].option4}
                          name={`question${currentQuestionIndex}`}
                          id={`question${currentQuestionIndex}option4`}
                          checked={selectedOptions[currentQuestionIndex] === quizData[currentQuestionIndex].option4}
                          onChange={() => handleOptionChange(quizData[currentQuestionIndex].option4)}
                        />
                      </Form>
                    </Card.Text>
                    {currentQuestionIndex < quizData.length - 1 ? (
                      <div>
                        <Btn className='btn btn-dark me-md-5' onClick={handlePrevious} name="Previous" />
                        <Btn className='btn btn-dark ms-md-5 ps-4 pe-4' onClick={handleNext} name="Next" />
                      </div>
                    ) : (
                      <div className="d-flex justify-content-between">
                        <Btn className='btn btn-dark me-md-5' onClick={handlePrevious} name="Previous" />
                        <Link to="/preview">  <Btn className='btn btn-dark ms-md-5 ps-4 pe-4 me-4 ' type="submit" name="Preview" /></Link>
                      </div>
                    )}
                  </>
                )}
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </Container>
    </>
  )


}

export default Quiz;