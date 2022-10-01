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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import Checkbox from "@mui/material/Checkbox";

// Images
import team2 from "assets/images/team-2.jpg";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function data1() {
  const Author = ({ email, grade }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar name={email} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {email}
        </MDTypography>
        <MDTypography variant="caption">{grade}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const applyArray = [];
  const onCheckedElement = (event, id) => {
    const boxState = event.target.checked;
    if (boxState) {
      applyArray.push(id);
    } else if (!boxState) {
      const index = applyArray.indexOf(id);
      if (index > -1) {
        applyArray.splice(index, 1);
      }
    }
    return applyArray;
  };

  const Confirm = ({ title, id }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <Checkbox onChange={(event) => onCheckedElement(event, id)} />
    </MDBox>
  );

  const Navigate = useNavigate();
  const [tokenInfo, setTokenInfo] = useState({ Token_Info: [] });
  // const [infoRows, setInfoRows] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/admin/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("author 90", result.message);
        if (result.message === "jwt expired") {
          fetch(`http://127.0.0.1:8080/user/refresh`, {
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
              console.log(data.message);
              if (data.message === "SESSION OVER!") {
                // 네비게이션 후 로컬 스토리지 토큰 삭제해야함.
                // localStorage.removeItem("accessToken");
                // localStorage.removeItem("refreshToken");
                // localStorage.removeItem("message");
                // Navigate("/signin");
              }
              if (data.data.accessToken) {
                localStorage.setItem("accessToken", data.data.accessToken);
              }
            });
        } else if (result.message === "jwt malformed") {
          alert("세션이 만료되었습니다. 로그아웃 후 다시 로그인 해주세요");
          Navigate("/signin");
        } else if (result.message === "SESSION OVER!") {
          alert("세션이 만료되었습니다. 로그아웃 후 다시 로그인 해주세요");
          Navigate("/signin");
          // localStorage.removeItem("accessToken");
          // localStorage.removeItem("refreshToken");
          // localStorage.removeItem("message");
        } else if (result.accessToken) {
          localStorage.setItem("accessToken", result.accessToken);
        }
        setTokenInfo(result);
      });
  }, []);

  const infoResult = tokenInfo;

  const testArray = [];
  if (infoResult.Token_Info !== undefined || infoResult.Token_Info.length !== 0) {
    infoResult.Token_Info.map((value) => {
      const temp = {
        author: <Author image={team2} email={value.email} grade={value.grade} />,
        function: <Job fontWeight="medium" description="101 EA" />,
        function1: <Job fontWeight="medium" description={value.all_token} />,
        status: <Job component="a" description={value.add_token} />,
        Date: <Job component="a" description={value.date} />,
        reason: <Confirm component="a" email={value.email} id={value.id} />,
      };
      testArray.push(temp);
      return testArray;
    });
  }

  useEffect(() => {
    if (tokenInfo.Token_Info.length === undefined) {
      const emptyArray = {
        author: <Author email="empty" grade="empty" />,
        function: <Job fontWeight="medium" description="empty" />,
        function1: <Job fontWeight="medium" description="empty" />,
        status: <Job component="a" description="empty" />,
        Date: <Job component="a" description="empty" />,
        reason: <Confirm component="a" email="empty" id="empty" />,
      };
      tokenInfo.Token_Info.push(emptyArray);
    }
  });

  return {
    columns: [
      { Header: "신청자", accessor: "author", width: "45%", align: "left" },
      { Header: "보유 현황", accessor: "function1", align: "center" },
      { Header: "신청 개수", accessor: "status", align: "center" },
      { Header: "신청 날짜", accessor: "Date", align: "center" },
      { Header: "관리", accessor: "reason", align: "center" },
    ],
    rows: testArray,
    array: applyArray,
    empty: [
      {
        author: <Author image={team2} email="" grade="" />,
        function: <Job fontWeight="medium" description="" />,
        function1: <Job fontWeight="medium" description="" />,
        status: <Job component="a" description="" />,
        Date: <Job component="a" description="" />,
        reason: <Confirm component="a" email="" id="" />,
      },
    ],
  };
}