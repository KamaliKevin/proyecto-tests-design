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

const Terms = () => {
    return (
        <div className="d-flex justify-content-center">
            <MDBCard alignment='center'>
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="my-3">
                        <MDBIcon fas icon="scroll" /> Terms & Conditions
                    </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBCardText>
                        <MDBListGroup light className='mb-4'>
                            <MDBListGroupItem noBorders>
                                <p>
                                    Welcome to our trivia website. If you continue to browse and use this website, you are agreeing to comply
                                    with and be bound by the following terms and conditions of use, which together with our privacy policy govern
                                    our relationship with you in relation to this website. If you disagree with any part of these terms and conditions,
                                    please do not use our website.
                                </p>
                            </MDBListGroupItem>

                            <MDBListGroupItem className="mt-5" noBorders>
                                <MDBTypography tag='h4' className="py-3 border-bottom">
                                    The use of this website is subject to the following terms of use:
                                </MDBTypography>
                                <MDBListGroup light numbered>
                                    <MDBListGroupItem noBorders>
                                        The content of the pages of this website is for your general information and use only.
                                        It is subject to change without notice.
                                    </MDBListGroupItem>

                                    <MDBListGroupItem noBorders>
                                        This website uses cookies to monitor browsing preferences. If you do allow cookies to be used,
                                        the following personal information may be stored by us for use by third parties.
                                    </MDBListGroupItem>

                                    <MDBListGroupItem noBorders>
                                        Neither we nor any third parties provide any warranty or guarantee as to the accuracy,
                                        timeliness, performance, completeness, or suitability of the information and materials found
                                        or offered on this website for any particular purpose.
                                        You acknowledge that such information and materials may contain inaccuracies or errors,
                                        and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
                                    </MDBListGroupItem>

                                    <MDBListGroupItem noBorders>
                                        Your use of any information or materials on this website is entirely at your own risk,
                                        for which we shall not be liable. It shall be your own responsibility to ensure that any products,
                                        services, or information available through this website meet your specific requirements.
                                    </MDBListGroupItem>

                                    <MDBListGroupItem noBorders>
                                        This website contains material which is owned by or licensed to us. This material includes, but is not limited to,
                                        the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance
                                        with the copyright notice, which forms part of these terms and conditions.
                                    </MDBListGroupItem>

                                    <MDBListGroupItem noBorders>
                                        All trademarks reproduced in this website, which are not the property of, or licensed to the operator,
                                        are acknowledged on the website.
                                    </MDBListGroupItem>

                                    <MDBListGroupItem noBorders>
                                        Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offense.
                                    </MDBListGroupItem>

                                    <MDBListGroupItem noBorders>
                                        From time to time, this website may also include links to other websites.
                                        These links are provided for your convenience to provide further information.
                                        They do not signify that we endorse the website(s).
                                        We have no responsibility for the content of the linked website(s).
                                    </MDBListGroupItem>

                                    <MDBListGroupItem noBorders>
                                        From time to time, this website may also include links to other websites.
                                        These links are provided for your convenience to provide further information.
                                        They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).
                                    </MDBListGroupItem>

                                    <MDBListGroupItem noBorders>
                                        Your use of this website and any dispute arising out of such use of the website
                                        is subject to the laws of England, Northern Ireland, Scotland, and Wales.
                                    </MDBListGroupItem>
                                </MDBListGroup>

                            </MDBListGroupItem>

                        </MDBListGroup>

                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default Terms;