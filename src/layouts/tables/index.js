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
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData token";

function Tables() {
  const { columns, rows, array, userIdArray } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const Approve = () => {
    console.log(array);
    console.log(userIdArray);
    fetch(`http://10.58.52.59:8080/admin/token/approve`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ array, userIdArray }),
    });
  };

  const Reject = () => {
    fetch(`http://10.58.52.59:8080/admin/token/reject`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ array, userIdArray }),
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                // sx={{ paddingRight: 40 }}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white" padding-right="15px">
                  교환신청 현황
                </MDTypography>
                <MDBox
                  sx={{
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <MDButton
                    onClick={() => {
                      Approve();
                      alert("승인 하였습니다.");
                      window.location.reload();
                    }}
                  >
                    승인
                  </MDButton>
                  <div style={{ width: "10px" }} />
                  <MDButton
                    onClick={() => {
                      Reject();
                      alert("거절 하였습니다.");
                      window.location.reload();
                    }}
                  >
                    거절
                  </MDButton>
                </MDBox>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  토큰교환 이력 (최근 6개 항목만 노출됩니다.)
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
