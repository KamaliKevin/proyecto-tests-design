import { useParams } from "react-router-dom";
import CardPaginationComponent from "./utils/CardPaginationComponent";

const Category = () => {
    const { pageNumber } = useParams(); // Parámetro que define la página actual

    // NOTA: Sustituir "cards" por los datos de los cuestionarios que se consigan de una categoría
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
        { title: 'Card 10', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 11', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 12', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 13', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 14', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 15', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 16', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 17', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 18', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 19', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 20', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 21', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 22', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 23', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 24', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 25', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 26', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 27', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 28', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 29', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 30', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 31', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 32', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 33', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 34', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 35', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 36', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 37', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 38', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 39', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 40', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 41', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 42', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 43', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 44', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 45', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 46', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 47', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 48', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 49', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 50', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 51', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 52', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 53', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 54', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 55', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 56', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 57', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 58', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 59', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 60', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 61', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 62', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
        { title: 'Card 63', text: 'This is some text within a card body.', image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp' },
    ];

    return (
        <div className="mt-5">
            <CardPaginationComponent
                pageNumber={Number(pageNumber)}
                title="Nombre de categoría"
                titleIcon="question-circle"
                cards={cards}
                cardsPerPage={9}
                cardsPerRow={3}
            />
        </div>
    );
}

export default Category;