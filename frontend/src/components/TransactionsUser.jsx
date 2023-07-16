import React, { useEffect, useState } from "react";
import { getAuthToken } from "../Utils/Auth";
import moment from "moment";
import "./Transactions.css";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Loader from "./Loader";

const TransactionsUser = () => {
  const [data, setData] = useState();
  const sortList = ["latest", "oldest"];
  const [sort, setSort] = useState("latest");
  const [totalTransactions, setTotalTransactions] = useState();
  const [numOfPages, setNumOfPages] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const token = getAuthToken();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    setPage(newPage);
  };
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    setPage(newPage);
  };

  const handleChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  const url = `http://localhost:3000/api/v1/transactions/users?sort=${sort}&page=${page}`;
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
        setTotalTransactions(resData.totalTransactions);
        setNumOfPages(resData.numOfPages);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [sort, page]);

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
            <p>Amount Paid: {d.course.price}</p>
            <p>Purchase Date: {moment(d.createdAt).format("MMM Do, YYYY")}</p>
          </div>
        ))}
      </div>
      {numOfPages > 1 && (
        <div className="page-btn-section">
          <button className="prev-btn" onClick={prevPage}>
            <HiChevronDoubleLeft />
            prev
          </button>
          <div className="btn-container">
            {pages.map((pageNumber) => {
              return (
                <button
                  type="button"
                  className={
                    pageNumber === page ? "pageBtn btn-active" : "pageBtn"
                  }
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
          <button className="next-btn" onClick={nextPage}>
            next
            <HiChevronDoubleRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionsUser;
