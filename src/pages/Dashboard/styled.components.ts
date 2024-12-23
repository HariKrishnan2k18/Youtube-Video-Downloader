import styled from "styled-components";

export const BooksContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
  @media (max-width: 600px) {
    padding: 2px;
  }
`;

export const BooksDiv = styled.div<{ booksLength: number }>`
  padding: 12px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 8px;
  cursor: pointer;
  display: grid;
  grid-template-rows: auto;
  grid-template-rows: 50px 150px 80px 30px 30px 50px;
  align-items: center;
  justify-items: center;
  overflow: hidden;
  @media (max-width: 600px) {
    flex: ${(props) => props.booksLength > 2 && "1 1 calc(50% - 16px)"};
    height: 400px;
  }
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
  width: 100%;
`;

export const LeftNav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  position: sticky;
  top: 0;
  background-color: skyblue;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
    padding-bottom: 20px;
  }
`;

export const BookType = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  overflow-x: auto;
  white-space: nowrap;
  grid-template-rows: auto;
  grid-auto-columns: minmax(100px, 1fr);
`;

export const LeftDiv = styled.div`
  width: 10%;
  background-color: black;
`;
