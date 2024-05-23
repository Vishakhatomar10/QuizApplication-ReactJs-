import React, { useState } from 'react';
import { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Btn from '../../Components/Btn';
import { UserContext } from '../../App';
import { Container } from 'react-bootstrap';
import PopUp from '../../Components/PopUp';

const PreviewPage = () => {
    const { quizData } = useContext(UserContext);

    const { selectedOptions } = useContext(UserContext);

    const [showPopup, setShowPopup] = useState(false);

    const handle = () => {

        switch (quizData[0].subject_id) {
            case "001":
                return "HTML";

            case "002":
                return "CSS";

            case "003":
                return "JavaScript";

        }
    }

    const navigate = useNavigate();


    const handleEdit = (index) => {
        const subjectName = handle();
        navigate(`/${subjectName}/${index}`);
    };


    const isAnyOptionNull = selectedOptions.some(option => option === null);

    const handleSubmit = () => {
        if (isAnyOptionNull) {
            setShowPopup(true);
        }
         else {
            navigate("/submit");
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };


    return (
        <>

            {showPopup && (
                <PopUp message="Please answer all questions before submitting.">
                    <Btn name="OK" className="ms-3 " style={{ color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', }} onClick={closePopup} />
                </PopUp>

            )}
            <Container fluid>
                <h1 className='text-center mt-3'>Preview</h1>
                <table className="mb-5 mt-4" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', marginBottom: "15px" }}>
                    <thead style={{ backgroundColor: '#0096FF', color: '#fff' }}>
                        <tr>
                            <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #fff' }}>Question</th>
                            <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #fff' }}>Selected Answer</th>
                            <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #fff' }}>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizData.map((question, index) => (
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#DEEFF5' }}>
                                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{question.question}</td>
                                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{selectedOptions[index]}</td>
                                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>
                                    <Btn name="Edit" onClick={() => handleEdit([index])} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-center mb-4">
                  
                        <Btn className='btn btn-dark ms-md-5 ps-4 pe-4 me-4'  name="Submit" onClick={handleSubmit} />
                    
                </div>
            </Container>
        </>
    );
};

export default PreviewPage;