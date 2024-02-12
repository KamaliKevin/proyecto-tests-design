import { useParams } from "react-router-dom";
import CardPaginationComponent from "./utils/CardPaginationComponent";

const Category = () => {
    const { pageNumber } = useParams(); // Parámetro que define la página actual

    // NOTA: Sustituir "cards" por los datos de los cuestionarios que se consigan de una categoría
    const cards = Array.from({ length: 63 }, (_, index) => ({
        title: `Card ${index + 1}`,
        text: 'This is some text within a card body.',
        image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp'
    }));

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