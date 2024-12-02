import styled from "styled-components";

export const InputField = styled.div`
  display: flex;
  /* flex-direction: row; */
  justify-content: space-between;
  gap: 30px;
`;

export const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const Label = styled.label`
  flex-basis: 30%;
  text-align: right;
  margin-right: 10px;
  width: 100px;
`;

export const InputBox = styled.input`
  flex-grow: 1;
  padding: 5px;
  width: 10%;
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
