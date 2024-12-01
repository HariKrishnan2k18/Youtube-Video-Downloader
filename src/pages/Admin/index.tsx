/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Container,
  FormBox,
  InputArea,
  InputBox,
  InputField,
  InputForm,
  Label
} from "./styled.components";
import { inputField } from "../../utils/constants";
import axios from "axios";
import { useSelector } from "react-redux";
import { AddBook } from "../../data/reducers/booksList";
import { useRef } from "react";

function AdminPage({ setBooksList }: any) {
  const { token } = useSelector((s: any) => s.token);
  const formRef = useRef<HTMLFormElement | null>(null);
  const { books: booksArray } = useSelector((s: any) => s.books);
  const API_URL = String(import.meta.env.VITE_API_URL);
  const handleSubmit = (event: any) => {
    const data = new FormData(event.target);
    const formObj = Object.fromEntries(
      inputField.map((e) => {
        return [e.name, data.get(e.name)];
      })
    );
    axios
      .post(`${API_URL}/books/addbook`, formObj, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      .then(() => alert("Book Added Successfully"))
      .then(() => {
        AddBook(formObj);
        setBooksList([...booksArray, formObj]);
        if (formRef.current) {
          formRef.current.reset();
        }
      })
      .catch((err) => alert(err));
  };
  return (
    <Container>
      <h2 style={{ textAlign: "left" }}>Add Book</h2>
      <FormBox>
        <InputForm
          ref={formRef}
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(event);
          }}
        >
          {inputField.map((e, index) => (
            <InputField key={index}>
              <Label>{e.label}</Label>
              {e.label === "Description" ? (
                <InputArea name={e.name} placeholder={e.label} required />
              ) : (
                <InputBox
                  name={e.name}
                  placeholder={e.label}
                  type={e.type}
                  required
                />
              )}
            </InputField>
          ))}

          <button type="submit" style={{ background: "blue", color: "white" }}>
            Submit
          </button>
        </InputForm>
      </FormBox>
    </Container>
  );
}

export default AdminPage;
