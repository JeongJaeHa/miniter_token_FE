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
        {/* <MDBox mt={0} mb={2}> */}
        {/* <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              24%
            </MDTypography>{" "}
            this month
          </MDTypography> */}
        {/* </MDBox> */}
      </MDBox>
      <MDBox>
        {userData.map((item) => (
          <TimelineItem
            title={item.email}
            description={item.add_token}
            token={item.updated_at}
            lastItem
          />
        ))}
        {/* <TimelineItem
          color="error"
          icon="inventory_2"
          title="New order #1832412"
          dateTime="21 DEC 11 PM"
        />
        <TimelineItem
          color="info"
          icon="shopping_cart"
          title="Server payments for April"
          dateTime="21 DEC 9:34 PM"
        /> */}
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
