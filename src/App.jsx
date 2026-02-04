import React, { useState } from "react";
import BarcodeScanner from "./Barcode";
import axios from "axios";

function App() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  const fetchProductData = async (barcode) => {
    setError("");
    try {
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      if (response.data.status === 1) {
        setProduct(response.data.product);
      } else {
        setError("Product not found!");
      }
    } catch (err) {
      setError("Error fetching product data");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Carbon Footprint Scanner</h1>
      <BarcodeScanner onScan={fetchProductData} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {product && (
        <div>
          <h3>Product: {product.product_name}</h3>
          <img src={product.image_url} alt={product.product_name} width="100" />
          <p>Brand: {product.brands || "Unknown"}</p>
          <p>
            Estimated Carbon Footprint:{" "}
            <strong>{(product.nutriments?.["carbon-footprint_100g"] || 0) * 10}g CO₂</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
