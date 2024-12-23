/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LeftNav, TopDiv } from "./styled.components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FilterOption from "../../components/FilterOption/index.js";
import BookList from "../../components/BookList/index.js";
import AdminPage from "../Admin/index.js";
import { fetchData } from "../../data/reducers/booksList.js";

function Dashboard() {
  const { token } = useSelector((s: { token: { token: string } }) => s.token);

  const { books: booksArray } = useSelector((s: any) => s.books);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [booksList, setBooksList] = useState([]);
  const [page, setPage] = useState("Home");
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else if (booksArray.length > 0) {
      setBooksList(booksArray);
    } else if (booksArray.length === 0) {
      dispatch(fetchData(token));
    }
  }, [token, booksArray]);

  const handleChange = (value: string, type: string) => {
    setBooksList(
      value === "All"
        ? booksArray
        : booksArray.filter((e: any) =>
            type === "availability" ? e[type] === value : e[type] > value
          )
    );
  };

  const navLink = ["Home", "Book Shop", "About", "Contact", "Admin"];
  const handleNavChange = (nav: string) => {
    setPage(nav);
    if (nav === "Admin") {
      navigate("/dashboard/Admin");
    }
  };

  return (
    <Suspense fallback={<div>Loading</div>}>
      <div style={{ width: "100%" }}>
        <TopDiv />
        <div>
          <LeftNav>
            <h2 style={{ color: "blue" }}>Books Store</h2>
            <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
              {navLink.map((nav, index) => (
                <div
                  key={index}
                  style={{ color: page === nav ? "blue" : "black" }}
                  onClick={() => handleNavChange(nav)}
                >
                  {nav}
                </div>
              ))}
            </div>
            <FilterOption handleChange={handleChange} len={booksList.length} />
          </LeftNav>
          {page === "Home" ? (
            <BookList booksList={booksList} setBooksList={setBooksList} />
          ) : (
            <AdminPage setBooksList={setBooksList} />
          )}
        </div>
      </div>
    </Suspense>
  );
}

export default Dashboard;
