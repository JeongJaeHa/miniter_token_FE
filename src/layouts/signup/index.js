/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import axios from "axios";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

function signUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  // const token = localStorage.getItem("token");

  const register = () => {
    fetch(`http://10.58.52.59:8080/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "EMAIL ERROR" || data.message === "PASSWORD ERROR") {
          alert("이메일 형식과 비밀번호를 확인 해 주세요.");
        } else if (data.message === "EMAIL ALREADY EXIST") {
          alert("이미 존재하는 이메일 입니다.");
        } else if (data.message === "SIGNUP SUCCESS") {
          alert("회원가입을 축하합니다.");
          Navigate(`/signin`);
        } else {
          alert("다시 시도해 주세요.");
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Box
          sx={{
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography margin="normal" component="h1" variant="h5">
            SIGN UP
          </Typography>
          <TextField
            margin="normal"
            label="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
          />
          <TextField
            margin="normal"
            label="password"
            type="password"
            name="passowrd"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            required
          />
          <Button
            margin="normal"
            type="submit"
            variant="contained"
            sx={{ sx: 3 }}
            onClick={() => {
              register();
            }}
          >
            SUBMIT
          </Button>
          <Grid
            margin="normal"
            container
            item
            xs={12}
            sm={6}
            lg={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid>
              <Link margin="large" href="/signin">
                SIGN IN
              </Link>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Container>
  );
}

export default signUp;
