"use client";
import { useEffect } from "react";
import Image from "next/image";
import "./products.css";
import Link from "next/link";
import axios from "axios";

const productImage = "/assets/iPhone-14-Pro-Max.jpg";

const fetchData = async () => {
  const res = await axios("https://fakestoreapi.com/products");
  console.log("Response Data", res);
};

const Products = () => {
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row product">
      <div className="all-products">
        <div className="singal-product-card">
          <div className="product-image">
            <Image width={280} height={280} src={productImage} alt="Product Iamge" className="image" />
          </div>
          <h4>iPhone 14 Pro Max</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa odio porro voluptates error nobis sint reiciendis</p>
          <div className="product-control-btn">
            <Link href="#" className="droductBtnLink">details</Link>
            <Link href="#" className="droductBtnLink">Add To Card</Link>
          </div>
        </div>

        <div className="singal-product-card">
          <div className="product-image">
            <Image width={280} height={280} src={productImage} alt="Product Iamge" className="image" />
          </div>
          <h4>iPhone 14 Pro Max</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa odio porro voluptates error nobis sint reiciendis</p>
          <div className="product-control-btn">
            <Link href="#" className="droductBtnLink">details</Link>
            <Link href="#" className="droductBtnLink">Add To Card</Link>
          </div>
        </div>


        <div className="singal-product-card">
          <div className="product-image">
            <Image width={280} height={280} src={productImage} alt="Product Iamge" className="image" />
          </div>
          <h4>iPhone 14 Pro Max</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa odio porro voluptates error nobis sint reiciendis</p>
          <div className="product-control-btn">
            <Link href="#" className="droductBtnLink">details</Link>
            <Link href="#" className="droductBtnLink">Add To Card</Link>
          </div>
        </div>


        <div className="singal-product-card">
          <div className="product-image">
            <Image width={280} height={280} src={productImage} alt="Product Iamge" className="image" />
          </div>
          <h4>iPhone 14 Pro Max</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa odio porro voluptates error nobis sint reiciendis</p>
          <div className="product-control-btn">
            <Link href="#" className="droductBtnLink">details</Link>
            <Link href="#" className="droductBtnLink">Add To Card</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products;
