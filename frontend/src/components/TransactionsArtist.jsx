import React, { useEffect, useState } from "react";
import { getAuthToken } from "../Utils/Auth";
import moment from "moment";
import "./Transactions.css";
import Loader from "./Loader";

const TransactionsArtist = () => {
  const [data, setData] = useState();
  const sortList = ["latest", "oldest"];
  const [sort, setSort] = useState("latest");
  const [loading, setLoading] = useState(false);
  const token = getAuthToken();
  const handleChange = (e) => {
    setSort(e.target.value);
  };
  const url = `http://localhost:3000/api/v1/transactions/artists?sort=${sort}`;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const resData = await response.json();
        setData(resData.getAllBookings);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [sort]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="transactions--container">
      <h1>All transactions</h1>
      <label htmlFor="sort">Sort By:</label>
      <select value={sort} name="sort" id="sort" onChange={handleChange}>
        {sortList?.map((sortList) => (
          <option key={sortList} value={sortList}>
            {sortList}
          </option>
        ))}
      </select>
      <div className="transactions--box">
        {data?.map((d) => (
          <div className="transaction">
            <h3>Order ID: {d.order_id}</h3>
            <p>Course Purchased: {d.course.name}</p>
            <p>User: {d.user.username}</p>
            <p>Purchase Date: {moment(d.createdAt).format("MMM Do, YYYY")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsArtist;
