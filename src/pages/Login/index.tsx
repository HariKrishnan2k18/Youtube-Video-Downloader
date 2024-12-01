/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  ForgotPassword,
  InlineError,
  LoginButton,
  LoginForm,
  Password,
  Username
} from "./styled.components";
import { setToken } from "../../data/reducers/loginReducer";
import { CartsStore } from "../../data/reducers/booksList";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setTokenID] = useState<any>(null);

  const validateForm = () => {
    let valid = true;
    const newErrors = { username: "", password: "" };

    if (!username) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      const formData = new FormData(event.target as HTMLFormElement);
      await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password")
        })
      })
        .then((res) => res.json())
        .then((res) => setTokenID(res));
    }
  };
  useEffect(() => {
    if (token) {
      dispatch(setToken(token));
      dispatch(CartsStore(token.user.books.cart));
      navigate("/dashboard");
    }
  }, [token]);

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <h3 style={{ color: "#8C55AA" }}> Sign In</h3>
        <div>
          <Username
            type="text"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            placeholder="Username"
            name="username"
          />
          {errors.username && <InlineError>{errors.username}</InlineError>}
        </div>
        <div>
          <Password
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="Password"
            name="password"
          />
          {errors.password && <InlineError>{errors.password}</InlineError>}
        </div>
        <LoginButton type="submit">Login</LoginButton>
        <ForgotPassword href="/#"> Forgot Password ?</ForgotPassword>
      </LoginForm>
    </Container>
  );
};

export default Login;
