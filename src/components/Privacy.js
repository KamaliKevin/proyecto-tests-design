import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardText,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
    MDBTypography
} from "mdb-react-ui-kit";

const Privacy = () => {
    return (
        <div className="d-flex justify-content-center">
            <MDBCard alignment='center'>
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="my-3">
                        <MDBIcon fas icon="user-secret" /> Privacy Policy
                    </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBCardText>
                        <MDBListGroup light className='mb-4'>
                            <MDBListGroupItem noBorders>
                                <p>
                                    We are committed to protecting your privacy. We will only use the information that we collect about you lawfully
                                    (in accordance with the General Data Protection Regulation (GDPR).
                                </p>
                            </MDBListGroupItem>

                            <MDBListGroupItem className="mt-5" noBorders>
                                <MDBTypography tag='h4' className="py-3 border-bottom">
                                    Collection of Personal Information
                                </MDBTypography>
                                <p>
                                    We collect information about you for 2 reasons: firstly, to process your order and secondly, to provide you with
                                    the best possible service. We will not e-mail you in the future unless you have given us your consent. We will
                                    give you the chance to refuse any marketing email from us or from another trader in the future.
                                </p>
                            </MDBListGroupItem>

                            <MDBListGroupItem className="mt-5" noBorders>
                                <MDBTypography tag="h4" className="py-3 border-bottom">
                                    Use of Personal Information
                                </MDBTypography>
                                <p>
                                    We will not sell, distribute or lease your personal information to third parties unless we have your permission or
                                    are required by law to do so. We may use your personal information to send you promotional information about third
                                    parties that we think you may find interesting if you tell us that you wish this to happen.
                                </p>
                            </MDBListGroupItem>
                        </MDBListGroup>

                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default Privacy;