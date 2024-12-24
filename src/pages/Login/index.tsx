import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  ForgotPassword,
  InlineError,
  LoginButton,
  LoginForm,
  Password,
  Username
} from "./styled.components";
import { setLoading } from "../../data/reducers/loginReducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((s: { token: { token: string } }) => s.token);
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
      console.log(formData.get("username"));
      dispatch(
        setLoading({
          username: formData.get("username") as string,
          password: formData.get("password") as string
        })
      );
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <h3 style={{ color: "#8C55AA" }}> Sign In</h3>
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
        <LoginButton type="submit">Login</LoginButton>
        <ForgotPassword href="/#"> Forgot Password ?</ForgotPassword>
      </LoginForm>
    </Container>
  );
};

export default Login;
