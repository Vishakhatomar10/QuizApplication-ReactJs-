import { Col, Container, Form, Row } from "react-bootstrap"
import Header from "../../Components/Header"
import { Image } from "react-bootstrap"
import React, { useEffect, useState } from 'react';
import InputField from "../../Components/InputField";
import Btn from "../../Components/Btn";
import { Link } from "react-router-dom";
import PopUp from "../../Components/PopUp";


function AddQuestion() {

    const [subjectId, setSubjectId] = useState('');

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
        subject_id: '',
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correct_answer: '',
    });

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            subject_id: subjectId
        }));
    }, [subjectId]);


    const [questionAddedPopUp, setQuestionAddedPopUp] = useState(false)


    const handleSubmit = async (event) => {
        event.preventDefault();



        try {
            const response = await fetch('http://localhost:5000/addNewQuestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {

                setFormData({
                    subject_id: '',
                    question: '',
                    option1: '',
                    option2: '',
                    option3: '',
                    option4: '',
                    correct_answer: '',
                });
                setQuestionAddedPopUp(true);
            } else {
                console.error('Failed to update data in the database.');
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };


    const closePopup = () => {
        setQuestionAddedPopUp(false);
    };

    return (
        <>


            <Header>
                <p className="text-light mb-0">  <img src="https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"
                    className="rounded-circle mt-0" width="20" height="20"></img> Admin
                    <Link to="/login"><button className="btn btn-outline-light ms-2" > Logout</button></Link>
                </p>
            </Header>

            {questionAddedPopUp && (
                <PopUp message="Question added successfully!">
                    <Btn name="OK" className="ms-3  " style={{ color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', }} onClick={closePopup} />

                </PopUp>

            )}
            <Container className="shadow border border-light mt-3 p-3 w-75 mb-4 d-flex justify-content-between"
                style={{
                    marginBottom: "20rem",
                    marginTop: "20rem",
                    borderRadius: "1rem",
                    backgroundColor: "#fffafa"
                }}

            >
                <Image src="https://img.freepik.com/premium-photo/female-working-great-office-minimalistic-fansy-style-illustration-white-background_967785-48753.jpg?w=740"
                    className="mb-3 w-50 pt-5 pb-5 pe-3 ps-3 mt-5" style={{ height: "70%", }} />

                <Row className="w-50">
                    <Col >


                        <Form id="questionForm" className="mt-2">
                            <h2 className='text-center mb-3'>ADD QUESTION</h2>

                            <label style={{ paddingBottom: "5px" }}>Subject </label>

                            <select style={{ width: "100%", padding: ".370rem .65rem", border: "solid 1px #AEAEAE", borderRadius: "5px", marginBottom: "40px" }}
                                id="subject"
                                onChange={(e) => {
                                    handleSelectChange(e);

                                }} >

                                <option value="">Select Subject</option>
                                <option value="HTML">HTML</option>
                                <option value="CSS">CSS</option>
                                <option value="JavaScript">JavaScript</option>


                            </select>


                            <InputField
                                label="Question" type="text" id="question" value={formData.question}
                                change={(event) => {
                                    setFormData((prev) => {
                                        const prevForm = { ...prev };
                                        prevForm.question = event.target.value;

                                        return prevForm;
                                    })
                                }}
                                placeholder="Enter Question" />


                            <InputField
                                label="Option 1" type="text"
                                id="option1"
                                value={formData.option1}

                                change={(event) => {
                                    setFormData((prev) => {
                                        const prevForm = { ...prev };
                                        prevForm.option1 = event.target.value;

                                        return prevForm;
                                    })

                                }} placeholder="Enter Option 1" />

                            <InputField
                                label="Option 2" type="text"
                                id="option2"
                                value={formData.option2}

                                change={(event) => {
                                    setFormData((prev) => {
                                        const prevForm = { ...prev };
                                        prevForm.option2 = event.target.value;

                                        return prevForm;
                                    })

                                }} placeholder="Enter Option 2" />

                            <InputField
                                label="Option 3" type="text"
                                id="option3"
                                value={formData.option3}

                                change={(event) => {
                                    setFormData((prev) => {
                                        const prevForm = { ...prev };
                                        prevForm.option3 = event.target.value;

                                        return prevForm;
                                    })

                                }} placeholder="Enter Option 3" />

                            <InputField
                                label="Option 4" type="text"
                                id="option4"
                                value={formData.option4}

                                change={(event) => {
                                    setFormData((prev) => {
                                        const prevForm = { ...prev };
                                        prevForm.option4 = event.target.value;

                                        return prevForm;
                                    })

                                }}
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

                                }} value={formData.correct_answer} placeholder="Enter correct answer" />

                            <div className="d-grid  col-3 mx-auto mb-3 ">
                                <Btn style={{
                                    backgroundColor: "#0096FF",
                                    borderRadius: "5px ",
                                    border: "none",
                                    color: "white",
                                    padding: "8px 20px"
                                }} name="ADD" onClick={handleSubmit} />


                            </div>

                        </Form>
                    </Col>
                </Row>


            </Container>

        </>
    )
}
export default AddQuestion