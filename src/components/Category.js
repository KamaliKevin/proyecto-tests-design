import {json, useParams} from "react-router-dom";
import CardPaginationComponent from "./utils/CardPaginationComponent";
import {useEffect, useState} from "react";

const Category = () => {
    const { categoryName, pageNumber } = useParams(); // Parámetros de cada categoría
    const [categoryCards, setCategoryCards] = useState([]);

    useEffect(() => {
        const fetchCategoryCards = async () => {
            try {
                const response = await fetch('https://localhost:8000/api/public-tests');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const testData = await response.json();
                const formattedCategoryCards = testData.data.filter(categoryCard => categoryCard.category_names.includes(categoryName));
                setCategoryCards(formattedCategoryCards);
            }
            catch (error) {
                console.error('Error fetching category cards: ', error);
            }
        };

        fetchCategoryCards();
    });

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