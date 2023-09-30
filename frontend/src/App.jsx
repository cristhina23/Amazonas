import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import { useContext } from "react";
import { Store } from "./Store";
import Cart from "./pages/Cart";
import Signin from "./pages/Signin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavDropdown from "react-bootstrap/NavDropdown";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
  };

  return (
    <BrowserRouter>
      <>
        <div className='d-flex flex-column site-container'>
          <ToastContainer
            position='bottom-center'
            limit={1}
          />
          <header>
            <Navbar
              bg='dark'
              variant='dark'
            >
              <Container>
                <Link to='/'>
                  <Navbar.Brand>amazona</Navbar.Brand>
                </Link>
                <Nav className='me-auto'>
                  <Link to='/cart'>
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge
                        pill
                        bg='danger'
                      >
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown
                      title={userInfo.name}
                      id='basic-nav-dropdown'
                    >
                      <Link
                        className='dropdown-item'
                        to='/profile'
                      >
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </Link>
                      <Link
                        className='dropdown-item'
                        to='/orderhistory'
                      >
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </Link>
                      <NavDropdown.Divider />
                      <Link
                        className='dropdown-item'
                        to='/'
                        onClick={signoutHandler}
                      >
                        <NavDropdown.Item>Sign Out</NavDropdown.Item>
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link
                      className='nav-link'
                      to='/signin'
                    >
                      Sign In
                    </Link>
                  )}
                </Nav>
              </Container>
            </Navbar>
          </header>
          <main>
            <Container className='mt-3'>
              <Routes>
                <Route
                  path='/product/:slug'
                  element={<Product />}
                />
                <Route
                  path='/'
                  element={<Home />}
                />
                <Route
                  path='/cart'
                  element={<Cart />}
                />
                <Route
                  path='/signin'
                  element={<Signin />}
                />
              </Routes>
            </Container>
          </main>
          <footer>
            <div className='text-center'>All rights reserved</div>
          </footer>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
