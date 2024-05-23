import React, { useContext, useEffect, useState } from 'react';
import Btn from '../../Components/Btn';
import { UserContext } from '../../App';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaTrophy } from 'react-icons/fa';

const SubmitPage = () => {
    const [results, setResults] = useState([]);
    const [correctAns, setCorrectAns] = useState([]);
    const { selectedOptions, setSelectedOptions } = useContext(UserContext);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [showSubmitTable, setShowSubmitTable] = useState(true);
    const { quizData, setQuizData } = useContext(UserContext);
    useEffect(() => {
        showScore();
    }, []);

    const showScore = () => {
        const sub = {
            subject_id: "001",
        };

        fetch('http://localhost:5000/score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sub),
        })
            .then((response) => response.json())
            .then((data) => {
                setCorrectAns(data.data);

                setResults(
                    data.data.map((item, index) => ({
                        question: item.question,
                        correctAnswer: item.correct_answer,
                        selectedAnswer: selectedOptions[index] || '-',
                        result: selectedOptions[index] === item.correct_answer ? '✅' : '❌',
                    }))
                );

            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const updateScore = () => {
        let newScore = 0;
        results.forEach((result) => {
            if (result.result === '✅') {
                newScore++;
            }
        });
        setScore(newScore);
        setShowResult(true);
        setShowSubmitTable(false);
    };

    return (
        <>
            {showSubmitTable && (<Container fluid>
                <div>
                    <h1 className='text-center mt-3'>Submit</h1>
                    <table className="mb-5 mt-4" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', marginBottom: "15px" }}>
                        <thead style={{ backgroundColor: '#0096FF', color: '#fff' }}>
                            <tr>
                                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #fff' }}>Question</th>
                                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #fff' }}>Correct Answer</th>
                                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #fff' }}>Selected Answer</th>
                                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #fff' }}>Result</th>
                            </tr>
                        </thead>
                        <tbody >
                            {results.map((result, index) => (
                                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#DEEFF5' }}>
                                    <td style={{ padding: '10px', border: '1px solid #ccc' }}>{result.question}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ccc' }}>{result.correctAnswer}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ccc' }}>{result.selectedAnswer}</td>
                                    <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{result.result}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="text-center">
                        <Btn name="Score" onClick={updateScore} />
                    </div>
                </div>
            </Container >
            )}

            {showResult && (

                <>


                    < Container fluid  style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex-block',
                        backgroundColor: " #ADD8E6",
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>


                        <Container fluid className="d-flex justify-content-center mt-4 ">


                            <div className="shadow-lg  p-5 mt-5  text-center " style={{ backgroundColor: "white", width: "50%", borderRadius: "8px" }}>
                                <div className="text-center mt-3 mb-5 text-dark">
                                    <h1 className='text-center mt-3 mb-5'>   Quiz Score</h1>
                                    <h3 >  Your Score:{score} </h3>
                                    <h3 className='mb-5'>&#128522;&#9996;</h3>
                                    <h4 style={{ color: "green" }}> <FaCheckCircle style={{ marginRight: '5px' }} />  Congratulations on completing the quiz!</h4>

                                </div>
                                <Link to="/login"><Btn name="Logout" onClick={() => {
                                    setSelectedOptions([]);
                                    setScore(0);
                                    setResults([]);
                                    setCorrectAns([]);
                                    setQuizData([]);
                                }} /></Link>
                            </div>
                        </Container>
                    </Container >


                </>
            )}
        </>
    );
};

export default SubmitPage;