import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Image } from "react-bootstrap";
import InputField from '../../Components/InputField';
import Btn from '../../Components/Btn';
import emailjs from 'emailjs-com';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PopUp from '../../Components/PopUp';

function SignIn() {
    const [email, setToEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [otp, setOTP] = useState('');
    const [validOtpMessage, setValidOtpMessage] = useState('');
    const [invalidOtpMessage, setInvalidOtpMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPasswordField, setShowPasswordField] = useState(false);
    const [hideOTPField, setHideOTPField] = useState(true);

    const [accountCreatedMessage, setAccountCreatedMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [accountCreatedPopUp, setAccountCreatedPopUp] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [enteredOTP, setEnteredOTP] = useState('');



    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pswdError, setPswdError] = useState('');
    const [confirmPswdError, setConfirmPswdError] = useState('');

    const validateEmail = (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(e.target.value)) {
            setEmailError('Please enter a valid email');
        } else {

            setEmailError('');
        }
        setToEmail(e.target.value);
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
            name: userName,
            email: email,

            otp: otp,
            subject: "OTP Verification"
        };

        emailjs.send('service_e392kzy', 'template_28jw5w4', templateParams, 'ov3VAsowcl3vY0OxH')
            .then((response) => {

                console.log('OTP sent successfully!', response.status, response.text);

            }, (error) => {
                console.error('Error sending OTP:', error);
            });



        accessOtp(otp);
    };
    const accessOtp = (otp) => {
  

        const formData = {
            name: userName,
            email: email,
            otp: otp,
        };


        fetch('http://localhost:5000/userDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
            
                    setErrorMessage('');
                    setShowPopup(true);
                } else {
              
                    setErrorMessage('User already exists.');
                }
            })
            .catch((error) => {
               
                setErrorMessage('Error updating data.');
            });
    };
    const validate = (event) => {
        event.preventDefault();
        const OtpDetails = {
            email: email,
            enteredOTP: enteredOTP,
        };

        fetch('http://localhost:5000/validateOTP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(OtpDetails),
        })
            .then((response) => {
                if (response.ok) {
                
                    setValidOtpMessage('OTP Validation successful.');
                    setInvalidOtpMessage('');
                    setHideOTPField(false);
                    setShowPasswordField(true);
                } else {
                  
                    setValidOtpMessage('');
                    setInvalidOtpMessage('Invalid OTP entered.');
                }
            })
            .catch((error) => {
            
                setValidOtpMessage('');
                setInvalidOtpMessage('Error validating OTP.');
            });
    };

    const signUp = (event) => {
        event.preventDefault();
        const pswd = {
            password: password,
            email: email,
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
                    setAccountCreatedPopUp(true);
                    setAccountCreatedMessage('Account created.');

                } else {
                    console.log('Failed to update password in the database.');
                    setAccountCreatedMessage('');
                }
            })
            .catch((error) => {
                console.log('Error updating password:', error);
            });
        setUserName('');
        setToEmail('');
        setEnteredOTP('');
        setPassword('');
        setConfirmPassword('');
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    function handlePassword(value) {
        setValidOtpMessage(false);
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




    return (
        <>
            {showPopup && (
                <PopUp message="OTP sent successfully!">
                    <Btn name="OK" className="ms-3 " style={{ color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', }} onClick={closePopup} />
                </PopUp>

            )}

            {accountCreatedPopUp && (
                <PopUp message="Account created successfully!">
                    <Link to="/login"> <Btn name="OK" className="ms-3  " style={{ color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', }} /></Link>
                </PopUp>

            )}

            <Container className="shadow border border-light mt-4 p-3 w-75 mb-4 d-flex justify-content-between"
                style={{
                    marginBottom: "20rem",
                    marginTop: "20rem",
                    borderRadius: "1rem",
                    backgroundColor: "#fffafa"
                }}

            >

                <Row className="w-50">
                    <Col >

                        <Form id="registrationForm" className="mt-3 mb-3">
                            <h2 className='text-center mb-3'>Sign Up</h2>

                            <InputField style={{ width: "100%", padding: ".370rem .65rem", border: "solid 1px #AEAEAE", borderRadius: "5px", marginBottom: "10px" }}
                                label="Name" type="text" name="firstName" placeholder="Enter name" value={userName} change={(e) => setUserName(e.target.value)} required />

                            <InputField style={{ width: "100%", padding: ".370rem .65rem", border: "solid 1px #AEAEAE", borderRadius: "5px", marginBottom: "10px" }}
                                label="Email" type="email" name="email" placeholder="Enter email" value={email} emailError={emailError} change={(e) => { setToEmail(e.target.value); validateEmail(e) }} required />

                            {errorMessage && <div id="error-msg" className='text-danger '>{errorMessage}</div>}

                            {hideOTPField && (<>

                                <div className="d-grid  col-3 mx-auto mb-3 ">
                                    <Btn style={{
                                        backgroundColor: "#0096FF",
                                        borderRadius: "5px ",
                                        border: "none",
                                        color: "white",
                                        padding: "8px 20px",
                                        marginTop: "10px"
                                    }}
                                        className="mt-2" name="Send OTP"
                                        onClick={sendOTP} />
                                </div>

                                <InputField style={{ width: "100%", padding: ".370rem .65rem", border: "solid 1px #AEAEAE", borderRadius: "5px", marginBottom: "10px" }}
                                    type="number" name="enteredOTP" placeholder="Enter OTP" id="otp" value={enteredOTP}
                                    change={(e) => setEnteredOTP(e.target.value)} />

                                {invalidOtpMessage && (
                                    <div id="invalidOtp-error" className='text-danger ' style={{ display: 'block' }}>
                                        {invalidOtpMessage}
                                    </div>
                                )}
                                <div className="d-grid  col-3 mx-auto mb-3 ">
                                    <Btn style={{
                                        backgroundColor: "#0096FF",
                                        borderRadius: "5px ",
                                        border: "none",
                                        color: "white",
                                        padding: "8px 20px",
                                        marginTop: "10px"
                                    }} className="mt-2"
                                        name="Validate" onClick={validate} />

                                </div>
                            </>)}

                            {validOtpMessage && (
                                <div id="validOtp-msg" className='text-success text-center' style={{ display: 'block' }}>
                                    {validOtpMessage}
                                </div>
                            )}




                            {showPasswordField && (
                                <>
                                    <InputField style={{ width: "100%", padding: ".370rem .65rem", border: "solid 1px #AEAEAE", borderRadius: "5px", marginBottom: "10px" }}
                                        label="Password" type="password" name="password" placeholder="Password" value={password}
                                        change={(e) => {
                                            handlePassword(e.target.value);

                                        }} />
                                    {pswdError && (
                                        <div className="text-danger  mb-3">{pswdError}</div>
                                    )}


                                    <InputField style={{ width: "100%", padding: ".370rem .65rem", border: "solid 1px #AEAEAE", borderRadius: "5px", marginBottom: "10px" }}
                                        label="Confirm Password" type="password" name="password" placeholder="Confirm Password" value={confirmPassword}
                                        change={(e) => {
                                            handleConfirmPassword(e.target.value);

                                        }} />
                                    {confirmPswdError && (
                                        <div className="text-danger  mb-3">{confirmPswdError}</div>
                                    )}

                                    <div className="d-grid  col-3 mx-auto ">
                                        <Btn style={{
                                            backgroundColor: "#0096FF",
                                            borderRadius: "5px ",
                                            border: "none",
                                            color: "white",
                                            padding: "8px 20px",
                                            marginTop: "10px"
                                        }} className="mt-2"
                                            name="Sign Up" onClick={signUp} />

                                    </div>

                                </>)}



                            <p className='text-center'>Already have an account? <Link to="/login" >Log In</Link></p>

                        </Form>
                    </Col>
                </Row>

                <Image src="https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration-enter-application-mobile-screen-user-login-form-website-page-interface-ui-new-profile-registration-email-account_335657-936.jpg?w=740&t=st=1713525543~exp=1713526143~hmac=305fd5188b87a52472770ba39c6b0d68930029297f2fa980e86e85715ae48bc2"
                    className="mb-3 w-50 pt-2 pb-1 pe-3 ps-3" />
            </Container >


        </>
    );
}
export default SignIn