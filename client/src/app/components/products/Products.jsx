"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import "./products.css";
import Link from "next/link";
import axios from "axios";

const productImage = "/assets/iPhone-14-Pro-Max.jpg";

const fetchData = async () => {
  const res = await axios("https://fakestoreapi.com/products");
  return res.data
};

const Products = () => {
  const [products, setProducts] = useState([]);

  console.log(products)

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchData();
      setProducts(data);
    }
    getProducts()
  }, []);

  return (
    <div className="row product">
      <div className="all-products">
        {
          products.map((item) => (
              <div className="singal-product-card" key={item.id}>
              <div className="product-image">
                <Image width={280} height={280} src={item.image} alt={item.title} className="image" />
              </div>
              <h4>{item.title.length > 50 ? item.title.slice(0, 20) + "..." : item.title}</h4>
              <p><b>Price: ${item.price}</b></p>
              <p>{item.description.length > 200 ? item.title.slice(0, 200) + "..." : item.title}</p>
              <div className="product-control-btn">
                <Link href="#" className="droductBtnLink">details</Link>
                <Link href="#" className="droductBtnLink">Add To Card</Link>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Products;
