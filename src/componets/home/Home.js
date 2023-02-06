import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import moment from "moment";

function Home() {
  const apiKey = "7c38b4971c384277b8595047230602";
  const [region, setRegion] = useState("");
  const [temp, setTemp] = useState("");
  const [icon, setIcon] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState([]);
  const [feels, setFeels] = useState("");
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");

  async function fetchData(searchKey) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchKey}`;

    try {
      const data = await axios.get(url);
      setCity(data.data.location.name);
      setRegion(data.data.location.region);
      setIcon(data.data.current.condition.icon);
      setDesc(data.data.current.condition.text);
      setTemp(data.data.current.temp_c);
      setFeels(data.data.current.feelslike_c);

      const dt = data.data.location.localtime;
      const onlyDate = dt.slice(0, 11);
      const year = onlyDate.slice(0, 4);
      const day = onlyDate.slice(8, 14);
      const month = moment.utc(new Date(onlyDate)).format("MMMM");
      setDate([day, month, " ", year]);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData("Mumbai");
  }, []);

  return (
    <div className="Home ">
      <div className="background"></div>
      <div className="container ">
        <div className="search center">
          <input
            type="text"
            placeholder="Search location"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            onClick={() => {
              fetchData(search);
            }}
          >
            Search
          </button>
        </div>
        <div className="top flex">
          <div className="left-part ">
            <div className="city flex">
              <h1 className="city-name">{city}</h1>
              <p className="color">{region}</p>
              <p></p>
              <p className="color">{date}</p>
              <div className="image">
                <img src={icon} alt="" />
                <p className="desc">{desc}</p>
              </div>
            </div>
          </div>
          <div className="right-part ">
            <h1>
              {temp} <sup>O</sup>
            </h1>
            <p>
              Feels/
              <span className="bold">
                {feels} <sup>o</sup>
              </span>
            </p>
          </div>
        </div>
        <div className="bottom"></div>
      </div>
    </div>
  );
}

export default Home;
