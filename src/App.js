import {Route, Routes} from "react-router-dom";
import swal from 'sweetalert';
import Layout from "./components/layouts/Layout";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Category from "./components/Category";
import Login from "./components/Login";
import Register from "./components/Register";
import Quiz from "./components/Quiz";
import {MDBContainer} from "mdb-react-ui-kit";
import "./css/main.css";
import Dashboard from "./components/Dashboard";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";


function App() {
    return (
        <MDBContainer className="p-0" style={{ height: "100vh" }}>
            <Navbar />
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route element={<Home/>} path="/"></Route>
                    <Route element={<Category/>} path="/category"></Route>
                    <Route element={<Login/>} path="/login"></Route>
                    <Route element={<Register/>} path="/register"></Route>
                    <Route element={<Quiz/>} path="/quiz"></Route>
                    <Route element={<Dashboard userIsAdmin={true}/>} path="/dashboard"></Route>
                    <Route element={<Privacy/>} path="/privacy"></Route>
                    <Route element={<Terms/>} path="/terms"></Route>
                </Route>
            </Routes>
        </MDBContainer>
    );
}

export default App;
