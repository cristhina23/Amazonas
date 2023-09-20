import "./App.css";
import { Link } from "react-router-dom";
import data from "./data";

function App() {
  return (
    <>
      <header>
        <a href='#'>Amazona</a>
      </header>
      <main>
        <h1>Welcome to Amazona</h1>
        <div className='products'>
          {data.products.map((product) => (
            <div
              className='product'
              key={product.slug}
            >
              <a href={`/product/${product.slug}`}>
                <img
                  src={product.image}
                  alt={product.name}
                />
              </a>
              <div className='product-info'>
                <a href={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </a>
                <p>${product.price}</p>
                <button>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
