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
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [fullToken, setFullToken] = useState([]);
  const [remainToken, setRemainToken] = useState([]);
  const [issuedToken, setIssuedToken] = useState([]);
  const [member, setMember] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const getFullToken = async () => {
      const result = await axios.get(`http://10.58.52.59:8080/admin/full`, {
        headers: {
          "Content-Type": "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      });
      if (result.data.message === "jwt expired") {
        alert("????????? ?????????????????????");
        Navigate("/signin");
        window.location.reload();
      }
      const user = result.data[0].fullToken;
      setFullToken(user);
    };
    getFullToken();
  }, []);

  useEffect(() => {
    const getRemainToken = async () => {
      try {
        const result = await axios.get(`http://10.58.52.59:8080/admin/remain`, {
          headers: {
            "Content-Type": "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        });
        const user = result.data[0].remainToken;
        setRemainToken(user);
      } catch (err) {
        if (err.message === "Request failed with status code 401") {
          Navigate("/personal");
          window.location.reload();
          alert("????????? ???????????????");
        } else if (err.message === "jwt expired") {
          alert("????????? ?????????????????????.");
          Navigate("/signin");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("message");
          window.location.reload();
        }
      }
    };
    getRemainToken();
  }, []);

  useEffect(() => {
    const getIssuedToken = async () => {
      const result = await axios.get(`http://10.58.52.59:8080/admin/issued`, {
        headers: {
          "Content-Type": "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      });
      const user = result.data[0].allToken;
      setIssuedToken(user);
    };
    getIssuedToken();
  }, []);

  useEffect(() => {
    const getMember = async () => {
      const result = await axios.get(`http://10.58.52.59:8080/admin/members`, {
        headers: {
          "Content-Type": "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      });
      const user = result.data[0].member;
      setMember(user);
    };
    getMember();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="?????? ?????? ??????"
                count={fullToken}
                percentage={{
                  color: "success",
                  label: "SangWoo & JaeHa",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="?????? ?????? ??????"
                count={remainToken}
                percentage={{
                  color: "success",
                  label: "3rd SIDE PROJECT",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="?????? ?????? ??????"
                count={issuedToken}
                percentage={{
                  color: "success",
                  label: "Make DashBoard",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="?????? ???"
                count={member}
                percentage={{
                  color: "success",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="????????? ??????"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="????????? ??????"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="????????? ??????"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
