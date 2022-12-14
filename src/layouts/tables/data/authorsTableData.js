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
  const applyUserIdArray = [];
  const onCheckedElement = (event, id, userId) => {
    const boxState = event.target.checked;
    if (boxState) {
      applyArray.push(id);
      applyUserIdArray.push(userId);
    } else if (!boxState) {
      const index = applyArray.indexOf(id);
      if (index > -1) {
        applyArray.splice(index, 1);
        applyUserIdArray.splice(index, 1);
      }
    }
    return [applyArray, applyUserIdArray];
  };

  const Confirm = ({ title, id, userId }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <Checkbox onChange={(event) => onCheckedElement(event, id, userId)} />
    </MDBox>
  );

  const Navigate = useNavigate();
  const [tokenInfo, setTokenInfo] = useState({ Token_Info: [] });

  useEffect(() => {
    fetch(`http://10.58.52.59:8080/admin/dashboard`, {
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
          fetch(`http://10.58.52.59:8080/users/refresh`, {
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
                Navigate("/signin");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("message");
              }
              if (data.data.accessToken) {
                localStorage.setItem("accessToken", data.data.accessToken);
              }
            });
        } else if (result.message === "jwt malformed") {
          alert("????????? ?????????????????????. ???????????? ??? ?????? ????????? ????????????");
          Navigate("/signin");
        } else if (result.message === "SESSION OVER!") {
          alert("????????? ?????????????????????. ???????????? ??? ?????? ????????? ????????????");
          Navigate("/signin");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("message");
        } else if (result.accessToken) {
          localStorage.setItem("accessToken", result.accessToken);
        } else if (result.ok === false) {
          alert("????????? ???????????????.");
          Navigate("/personal");
          window.location.reload();
        }
        setTokenInfo(result);
      });
  }, []);

  const infoResult = tokenInfo;

  const testArray = [];
  if (infoResult.Token_Info !== undefined || infoResult.Token_Info.length !== 0) {
    infoResult.Token_Info.map((value) => {
      // console.log("139", value.userId);
      // console.log("140", value.id);
      const temp = {
        author: <Author image={team2} email={value.email} grade={value.grade} />,
        function: <Job fontWeight="medium" description="101 EA" />,
        function1: <Job fontWeight="medium" description={value.all_token} />,
        status: <Job component="a" description={value.add_token} />,
        Date: <Job component="a" description={value.date} />,
        reason: <Confirm component="a" email={value.email} id={value.id} userId={value.userId} />,
      };
      testArray.push(temp);
      return testArray;
    });
  }
  console.log(testArray);

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
      { Header: "?????????", accessor: "author", width: "45%", align: "left" },
      { Header: "?????? ??????", accessor: "function1", align: "center" },
      { Header: "?????? ??????", accessor: "status", align: "center" },
      { Header: "?????? ??????", accessor: "Date", align: "center" },
      { Header: "??????", accessor: "reason", align: "center" },
    ],
    rows: testArray,
    array: applyArray,
    userIdArray: applyUserIdArray,
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
