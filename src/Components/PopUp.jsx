import { Container } from "react-bootstrap";
import './PopUp.css';

function PopUp(props) {
    return (<>
       
        <div className="popup-container">
            <div className="modal-overlay">
                <div className="modal-content text-center">
                    <p className="mt-3" style={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>
                        {props.message}
                        {props?.children}
                    </p>
                </div>
            </div>
        </div>


    </>)
}

export default PopUp;