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
// import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";

export default function data() {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
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

  return {
    columns: [
      { Header: "신청자", accessor: "author", width: "45%", align: "left" },
      { Header: "보유 현황", accessor: "function1", align: "left" },
      { Header: "신청 개수", accessor: "status", align: "center" },
      { Header: "신청 날짜", accessor: "Date", align: "center" },
      { Header: "허가 여부", accessor: "Result", align: "center" },
      { Header: "비고", accessor: "reason", align: "center" },
    ],

    rows: [
      {
        author: <Author image={team2} name="정재하" email="test@google.kr" />,
        function: <Job fontWeight="medium" description="100 EA" />,
        function1: <Job fontWeight="medium" description="0 EA" />,
        status: <Job component="a" description="100 EA" />,
        Date: <Job component="a" description="22.09.19" />,
        Result: <Job component="a" description="Denied" />,
        reason: <Job component="a" description="비정상 거래" />,
      },
      {
        author: <Author image={team2} name="정재하" email="test@google.kr" />,
        function: <Job fontWeight="medium" description="" />,
        function1: <Job fontWeight="medium" description="100 EA" />,
        status: <Job component="a" description="100 EA" />,
        Date: <Job component="a" description="22.09.11" />,
        Result: <Job component="a" description="Approve" />,
        reason: <Job component="a" description="" />,
      },
      {
        author: <Author image={team2} name="정재하" email="test@google.kr" />,
        function: <Job fontWeight="medium" description="" />,
        function1: <Job fontWeight="medium" description="200 EA" />,
        status: <Job component="a" description="300 EA" />,
        Date: <Job component="a" description="22.09.11" />,
        Result: <Job component="a" description="Approve" />,
        reason: <Job component="a" description="" />,
      },
    ],
  };
}
