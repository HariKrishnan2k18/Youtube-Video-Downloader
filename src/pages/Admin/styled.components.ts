import styled from "styled-components";

export const InputField = styled.div`
  display: flex;
  /* flex-direction: row; */
  justify-content: space-between;
  gap: 30px;
`;

export const InputForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  @media (max-width: 600px) {
    grid-template-columns: 30%;
  }
`;

export const Label = styled.label`
  text-align: right;
  margin-right: 10px;
  white-space: nowrap;
`;

export const InputBox = styled.input`
  flex-grow: 1;
  padding: 5px;
  width: 200px;
`;

export const InputArea = styled.textarea`
  height: 50px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const FormBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 50vh;
  width: 90%;
  border: 2px solid black;
`;
