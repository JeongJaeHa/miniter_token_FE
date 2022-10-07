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
// import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function data2() {
  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Navigate = useNavigate();
  const [orderInfo, setOrderInfo] = useState([]);

  const moveLogin = function () {
    alert("세션이 만료되었습니다");
    Navigate("/signin");
    window.location.reload();
  };

  useEffect(() => {
    fetch(`http://3.35.55.229:8080/admin/exchange`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message === "jwt expired") {
          fetch(`http://3.35.55.229:8080/user/refresh`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "cache-control": "no-cache",
              accessToken: localStorage.getItem("accessToken"),
              refreshToken: localStorage.getItem("refreshToken"),
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.message === "SESSION OVER!") {
                moveLogin();
                // localStorage.removeItem("accessToken");
                // localStorage.removeItem("refreshToken");
                // localStorage.removeItem("message");
              }
              // Navigate("/signin");
              if (data.data.accessToken) {
                localStorage.setItem("accessToken", data.data.accessToken);
              }
              Navigate("/dashboard");
            });
        } else if (result.message === "jwt malformed") {
          Navigate("/signin");
        }
        if (result.message === "SESSION OVER!") {
          alert("세션이 만료되었습니다. 로그아웃 후 다시 로그인 해 주세요");
          // localStorage.removeItem("accessToken");
          // localStorage.removeItem("refreshToken");
          // localStorage.removeItem("message");
          Navigate("/signin");
        }
        if (result.accessToken) {
          localStorage.setItem("accessToken", result.accessToken);
        }
        setOrderInfo(result);
      });
  }, []);
  const testArray = [];
  if (orderInfo !== undefined && orderInfo.length !== 0) {
    orderInfo.Order_Info.map((value) => {
      const temp = {
        email: <Project name={value.email} />,
        add: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {value.add_token}
          </MDTypography>
        ),
        state: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {value.state}
          </MDTypography>
        ),
        date: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {value.date}
          </MDTypography>
        ),
      };
      testArray.push(temp);
      return testArray;
    });
  }

  return {
    columns: [
      { Header: "사용자", accessor: "email", width: "30%", align: "center" },
      { Header: "승인 결과", accessor: "state", align: "center" },
      { Header: "교환 수량", accessor: "add", align: "center" },
      { Header: "교환 일시", accessor: "date", align: "center" },
    ],
    rows: testArray,
  };
}
