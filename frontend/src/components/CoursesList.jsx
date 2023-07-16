import React, { useEffect, useState } from "react";
import "./CoursesList.css";
import { Link } from "react-router-dom";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Loader from "./Loader";
import SearchContainer from "./SearchContainer";

const CoursesList = () => {
  const [data, setData] = useState();
  const [numOfPages, setNumOfPages] = useState();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

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
    setSearch((s) => (s = e.target.value));

    setPage(1);
  };

  let url = `http://localhost:3000/api/v1/courses?page=${page}`;
  if (search) {
    url = url + `&search=${search}`;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url, {
          method: "GET",
        });
        const resData = await response.json();
        setData(resData.getAllCourses);
        setNumOfPages(resData.numOfPages);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [page, search]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="courses--card">
        <h1>Choose your Course Now!</h1>
        <SearchContainer search={search} handleChange={handleChange} />
        <ul className="courses--list">
          {data?.map((course) => (
            <li key={course._id} className="courses--item">
              <img src={course.image} alt={course.name} />
              <div className="card--content">
                <h2>{course.name}</h2>
                <p>{course.description.substring(0, 150)}...</p>
                <Link to={`/courses/${course._id}`}>
                  <a href="" className="card--content__link">
                    View Details
                  </a>
                </Link>
              </div>
            </li>
          ))}
        </ul>
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
    </>
  );
};

export default CoursesList;
