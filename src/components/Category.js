import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardImage, MDBCardLink, MDBCardText, MDBCardTitle,
    MDBCol,
    MDBIcon, MDBPagination, MDBPaginationItem, MDBPaginationLink,
    MDBRipple,
    MDBRow,
    MDBTypography
} from "mdb-react-ui-kit";

const Category = () => {
    const cards = [
        { title: 'Card 1', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 2', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 3', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 4', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 5', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 6', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 7', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 8', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 9', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
    ];

    return (
        <div className="mt-5">
            <MDBCard>
                <MDBCardHeader>
                    <MDBTypography tag='h3' className="text-center my-3">
                        <MDBIcon far icon="question-circle" /> (Nombre de categoría)
                    </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBRow className="row-cols-1 row-cols-md-3 g-4">
                        {cards.map((card, i) => (
                                <MDBCol key={i}>
                                    <MDBCard>
                                        <MDBRipple rippleTag='div' className='bg-image hover-zoom'>
                                            <MDBCardImage src={card.image} alt={card.title} position="top" />
                                            <MDBCardLink href="/quiz">
                                                <div className='mask'></div>
                                            </MDBCardLink>
                                        </MDBRipple>
                                        <MDBCardBody>
                                            <MDBCardLink href="/quiz">
                                                <MDBCardTitle>{card.title}</MDBCardTitle>
                                            </MDBCardLink>
                                            <MDBCardText>{card.text}</MDBCardText>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            ))}
                    </MDBRow>

                    <nav aria-label='...' className="d-flex justify-content-center mt-5">
                        <MDBPagination size='lg' className='mb-0'>
                            <MDBPaginationItem className='page-item active' aria-current='page'>
                                <MDBPaginationLink tag='span' className='page-link'>
                                    1<span className='visually-hidden'>(current)</span>
                                </MDBPaginationLink>
                            </MDBPaginationItem>
                            <MDBPaginationItem>
                                <MDBPaginationLink href='#'>2</MDBPaginationLink>
                            </MDBPaginationItem>
                            <MDBPaginationItem>
                                <MDBPaginationLink href='#'>3</MDBPaginationLink>
                            </MDBPaginationItem>
                        </MDBPagination>
                    </nav>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default Category;