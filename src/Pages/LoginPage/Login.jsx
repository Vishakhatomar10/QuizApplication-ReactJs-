import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Image } from "react-bootstrap";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../Components/InputField";
import Btn from "../../Components/Btn";
import { UserContext } from "../../App";

function Login() {

    const { user, setUser } = useContext(UserContext);

    const [emailError, setEmailError] = useState('');
    const validateEmail = (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(e.target.value)) {
            setEmailError('Please enter a valid email');
        } else {

            setEmailError('');
        }
        setEmail(e.target.value);
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const userData = { email, password, userType };

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            const name = data.data[0].name;
            if (data.success) {
                if (userType === 'admin') {
                    navigate('/admin')
                  

                } else if (userType === 'user') {
                    navigate('/selectQuiz');
                    setUser(name);
                 
                }
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('An error occurred while logging in.');
        }
    };



    return (
        <>


            <Container className=" shadow border border-light mt-3 p-3 w-75 mb-4 d-flex justify-content-between"
                style={{
                    marginBottom: "20rem",
                    marginTop: "20rem",
                    borderRadius: "1rem",
                  
                    backgroundColor: "#fffafa"
                }}

            >
                <Image src="https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-8.jpg?t=st=1713522553~exp=1713526153~hmac=3580c6ef552c06f5cbf920b147410d92360298df4f1aac2730a3d84eb2769766&w=740"
                    className="mb-3 w-50" />

                <Row className="w-50">
                    <Col >


                        <Form id="loginForm" className="mt-3 mb-3">
                            <h2 className='text-center mb-3'>Login</h2>

                            <InputField
                                label="Email"
                                type="email"
                                placeholder="Enter Email"
                                value={email}


                                change={(e) => {
                                    setEmail(e.target.value);
                                    validateEmail(e)
                                }
                                }
                                emailError={emailError}
                            />


                            <InputField
                                label="Password"
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                change={(e) => setPassword(e.target.value)}
                            />

                            <label style={{ paddingBottom: "5px" }}>Login as </label>

                            <select
                                style={{
                                    width: "100%",
                                    padding: ".370rem .65rem",
                                    border: "solid 1px #AEAEAE",
                                    borderRadius: "5px",
                                    marginBottom: "40px"
                                }}
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                            >
                                <option value="">Choose User Type</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>

                            <div className="d-grid  col-2 mx-auto ">
                                <Btn
                                    name="Login"
                                    type="submit"
                                    onClick={handleLogin}
                                    disabled={!!emailError}
                                />
                            </div>


                            <div className="mt-3 text-center">
                                {message && <p className="text-danger mt-2">{message}</p>}
                                <p>Don't have an Account? <Link to="/signup"> Sign Up</Link></p>
                                <Link to="/forgotPassword"> Forgot Password?</Link>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>


        </>
    );
}
export default Login