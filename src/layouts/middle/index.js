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
import React from "react";
// import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import axios from "axios";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

function signIn() {
  const Navigate = useNavigate();
  // const token = localStorage.getItem("token");

  function middle() {
    Navigate(`/dashboard`);
  }

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Box sx={{ marginTop: 40, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography margin="normal" component="h1" variant="h5">
            WELCOME!
          </Typography>
          <Button
            margin="normal"
            type="submit"
            variant="contained"
            sx={{ sx: 3 }}
            onClick={() => {
              middle();
            }}
          >
            GO MAIN PAGE
          </Button>
        </Box>
      </div>
    </Container>
  );
}

export default signIn;
