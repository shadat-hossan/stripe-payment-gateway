"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import "./products.css";
import Link from "next/link";
import axios from "axios";

const fetchData = async () => {
  const res = await axios("https://fakestoreapi.com/products");
  return res.data;
};

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchData();
      setProducts(data);
    }
    getProducts();
  }, []);

  const checkout = async (item) => {
    try {
      const { id, title, price, quantity = 1 } = item;

      const res = await fetch("http://localhost:8080/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          items: [
            {
              id: id,
              name: title,
              price: price,
              quantity: quantity,
            },
          ],
        }),
      });
      const data = await res.json();
      window.location=data.url;
      console.log(data);
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="row product">
      <div className="all-products">
        {products.map((item) => (
          <div className="singal-product-card" key={item.id}>
            <div className="product-image">
              <Image width={280} height={280} src={item.image} alt={item.title} className="image" />
            </div>
            <h4>{item.title.length > 50 ? item.title.slice(0, 20) + "..." : item.title}</h4>
            <p><b>Price: ৳{item.price}</b></p>
            <p>{item.description.length > 200 ? item.description.slice(0, 200) + "..." : item.description}</p>
            <div className="product-control-btn">
              <Link href="#" className="droductBtnLink">details</Link>
              <button onClick={() => checkout(item)} className="droductBtnLink">checkout</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
