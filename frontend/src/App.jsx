import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import { useContext } from "react";
import { Store } from "./Store";
import Cart from "./pages/Cart";
import Signin from "./pages/Signin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import ShippingAddress from "./pages/ShippingAddress";
import Signup from "./pages/Signup";
import PaymentMethod from "./pages/PaymentMethod";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import OrdersHistory from "./pages/OrdersHistory";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("paymentMethod");
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
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='me-auto w-100 justify-content-end'>
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
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item>User Profile</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/orderhistory'>
                          <NavDropdown.Item>Order History</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider />
                        <Link
                          className='dropdown-item'
                          to='#signout'
                          onClick={signoutHandler}
                        >
                          Sign Out
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
                </Navbar.Collapse>
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
                <Route
                  path='/shipping'
                  element={<ShippingAddress />}
                />
                <Route
                  path='/signup'
                  element={<Signup />}
                />
                <Route
                  path='/payment'
                  element={<PaymentMethod />}
                />
                <Route
                  path='/placeorder'
                  element={<PlaceOrder />}
                />
                <Route
                  path='/order/:id'
                  element={<Order />}
                />
                <Route
                  path='/orderhistory'
                  element={<OrdersHistory />}
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
