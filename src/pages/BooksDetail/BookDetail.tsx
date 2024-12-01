/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { useDispatch } from "react-redux";
import { StoreCart } from "../../data/reducers/booksList";
import axios from "axios";

function BookDetail() {
  const { id } = useParams();
  const { books, cart } = useSelector((s: any) => s.books);
  const Book = books.find((e: { id: number }) => e.id === Number(id));
  const { token, user } = useSelector((s: any) => s.token);
  const dispatch = useDispatch();
  const handleCart = () => {
    dispatch(StoreCart(String(Book.id)));
    axios.post(
      `http://localhost:8000/books/cart`,
      {
        username: user.user,
        bookId: Book.id.toString()
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
  };
  console.log(cart.map(Number), cart.map(Number).includes(3), Book.id);
  return (
    <div>
      <div>
        <h2>Books</h2>
        <br />
        <div style={{ display: "flex", flexDirection: "row", gap: "124px" }}>
          <div>
            <b>{Book.title}</b>
            <br />
            <br />
            <img src={Book.cover_image_url} height={400} width={350} />
            <br />
            <div>{Book.description}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%"
            }}
          >
            <h2>{Book.title}</h2>
            <h3># {Book.availability}</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span>{Book.rating}</span>{" "}
              <Rating initialValue={Book.rating} readonly size={20} />
            </div>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <b>RS. {Book.price}</b>
              <b
                style={{
                  background: "green",
                  color: "white",
                  padding: "4px",
                  borderRadius: "6px"
                }}
              >
                Sale
              </b>
            </div>
            <div>
              <p>Quantity 1</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                width: "100%"
              }}
            >
              <button
                style={{ width: "100%", border: "1px solid red" }}
                onClick={handleCart}
              >
                {cart.map(Number).includes(Number(Book.id))
                  ? `Remove Cart`
                  : `Add Cart`}
              </button>
              <button style={{ background: "red", color: "white" }}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
