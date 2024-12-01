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
  return (
    <>
      <h2 style={{ textAlign: "left", marginLeft: "200px" }}>
        Product Overview
      </h2>
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
        {booksList.map((book: any) => (
          <BooksDiv key={book.id} booksLength={booksList.length}>
            <div>
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <b>{book.title}</b>
                <BsCartCheck
                  size={20}
                  onClick={() => handleCart(book)}
                  color={cart.map(Number).includes(book.id) && "red"}
                />
              </span>
              <br />
              <img
                src={book.cover_image_url}
                width="120px"
                height="150px"
              ></img>
              <div>
                <b>{book.description} </b>
              </div>
              <div>Price :{book.price} Rs</div>
              <div>
                Author : <b>{book.author} </b>
              </div>
            </div>
            <Link to={`/book/${book.id}`}>
              <button
                style={{ background: "blue", color: "white", width: "100%" }}
              >
                Buy
              </button>
            </Link>
          </BooksDiv>
        ))}
      </BooksContainer>
    </>
  );
}
