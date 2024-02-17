import { json, useParams } from "react-router-dom";
import CardPaginationComponent from "./utils/CardPaginationComponent";
import { useEffect, useState } from "react";

const Category = () => {
    const { categoryName, pageNumber } = useParams(); // Parámetros de cada categoría
    const [categoryCards, setCategoryCards] = useState([]);

    useEffect(() => {
        const fetchCategoryCards = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/public-tests`, {
                    method: 'GET',
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const testData = await response.json();
                const formattedCategoryCards = testData.data.filter(categoryCard => categoryCard.category_names.includes(categoryName));
                const prepareCards = formattedCategoryCards.map(quiz => ({
                    title: quiz.name,
                    text: quiz.description || "Sin descripción",
                    category_names: quiz.category_names,
                    image: 'https://mdbootstrap.com/img/new/standard/nature/184.webp'
                }));
                setCategoryCards(prepareCards);
            }
            catch (error) {
                console.error('Error fetching category cards: ', error);
            }
        };

        fetchCategoryCards();
    }, []);

    return (
        <div className="mt-5">
            <CardPaginationComponent
                pageName="category"
                pageNumber={Number(pageNumber)}
                title={categoryName}
                titleIcon="question-circle"
                cards={categoryCards}
                cardsPerPage={9}
                cardsPerRow={3}
            />
        </div>
    );
}

export default Category;