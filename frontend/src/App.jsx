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

function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <BrowserRouter>
      <>
        <div className='d-flex flex-column site-container'>
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
