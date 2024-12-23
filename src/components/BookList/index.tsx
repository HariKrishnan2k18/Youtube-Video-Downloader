/* eslint-disable @typescript-eslint/no-explicit-any */
import { BsCartCheck } from "react-icons/bs";
import {
  BooksContainer,
  BooksDiv,
  BookType
} from "../../pages/Dashboard/styled.components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StoreCart } from "../../data/reducers/booksList";
import axios from "axios";
import { useState } from "react";
import { genre } from "../../utils/constants";
import Button from "@mui/material/Button";

export default function BookList({ booksList, setBooksList }: any) {
  const { cart, books: booksArray } = useSelector((s: any) => s.books);
  const { token, user } = useSelector((s: any) => s.token);
  const [bookType, setBookType] = useState("All Books");
  const dispatch = useDispatch();
  const API_URL = String(import.meta.env.VITE_API_URL);
  const handleCart = (book: { id: string }) => {
    dispatch(StoreCart(String(book.id)));
    axios.post(
      `${API_URL}/books/cart`,
      {
        username: user.user,
        bookId: book.id.toString()
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
  };
  const handleNavChange = (value: string) => {
    setBookType(value);
    setBooksList(
      value === "All Books"
        ? booksArray
        : booksArray.filter((e: { genre: string }) => e.genre.includes(value))
    );
  };

  const booksPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = booksList.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(booksList.length / booksPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <h2>Product Overview</h2>
      <BookType>
        {genre.map((e) => (
          <div
            style={{ color: e.includes(bookType) ? "blue" : "black" }}
            onClick={() => handleNavChange(e)}
          >
            {e}
          </div>
        ))}
      </BookType>
      <BooksContainer>
        {currentBooks.map((book: any) => (
          <BooksDiv key={book.id} booksLength={currentBooks.length}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
                width: "100%"
              }}
            >
              <b>{book.title}</b>
              <BsCartCheck
                size={20}
                onClick={() => handleCart(book)}
                color={cart.map(Number).includes(book.id) && "red"}
              />
            </div>
            <img src={book.cover_image_url} width="120px" height="150px"></img>
            <strong>{book.description} </strong>
            <div>Price :{book.price} Rs</div>
            <div>
              Author : <b>{book.author} </b>
            </div>
            <Link to={`/book/${book.id}`}>
              <Button variant="contained" style={{ position: "static" }}>
                Buy
              </Button>
            </Link>
          </BooksDiv>
        ))}
      </BooksContainer>
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}
