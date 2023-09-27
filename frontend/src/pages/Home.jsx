import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductC from "../components/ProductC";
import Loading from "../components/Loading";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Home = () => {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("http://localhost:5000/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Welcome to Amazona</h1>
      <div className='products'>
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMassage variant='danger'>{error}</ErrorMassage>
        ) : (
          <Row>
            {products.map((product) => (
              <Col
                key={product.slug}
                sm={6}
                md={4}
                lg={3}
                className='mb-3'
              >
                <ProductC product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default Home;
