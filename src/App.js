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
            <Routes>
                <Route element={<Layout />} path="/">
                    <Route element={<Navigate to="/home" replace />} path="/" /> {/* Redirige a "/home" desde la ruta raíz, "/" */}
                    <Route element={<Home />} path="/home" />
                    <Route element={<Category />} path="/category" />

                    {/* Rutas protegidas (comprueban si el usuario inició sesión) */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard userIsAdmin={true} />} />
                        <Route path="/create-quiz" element={<CreateQuiz />} />
                    </Route>
                    <Route element={<GuestRoute />}>
                        <Route element={<Login onLogin={handleLogin} />} path="/login" />
                        <Route element={<Register />} path="/register" />
                    </Route>
                    <Route element={<Quiz />} path="/quiz" />
                    <Route element={<Privacy />} path="/privacy" />
                    <Route element={<Terms />} path="/terms" />
                </Route>
            </Routes>
        </MDBContainer>
    );
}

export default App;
