import { Col, Container, Form, Row } from "react-bootstrap"
import { Image } from "react-bootstrap"
import Btn from "../../Components/Btn"
import React, { useState } from 'react';
import emailjs from 'emailjs-com';

import InputField from "../../Components/InputField"
import { Link } from "react-router-dom";
import PopUp from "../../Components/PopUp";
function ForgotPswd() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [sendOTPButtonDisabled, setSendOTPButtonDisabled] = useState(true);
    const [verificationCode, setVerificationCode] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(true);
    const [popUp, setPopUp] = useState(false);

    const [enteredOTP, setEnteredOTP] = useState('');
    const [otpError, setOtpError] = useState('');
    const [showResetPswdPage, setShowResetPswdPage] = useState(false);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pswdError, setPswdError] = useState('');
    const [confirmPswdError, setConfirmPswdError] = useState('');

    const [resetPasswordPopUp, setResetPasswordPopUp] = useState(false);

    const [otp, setOTP] = useState('');



    const emailExist = (newEmail) => {

        fetch(`http://localhost:5000/emailExist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: newEmail }),
        })
            .then((response) => response.json())
            .then((data) => {

                if (data.exists) {
                    setEmailError('');
                    setSendOTPButtonDisabled(false);

                } else {
                    setEmailError(data.message);
                    setSendOTPButtonDisabled(true);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };



    const sendOTP = (event) => {
        event.preventDefault();
        const digits = '0123456789';
        let otp = '';
        for (let i = 0; i < 6; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }

        setOTP(otp);

        const templateParams = {
            name: '',
            email: email,

            otp: otp,
            subject: "Forgot Password"
        };

        emailjs.send('service_e392kzy', 'template_28jw5w4', templateParams, 'ov3VAsowcl3vY0OxH')
            .then((response) => {

                console.log('OTP sent successfully!', response.status, response.text);

            }, (error) => {
                console.error('Error sending OTP:', error);
            });

        setPopUp(true);
        updateOTP(otp);

    };

    const updateOTP = (otp) => {
        const OTPupdate = {
            email: email,
            otp: otp,
        };


        fetch('http://localhost:5000/updateOTP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(OTPupdate),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('OTP updated.');
                } else {
                    console.log('OTP not updated');
                }
            })
            .catch((error) => {
                console.log('Error updating OTP:', error);
            });
    };

    const handleOtpChange = (e) => {
        setEnteredOTP(e.target.value);
    };

    const verifyOTP = (event) => {


        event.preventDefault();
        if (enteredOTP.length === 0) {
            setOtpError('Please enter OTP');
        } else {
            fetch('http://localhost:5000/validateOTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, enteredOTP }),
            })
                .then((response) => {
                    if (response.ok) {

                        setShowResetPswdPage(true);
                        setVerificationCode(false);

                        setOtpError('')
                    } else {

                        setOtpError('Invalid OTP entered.');
                    }
                })
                .catch((error) => {
                    console.log('Error validating OTP:', error);
                });

        }


    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        emailExist(newEmail);
    };

    function handlePassword(value) {
        setPassword(value);
        validatePassword(value);

    }

    function handleConfirmPassword(value) {
        setConfirmPassword(value);
        validateConfirmPassword(value);

    }
    const validatePassword = (password) => {
        if (password.length < 8) {
            setPswdError('Password must be at least 8 characters long');
        } else {
            setPswdError('');
        }
    };

    const validateConfirmPassword = (confirmPassword) => {
        if (confirmPassword !== password) {
            setConfirmPswdError('Passwords do not match');
        } else {
            setConfirmPswdError('');
        }
    };

    const resetPassword = (event) => {
        event.preventDefault();
        const pswd = {
            password: password,
            email: email

        };


        fetch('http://localhost:5000/updatePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pswd),
        })
            .then((response) => {
                if (response.ok) {
                    setResetPasswordPopUp(true);

                }
            })
            .catch((error) => {
                console.log('Error updating password:', error);
            });

        setPassword('')
        setConfirmPassword('')

    };

    return (
        <>
            {popUp && (
                <PopUp message="OTP sent successfully!">
                    <Btn name="OK" className="ms-3 " style={{ color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', }}
                        onClick={() => {
                            setVerificationCode(true);
                            setForgotPassword(false);
                            setPopUp(false);
                        }} />
                </PopUp>

            )}

            {resetPasswordPopUp && (
                <PopUp message="Password reset successfully!">
                    <Link to="/login"> <Btn name="OK" className="ms-3  " style={{ color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', }} /></Link>
                </PopUp>

            )}
            <Container className="shadow border border-light mt-5 pt-4 w-75 mb-5 d-flex justify-content-between" style={{ marginBottom: "20rem", marginTop: "20rem", borderRadius: "1rem", backgroundColor: "#fffafa" }}>
                {forgotPassword && (
                    <>
                        <Row className="w-50">
                            <Col>
                                <Form id="registrationForm" className="mt-3 mb-3">
                                    <h2 className='text-center mb-3'>Forgot Password</h2>
                                    <InputField style={{ width: "100%", padding: ".370rem .65rem", border: "solid 1px #AEAEAE", borderRadius: "5px", marginBottom: "10px" }} label="Email" type="email" name="email" placeholder="Enter email" value={email} change={handleEmailChange} />
                                    {emailError && <div className="text-danger  mb-3">{emailError}</div>}
                                    <div className="d-grid  col-4 mx-auto ">
                                        <Btn className="mt-4 mb-4" name="Send OTP" disabled={sendOTPButtonDisabled} onClick={sendOTP} />
                                    </div>
                                </Form>
                                <div className="text-center mt-5">
                                    <Link to="/login" className="text-primary" style={{ textDecoration: "none" }}>
                                        &#129192; Back To Login Page</Link>
                                </div>
                            </Col>
                        </Row>

                    </>
                )}

                {verificationCode && (
                    <Row className="w-50">
                        <Col>
                            <Form id="verificationForm" className="mt-3 mb-3">
                                <h2 className='text-center mb-3'>Verification Code</h2>

                                <InputField style={{ width: "100%", padding: ".370rem .65rem", border: "solid 1px #AEAEAE", borderRadius: "5px", marginBottom: "10px" }}
                                    label="Enter OTP" type="number" name="otp" placeholder="Enter OTP" value={enteredOTP} change={handleOtpChange} />
                                {otpError && (
                                    <div className="text-danger  mb-3">{otpError}</div>
                                )}


                                <div className="d-grid  col-4 mx-auto ">
                                    <Btn className="mt-4 mb-4" name=" Validate" onClick={verifyOTP} />


                                </div>
                            </Form>
                            <div className="text-center mt-5">
                                <Link to="/login" className="text-primary" style={{ textDecoration: "none" }}>
                                    &#129192; Back To Login Page</Link>
                            </div>
                        </Col>
                    </Row>)}

                {showResetPswdPage && (
                    <Row className="w-50">
                        <Col>
                            <Form id="verificationForm" className="mt-3 mb-3">
                                <h2 className='text-center mb-3'>Reset Password</h2>

                                <InputField style={{ width: "100%", padding: ".370rem .65rem", border: "solid 1px #AEAEAE", borderRadius: "5px", marginBottom: "10px" }}
                                    label="Password" type="password" name="password" placeholder="Password" value={password}
                                    change={(e) => {
                                        handlePassword(e.target.value);

                                    }} />
                                {pswdError && (
                                    <div className="text-danger  mb-3">{pswdError}</div>
                                )}


                                <InputField style={{ width: "100%", padding: ".370rem .65rem", border: "solid 1px #AEAEAE", borderRadius: "5px", marginBottom: "10px" }}
                                    label="Confirm Password" type="password" name="password" placeholder="Confirm Password" value={confirmPassword} change={(e) => {
                                        handleConfirmPassword(e.target.value);

                                    }} />
                                {confirmPswdError && (
                                    <div className="text-danger  mb-3">{confirmPswdError}</div>
                                )}


                                <div className="d-grid  col-4 mx-auto ">
                                    <Btn className="mt-4 mb-0" name="Reset Password" onClick={resetPassword} />


                                </div>
                            </Form>
                            <div className="text-center mt-5">
                                <Link to="/login" className="text-primary" style={{ textDecoration: "none" }}>
                                    &#129192; Back To Login Page</Link>
                            </div>
                        </Col>
                    </Row>)}

                <Image src="https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37353.jpg?w=740&t=st=1713868587~exp=1713869187~hmac=1129fe27f6b2ddecfd67b0370a54de44e6d5240e1e57c5c0c10266a5f9132686"
                    className="mt-2 mb-2 w-50" />
            </Container>



        </>
    )
}

export default ForgotPswd