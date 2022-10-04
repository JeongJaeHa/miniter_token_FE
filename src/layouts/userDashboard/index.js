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

// import axios from "axios";

function UserDashboard() {
  // const { sales, tasks } = reportsLineChartData;
  // const [userData, setUserData] = useState([]);
  // const [wallet, setWallet] = useState([]);
  const [inputs, setInputs] = useState(0);
  const [point, setPoint] = useState(0);
  // const [exchange, setExchange] = useState([]);
  const [getVPoint, setGetVPoint] = useState(0);

  const [product, setProduct] = useState([]);
  // const [buy, setBuy] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      const result = await axios.get(`http://127.0.0.1:8080/users/product`, {
        headers: {
          "Content-Type": "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      });
      const rr = result.data;
      setProduct(rr);
    };
    getProduct();
  }, []);

  const createWallet = async () => {
    const result = await axios({
      method: "post",
      url: `http://127.0.0.1:8080/users/wallet`,
      headers: {
        "Content-Type": "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
    });
    return result;
  };

  const exToken = async () => {
    const result = await axios({
      method: "patch",
      url: `http://127.0.0.1:8080/req/exchange`,
      headers: {
        "Content-type": "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
    });
    if (result.data.message === "SSS") {
      alert("포인트를 토큰으로 교환합니다..");
      window.location.reload();
    } else {
      alert("포인트 거지");
      window.location.reload();
    }
    return result;
  };

  useEffect(() => {
    const getAllToken = async () => {
      const result = await axios.get(`http://127.0.0.1:8080/users/token`, {
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
    const result = await axios.get(`http://127.0.0.1:8080/users/earnpoint`, {
      headers: {
        "Content-type": "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
    });
    const a = result.data[0].point;
    setPoint(a);
  };

  useEffect(() => {
    const getPoint = async () => {
      const result = await axios.get(`http://127.0.0.1:8080/users/point`, {
        headers: {
          "Content-type": "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      });
      const a = result.data[0].point;
      setGetVPoint(a);
    };
    getPoint();
  }, [point]);

  const buyProduct = async (e) => {
    const result = await axios({
      method: "post",
      url: "http://127.0.0.1:8080/users/order",
      data: {
        productId: e,
      },
      headers: {
        "Content-Type": "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
    });
    if (result.data.message === "PURCHASE COMPLETE") {
      alert("토큰을 사용 했습니다.");
      window.location.reload();
    } else {
      alert("거지");
      window.location.reload();
    }
    return result;
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                title="나의 토큰 수량"
                count={inputs}
                percentage={{
                  label: <MDButton onClick={() => createWallet()}>지갑 조회</MDButton>,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                count="토큰 교환"
                percentage={{
                  label: <MDButton onClick={() => exToken()}>토큰 교환하기</MDButton>,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                title="나의 포인트"
                count={getVPoint}
                percentage={{
                  label: <MDButton onClick={() => earnPoint()}>포인트 획득하기</MDButton>,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard />
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
                          상품 구매하기
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
