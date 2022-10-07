/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// @mui material components
// import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function data() {
  const Company = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={name} size="sm" /> */}
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const [history, setHistory] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const getUserHistory = async () => {
      try {
        const result = await axios.get(`http://3.35.55.229:8080/users/history`, {
          headers: {
            "Content-Type": "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        });
        const a = result.data;
        setHistory(a);
      } catch (err) {
        console.log(err);
        alert("세션이 만료되었습니다");
        Navigate("/signin");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("message");
        window.location.reload();
      }
    };
    getUserHistory();
  }, []);

  const rowsData = [];
  history.forEach((user) =>
    rowsData.push({
      token: <Company name={user.price} />,
      email: <MDBox>{user.name}</MDBox>,
      date: <MDBox>{user.updated_at}</MDBox>,
    })
  );
  return {
    columns: [
      { Header: "user email", accessor: "email", width: "45%", align: "left" },
      { Header: "token", accessor: "token", width: "10%", align: "center" },
      { Header: "date", accessor: "date", width: "10%", align: "right" },
    ],
    rows: rowsData,
  };
}
