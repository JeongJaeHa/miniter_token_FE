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
import Card from "@mui/material/Card";
// import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";
import React, { useEffect, useState } from "react";
import axios from "axios";

// import timelineItem from "examples/Timeline/TimelineItem/styles";

function OrdersOverview() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      const result = await axios.get(`http://10.58.52.59:8080/admin/newissued`, {
        headers: {
          "Content-Type": "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      });
      const a = result.data.newIssued;
      setUserData(a);
    };
    getUserData();
  }, []);

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          토큰 최신 발행 이력
        </MDTypography>
      </MDBox>
      <MDBox>
        {userData.map((item) => (
          <TimelineItem
            description={item.add_token}
            title={item.email}
            token={item.updated_at}
            lastItem
          />
        ))}
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
