import { Route, Routes, useNavigate } from "react-router-dom";
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

    useEffect(() => {
        if (userIsLoggedIn) {
            console.log(userIsLoggedIn);
            navigate("/home");
        }
    }, [userIsLoggedIn]);

    const handleLogin = () => {
        if (localStorage.getItem("XSRF-TOKEN")) {
            setUserIsLoggedIn(true);
        }
    };

    return (
        <MDBContainer className="p-0" style={{ height: "100vh" }}>
            <Navbar userIsLoggedIn={userIsLoggedIn} />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route element={<Home />} path="/home"></Route>
                    <Route element={<Category />} path="/category"></Route>
                    {userIsLoggedIn ? (
                        <>
                            <Route element={<Dashboard userIsLoggedIn={userIsLoggedIn} userIsAdmin={true} />} path="/dashboard" />
                            <Route element={<CreateQuiz userIsLoggedIn={userIsLoggedIn} />} path="/create-quiz" />
                        </>
                    ) : (
                        <>
                            <Route element={<Login userIsLoggedIn={userIsLoggedIn} onLogin={handleLogin} />} path="/login" />
                            <Route element={<Register userIsLoggedIn={userIsLoggedIn} />} path="/register" />
                        </>
                    )}
                    <Route element={<Quiz />} path="/quiz"></Route>
                    <Route element={<Privacy />} path="/privacy"></Route>
                    <Route element={<Terms />} path="/terms"></Route>
                </Route>
            </Routes>
        </MDBContainer>
    );
}

export default App;
