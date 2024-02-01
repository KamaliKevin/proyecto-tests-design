import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBIcon, MDBTypography} from "mdb-react-ui-kit";

const QuizHistory = () => {
    return (
        <div className="d-flex justify-content-center">
            <MDBCard>
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="my-3">
                        <MDBIcon fas icon="list-alt" /> Quiz History
                    </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <p>??????????</p>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default QuizHistory;
