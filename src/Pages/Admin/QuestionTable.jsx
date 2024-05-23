import React, { useState, useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Image } from "react-bootstrap"
import InputField from '../../Components/InputField';
import Btn from '../../Components/Btn';
import Header from '../../Components/Header';
import { Link } from 'react-router-dom';


const QuestionTable = () => {


    const [showEditForm, setShowEditForm] = useState(false);

    const [subjectId, setSubjectId] = useState('');
    const [editQuestionId, setEditQuestionId] = useState('');

    const handleSelectChange = (event) => {
        const select = event.target.value;
        if (select === 'HTML') {
            setSubjectId('001');
        } else if (select === 'CSS') {
            setSubjectId('002');
        } else {
            setSubjectId('003');
        }
    };
    
    const [formData, setFormData] = useState({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correct_answer: '',
        subjectId: subjectId,
        qid: editQuestionId,
    })


    const [selectedValue, setSelectedValue] = useState('default');
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetchData();
    }, [selectedValue]);

    const fetchData = () => {
        if (selectedValue !== 'default') {
            fetch('http://localhost:5000/showQuestionTable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subject: selectedValue }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setQuestions(data.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        } else {
            setQuestions([]);
        }
    };

    const editRow = (ques_obj) => {

        setShowEditForm(true);
        setFormData(ques_obj)
    };



    const editQuestion = (event) => {
        event.preventDefault();

        let subject_id = '';

        if (formData.subject === 'HTML') {
            subject_id = '001';
        } else if (formData.subject === 'CSS') {
            subject_id = '002';
        } else {
            subject_id = '003';
        }



        const formDataaa = {
            subject_id: subject_id,
            question: formData.question,
            option1: formData.option1,
            option2: formData.option2,
            option3: formData.option3,
            option4: formData.option4,
            correct_answer: formData.correct_answer,
            ques_id: formData.ques_id


        };
     

        fetch('http://localhost:5000/editQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataaa),
        })
            .then((response) => {
                if (response.ok) {
                    setFormData({
                        subject: '',
                        question: '',
                        option1: '',
                        option2: '',
                        option3: '',
                        option4: '',
                        correct_answer: '',
                    });
                    setShowEditForm(false);
                    fetchData();

                } else {
                    console.error('Failed to edit question in the database.');
                }
            })
            .catch((error) => {
                console.error('Error updating data:', error);
            });

    };


    return (
        <>
            <Header>
                <p className="text-light mb-0">  <img src="https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"
                    className="rounded-circle mt-0" width="20" height="20"></img> Admin
                    <Link to="/login"><button className="btn btn-outline-light ms-2" > Logout</button></Link>
                </p>
            </Header>
            <div className='mt-2'>

                <label style={{ paddingBottom: "5px", marginRight: "10px", marginLeft: "10px", marginTop: "20px" }}>Subject </label>

                <select style={{ width: "20%", padding: ".370rem .65rem", border: "solid 1px #AEAEAE", borderRadius: "5px",  }}
                    id="subject" value={selectedValue}
                    onChange={(e) => {
                        handleSelectChange(e);
                        setSelectedValue(e.target.value);
                    }} >

                    <option value="">Select Subject</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="JavaScript">JavaScript</option>


                </select>
            </div>
            {showEditForm && <Container className=" shadow  border border-light mt-3 p-3 w-75 mb-4 d-flex justify-content-between"
                style={{
                    marginBottom: "20rem",
                    marginTop: "20rem",
                    borderRadius: "1rem",

                    backgroundColor: "#fffafa"


                }}

            >
                <Image src="https://img.freepik.com/premium-photo/black-person-chatting-smartphone-sitting-desk-happy-freelancer-office-female-working-remotely-use-laptop-flat-vector-illustration-isolated-white-background_967785-48511.jpg?w=740"
                    className="mb-3 w-50 pt-5 pb-5 pe-3 ps-3 mt-5" style={{ height: "70%", }} />

                <Row className="w-50">
                    <Col >

                        <Form id="questionForm" className="mt-2">
                            <h2 className='text-center mb-3'>EDIT QUESTION</h2>



                            <InputField
                                label="Question" type="text" id="question"
                                change={(event) => {
                                    setFormData((prev) => {
                                        const prevForm = { ...prev };
                                        prevForm.question = event.target.value;

                                        return prevForm;
                                    })

                                }}
                                value={formData.question}
                                placeholder="Enter Question" />


                            <InputField
                                label="Option 1" type="text"
                                id="option1"

                                change={(event) => {
                                    setFormData((prev) => {
                                        const prevForm = { ...prev };
                                        prevForm.option1 = event.target.value;

                                        return prevForm;
                                    })

                                }}
                                value={formData.option1}
                                placeholder="Enter Option 1" />

                            <InputField

                                label="Option 2" type="text"
                                id="option2"

                                change={(event) => {
                                    setFormData((prev) => {
                                        const prevForm = { ...prev };
                                        prevForm.option2 = event.target.value;

                                        return prevForm;
                                    })

                                }}
                                value={formData.option2}
                                placeholder="Enter Option 2" />

                            <InputField
                                label="Option 3" type="text"
                                id="option3"

                                change={(event) => {
                                    setFormData((prev) => {
                                        const prevForm = { ...prev };
                                        prevForm.option3 = event.target.value;

                                        return prevForm;
                                    })

                                }}
                                value={formData.option3}
                                placeholder="Enter Option 3" />

                            <InputField
                                label="Option 4" type="text"
                                id="option4"

                                change={(event) => {
                                    setFormData((prev) => {
                                        const prevForm = { ...prev };
                                        prevForm.option4 = event.target.value;

                                        return prevForm;
                                    })

                                }} value={formData.option4}
                                placeholder="Enter Option 4" />



                            <InputField style={{ marginBottom: "20px" }}
                                label="Correct Answer " type="text"
                                id="correct_answer"

                                change={(event) => {
                                    setFormData((prev) => {
                                        const prevForm = { ...prev };
                                        prevForm.correct_answer = event.target.value;

                                        return prevForm;
                                    })

                                }} value={formData.correct_answer}
                                placeholder="Enter correct answer" />

                            <div className="d-grid  col-3 mx-auto mb-3 ">
                                <Btn style={{
                                    backgroundColor: "#0096FF",
                                    borderRadius: "5px ",
                                    border: "none",
                                    color: "white",
                                    padding: "8px 20px"
                                }} className="mt-3"
                            name="UPDATE" onClick={editQuestion} />


                            </div>

                        </Form>
                    </Col>
                </Row>


            </Container>}
            {selectedValue !== "default" && <Container fluid>

                <h2 className='text-center mt-5 mb-3'>{selectedValue} Questions </h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', marginBottom: "15px" }}>
                    <thead style={{ backgroundColor: '#0096FF', color: '#fff' }}>
                        <tr>
                            <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #fff' }}>Subject</th>
                            <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #fff' }}>Q_id</th>
                            <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #fff' }}>Question</th>
                            <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #fff' }}>Option 1</th>
                            <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #fff' }}>Option 2</th>
                            <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #fff' }}>Option 3</th>
                            <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #fff' }}>Option 4</th>
                            <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #fff' }}>Correct Answer</th>
                            <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #fff' }}>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question, index) => (
                            <tr key={question.ques_id} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#DEEFF5' }}>
                                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{selectedValue}</td>
                                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{question.ques_id}</td>
                                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{question.question}</td>
                                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{question.option1}</td>
                                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{question.option2}</td>
                                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{question.option3}</td>
                                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{question.option4}</td>
                                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{question.correct_answer}</td>
                                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>
                                    <Btn
                                        style={{
                                            backgroundColor: "#0096FF",
                                            borderRadius: "5px",
                                            border: "none",
                                            color: "white",
                                            padding: "5px 15px",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => editRow(question)}
                                        name="Edit"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>}
        </>
    );
}
export default QuestionTable