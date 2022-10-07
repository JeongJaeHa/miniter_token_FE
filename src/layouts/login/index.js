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
// import { CollectionsOutlined } from "@mui/icons-material";

function signIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  // const token = localStorage.getItem("token");

  function login() {
    fetch(`http://3.35.55.229:8080/user/signin`, {
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
      .then((result) => {
        if (result.accessToken) {
          localStorage.setItem("accessToken", result.accessToken);
          localStorage.setItem("refreshToken", result.refreshToken);
        }
        if (result.message === "KEY ERROR") {
          alert("이메일 또는 비밀번호를 확인 해 주세요.");
        } else if (result.message === "WELCOME") {
          alert("환영합니다.");
          localStorage.setItem("message", result.message);
          Navigate(`/personal`);
        } else if (result.message === "HELLO") {
          alert("반갑습니다.");
          localStorage.setItem("message", result.message);
          Navigate(`/dashboard`);
        }
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Box sx={{ marginTop: 40, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography margin="normal" component="h1" variant="h5">
            SIGN IN
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
              login();
            }}
          >
            LOGIN
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
              <Link margin="large" href="/signup">
                SIGN UP
              </Link>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Container>
  );
}

export default signIn;
