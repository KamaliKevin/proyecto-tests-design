import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import Layout from "./components/layouts/Layout";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Category from "./components/Category";
import Login from "./components/Login";
import Register from "./components/Register";
import Quiz from "./components/Quiz";
import { MDBContainer } from "mdb-react-ui-kit";
import "./css/main.css";
import Dashboard from "./components/Dashboard";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";
import CreateQuiz from "./components/CreateQuiz";
import { useEffect, useState } from "react";
import { CreateQuizContextProvider } from "./components/CreateQuizComponents/CreateQuizContext";
import NotFound from "./components/NotFound";

function App() {
    const navigate = useNavigate();
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);


    const handleLogin = async () => {
        if (localStorage.getItem("XSRF-TOKEN")) {
            await setUserIsLoggedIn(true);
            navigate("/home");
        }
    };

    useEffect(() => {
        // Check for token existence on component mount
        const token = localStorage.getItem("XSRF-TOKEN");
        if (token) {
            setUserIsLoggedIn(true);
        }
    }, []);

    return (
        <MDBContainer className="p-0" style={{ height: "100vh" }}>
            <Navbar userIsLoggedIn={userIsLoggedIn} />
            <CreateQuizContextProvider>
                <Routes>
                    <Route element={<Layout />} path="/">
                        {/* Redirige a "/home" desde la ruta raíz, "/" */}
                        <Route element={<Navigate to="/home" replace />} path="/" />

                        {/* Redirige a "/category/1" desde la ruta "/category" */}
                        <Route element={<Navigate to="/category/1" replace />} path="/category" /> {/* IMPORTANTE: ¡Cambiar la ruta cuando haya categorías desde la BD! */}

                        <Route element={<Home />} path="/home" />
                        <Route element={<Category />} path="/category/:pageNumber" /> {/* IMPORTANTE: ¡Cambiar la ruta cuando haya categorías desde la BD! */}

                        {/* Rutas protegidas (comprueban si el usuario inició sesión) */}
                        <Route element={<ProtectedRoute/>}>
                            <Route element={<Dashboard userIsAdmin={true} />} path="/dashboard" />
                            <Route element={<CreateQuiz />} path="/create-quiz"/>
                        </Route>

                        <Route element={<GuestRoute />}>
                            <Route element={<Login onLogin={handleLogin} />} path="/login" />
                            <Route element={<Register />} path="/register" />
                        </Route>

                        <Route element={<Quiz />} path="/quiz" />
                        <Route element={<Privacy />} path="/privacy" />
                        <Route element={<Terms />} path="/terms" />

                        <Route element={<NotFound />} path="*" />
                    </Route>
                </Routes>
            </CreateQuizContextProvider>
        </MDBContainer>
    );
}

export default App;
