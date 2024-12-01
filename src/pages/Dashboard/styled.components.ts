import styled from "styled-components";

export const BooksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 16px;
  width: "100%";
`;

export const BooksDiv = styled.div<{ booksLength: number }>`
  padding: 12px;
  flex: ${(props) => props.booksLength > 2 && "1 1 calc(23% - 16px)"};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 350px;
  height: 380px;
  overflow: hidden;
`;

export const FilterBooks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
`;

export const TopDiv = styled.div`
  background-color: black;
  height: 40px;
  border-radius: 6px;
`;

export const LeftNav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const BookType = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  justify-content: center;
`;

export const LeftDiv = styled.div`
  width: 10%;
  background-color: black;
`;
