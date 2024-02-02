import {Route, Routes} from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Quiz from "./components/Quiz";
import {MDBContainer} from "mdb-react-ui-kit";
import "./css/main.css";
import Dashboard from "./components/Dashboard";


function App() {
    return (
        <MDBContainer className="p-0" style={{ height: "100vh" }}>
            <Navbar />
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route element={<Home/>} path="/"></Route>
                    <Route element={<Login/>} path="/login"></Route>
                    <Route element={<Register/>} path="/register"></Route>
                    <Route element={<Quiz/>} path="/quiz"></Route>
                    <Route element={<Dashboard userIsAdmin={true}/>} path="/dashboard"></Route>
                </Route>
            </Routes>
        </MDBContainer>
    );
}

export default App;
