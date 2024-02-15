import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home() {
  const [search, setSearch] = useState("");

  const [foodcat, setCat] = useState([]);
  const [fooditem, setItem] = useState([]);
  const loaddata = async () => {
    let response = await fetch("https://nom-nom-backend.vercel.app/api/food-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setItem(response[0]);
    setCat(response[1]);
    // console.log(response[0],response[1]);
  };
  useEffect(() => {
    loaddata();
  }, []);
  return (
    <div>
      <div>
        <Navbar />
        <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

          <div className="carousel-inner " id='carousel'>
            <div class=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">  
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
              </div>
            </div>
            <div className="carousel-item active" >
              <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
        <div className="container">
          {foodcat.length !== 0
            ? foodcat.map((data) => {
                return (
                  <div className="row mb-3 " key={data._id}>
                    <div className="fs-3 m-3 ">{data.CategoryName}</div>
                    <hr />
                    {fooditem.length !== 0
                      ? fooditem
                          .filter(
                            (item) =>
                              item.CategoryName === data.CategoryName &&
                              item.name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                          )
                          .map((filteritems) => {
                            return (
                              <div
                                key={filteritems._id}
                                className="col-12 col-md-6 col-lg-3"
                              >
                                <Card
                                  foodname={filteritems}
                                  options={filteritems.options[0]}
                                ></Card>
                              </div>
                            );
                          })
                      : "no data found :("}
                  </div>
                );
              })
            : " "}
        </div>

        <Footer />
      </div>
    </div>
  );
}