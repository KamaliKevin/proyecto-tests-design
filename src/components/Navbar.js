import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import {
    MDBBtn, MDBCollapse, MDBContainer, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle,
    MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarItem, MDBNavbarLink, MDBNavbarNav, MDBNavbarToggler
} from "mdb-react-ui-kit";
const Navbar = ({ userIsLoggedIn }) => {
    const [openBasic, setOpenBasic] = useState(false);
    const [dropdownItems, setDropdownItems] = useState([]);

    const getCategory = async () => {
        await fetch('http://localhost:8000/api/categories', {
            method: 'GET',
        }).then(response => response.json())
            .then(data => {
                console.log(data);

                const categoryArray = data.map(element => {
                    return (<MDBDropdownItem link href={"/category/" + element.id}>{element.name}</MDBDropdownItem>)
                })
                setDropdownItems(categoryArray);
            })
            .catch(error => console.error("Fucky wacky", error));
    }
    useEffect(() => {
        getCategory();
    }, []);


    return (
        <MDBNavbar expand="lg" dark bgColor="dark">
            <MDBContainer fluid>
                <Link to="/" className="nav-link">
                    <MDBNavbarBrand>Logo</MDBNavbarBrand>
                </Link>

                <MDBNavbarToggler
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => setOpenBasic(!openBasic)}
                >
                    <MDBIcon icon="bars" fas />
                </MDBNavbarToggler>

                <MDBCollapse navbar open={openBasic}>
                    <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/home">Inicio</MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href="#">Link</MDBNavbarLink>
                        </MDBNavbarItem>

                        <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                                    Categorías
                                </MDBDropdownToggle>
                                <MDBDropdownMenu dark>
                                    {dropdownItems}
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavbarItem>

                        <MDBNavbarItem>
                            <MDBNavbarLink disabled href="#" tabIndex={-1} aria-disabled="true">
                                Disabled
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                    </MDBNavbarNav>

                    <form className="d-flex input-group my-2">
                        <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
                        <MDBBtn color="primary"><MDBIcon fas icon="search" /></MDBBtn>
                    </form>

                    <div className="d-grid gap-2 d-lg-flex">
                        {userIsLoggedIn ? (
                            <>
                                <MDBBtn color="secondary" className="ms-lg-2 ms-sm-0 mt-lg-0 mt-sm-2" href="/dashboard">Dashboard</MDBBtn>
                                <MDBBtn color="warning" href="/create-quiz">Create Quiz</MDBBtn>
                            </>
                        ) : (
                            <>
                                <MDBBtn color="secondary" className="ms-lg-2 ms-sm-0 mt-lg-0 mt-sm-2" href="/login">Login</MDBBtn>
                                <MDBBtn color="success" href="/register">Register</MDBBtn>
                            </>
                        )}
                    </div>

                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
};

export default Navbar;