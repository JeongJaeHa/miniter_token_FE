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
import MDButton from "components/MDButton";

// Data
// import reportsBarChartData from "layouts/userDashboard/data/reportsBarChartData";
// import reportsLineChartData from "layouts/userDashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/userDashboard/components/Projects";
// import OrdersOverview from "layouts/userDashboard/components/OrdersOverview";

import React, { useEffect, useState } from "react";
import axios from "axios";

import challenger from "../../assets/images/logos/future.png";

function UserDashboard() {
  const [inputs, setInputs] = useState(0);
  const [point, setPoint] = useState(0);
  const [getVPoint, setGetVPoint] = useState(0);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      const result = await axios.get(`http://10.58.52.59:8080/users/product`, {
        headers: {
          "Content-Type": "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      });
      const productList = result.data;
      setProduct(productList);
    };
    getProduct();
  }, []);

  const createWallet = async () => {
    const result = await axios({
      method: "post",
      url: `http://10.58.52.59:8080/users/wallet`,
      headers: {
        "Content-Type": "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
    });
    return result;
  };

  const exToken = async () => {
    try {
      const result = await axios({
        method: "post",
        url: `http://10.58.52.59:8080/users/exchange`,
        headers: {
          "Content-type": "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      });
      if (result.data.message === "REQUEST TO TOKEN EXCHANGE BY POINT") {
        alert("?????? ?????? ?????? ??????!");
        window.location.reload();
      }
    } catch (err) {
      if (err.response.data.message === "LACK OF POINT") {
        alert("???????????? ???????????????. ?????? ????????? `1000:1` ?????????.");
        window.location.reload();
      } else if (err.response.data.message === "ONE TO ONE") {
        alert("?????? ????????? ????????? ????????????.");
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    const getAllToken = async () => {
      const result = await axios.get(`http://10.58.52.59:8080/users/token`, {
        headers: {
          "Content-type": "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      });
      const a = result.data[0].all_token;
      setInputs(a);
    };
    getAllToken();
  }, [inputs]);

  const earnPoint = async () => {
    const result = await axios.get(`http://10.58.52.59:8080/users/earnpoint`, {
      headers: {
        "Content-type": "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
    });
    const pointData = result.data[0].point;
    setPoint(pointData);
  };

  useEffect(() => {
    const getPoint = async () => {
      const result = await axios.get(`http://10.58.52.59:8080/users/point`, {
        headers: {
          "Content-type": "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      });
      const pointData = result.data[0].point;
      setGetVPoint(pointData);
    };
    getPoint();
  }, [point]);

  const buyProduct = async (e) => {
    try {
      const result = await axios({
        method: "post",
        url: "http://10.58.52.59:8080/users/order",
        data: {
          productId: e,
        },
        headers: {
          "Content-Type": "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      });
      if (result.data.message === "PURCHASE COMPLETE") {
        alert("????????? ?????? ????????????.");
        window.location.reload();
      }
    } catch (err) {
      if (err.response.data.message === "TOKEN") {
        alert("????????? ???????????????. ????????? ???????????? ???????????????.");
        window.location.reload();
      }
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                title="?????? ?????? ??????"
                count={inputs}
                percentage={{
                  label: <MDButton onClick={() => createWallet()}>?????? ??????</MDButton>,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                count="?????? ??????"
                percentage={{
                  label: <MDButton onClick={() => exToken()}>?????? ?????? ??????</MDButton>,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                title="?????? ?????????"
                count={getVPoint}
                percentage={{
                  label: <MDButton onClick={() => earnPoint()}>????????? ????????????</MDButton>,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3} align="center">
            <MDBox
              mb={1.5}
              component="img"
              src={challenger}
              sx={{ maxWidth: 200, alignItems: "center" }}
            >
              {/* <ComplexStatisticsCard
                component="img"
                title="adsf"
                src={challenger}
                alt="gradeImage"
              /> */}
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            {product.map((item) => (
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    title={item.token}
                    count={item.productName}
                    percentage={{
                      label: (
                        <MDButton onClick={() => buyProduct(item.productId)}>
                          ?????? ????????????
                        </MDButton>
                      ),
                    }}
                  />
                </MDBox>
              </Grid>
            ))}
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            {/* <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid> */}
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default UserDashboard;
