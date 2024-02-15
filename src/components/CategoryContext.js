import { createContext, useEffect, useState } from "react";

const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    // Conseguir los datos de las categorías existentes:
    useEffect(() => {
        const fetchCategories = async () => {
            await fetch('http://localhost:8000/api/categories', {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setCategories(data);
                })
                .catch(error => console.error("error", error));
        };

        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, setCategories }}>
            {children}
        </CategoryContext.Provider>
    );
}

export { CategoryContext, CategoryContextProvider };