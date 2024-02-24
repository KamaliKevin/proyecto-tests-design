import {
    MDBBadge,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardImage, MDBCardLink,
    MDBCardText,
    MDBCardTitle,
    MDBCarousel,
    MDBCarouselCaption,
    MDBCarouselItem,
    MDBCol,
    MDBIcon,
    MDBRipple,
    MDBRow,
    MDBTypography
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";

const Home = () => {
    const [cards, setCards] = useState([]);


    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/public-tests`, {
                    method: 'GET',
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch quiz data");
                }
                const quizData = await response.json();
                console.log(quizData);

                const prepareCards = quizData.data.map(quiz => ({
                    id: quiz.id,
                    title: quiz.name,
                    text: quiz.description || "Sin descripción",
                    category_names: quiz.category_names,
                    image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp'
                }));


                console.log(cards);
                setCards([...cards, ...prepareCards]);

            }
            catch (error) {
                console.error(error);
            }
        };

        fetchQuiz();
    }, []);



    const titles = [
        { title: "Lo más votado", icon: "angle-double-up" },
        { title: "Lo más nuevo", icon: "fire" },
        { title: "Recomendaciones", icon: "clipboard-list" }
    ];



    const carouselItems = [
        {
            id: 1,
            src: 'https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg',
            alt: 'First slide',
            caption: { title: 'First slide label', text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.' }
        },
        {
            id: 2,
            src: 'https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg',
            alt: 'Second slide',
            caption: { title: 'Second slide label', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
        },
        {
            id: 3,
            src: 'https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg',
            alt: 'Third slide',
            caption: { title: 'Third slide label', text: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.' }
        }
    ];

    return (
        <div>
            <MDBCarousel showIndicators showControls fade>
                {carouselItems.map((item) => (
                    <MDBCarouselItem key={item.id} itemId={item.id}>
                        <img src={item.src} className='d-block w-100' alt={item.alt} />
                        <MDBCarouselCaption>
                            <h5>{item.caption.title}</h5>
                            <p>{item.caption.text}</p>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>
                ))}
            </MDBCarousel>

            {titles.map((title, index) => (
                <div className="mt-5" key={index}>
                    <MDBCard>
                        <MDBCardHeader>
                            <MDBTypography tag='h3' className="text-center my-3">
                                <MDBIcon fas icon={title.icon} /> {title.title}
                            </MDBTypography>
                        </MDBCardHeader>
                        <MDBCardBody>
                            <MDBCardText>
                                <MDBRow className="row-cols-1 row-cols-md-3 g-4">
                                    {cards
                                        .filter((card, i) => Math.floor(i / 3) === index)
                                        .map((card, i) => (
                                            <MDBCol key={i}>
                                                <MDBCard>
                                                    <MDBRipple rippleTag='div' className='bg-image hover-zoom'>
                                                        <MDBCardImage src={card.image} alt={card.title} position="top" />
                                                        <MDBCardLink href={`/quiz/play/${card.id}`}>
                                                            <div className='mask'></div>
                                                        </MDBCardLink>
                                                    </MDBRipple>
                                                    <MDBCardBody>
                                                        <MDBCardLink href={`/quiz/play/${card.id}`}>
                                                            <MDBCardTitle>{card.title}</MDBCardTitle>
                                                        </MDBCardLink>
                                                        {card.category_names.map(name => (
                                                            <MDBBadge pill light color='primary' className="mb-3 me-1">
                                                                {name}
                                                            </MDBBadge>
                                                        ))}
                                                        <MDBCardText>{card.text}</MDBCardText>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </MDBCol>
                                        ))}
                                </MDBRow>
                                <div className="d-flex justify-content-center mt-5">
                                    <MDBCardLink href="/category/1">Ver más de "{title.title}"</MDBCardLink>
                                </div>
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </div>
            ))}
        </div>
    );
}

export default Home;