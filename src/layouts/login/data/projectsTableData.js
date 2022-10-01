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
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
// import MDProgress from "components/MDProgress";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
// import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data() {
  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  // const Progress = ({ color, value }) => (
  //   <MDBox display="flex" alignItems="center">
  //     <MDTypography variant="caption" color="text" fontWeight="medium">
  //       {value}%
  //     </MDTypography>
  //     <MDBox ml={0.5} width="9rem">
  //       <MDProgress variant="gradient" color={color} value={value} />
  //     </MDBox>
  //   </MDBox>
  // );

  return {
    columns: [
      { Header: "사용처", accessor: "project", width: "30%", align: "center" },
      { Header: "사용 수량", accessor: "budget", align: "left" },
      { Header: "충전 수량", accessor: "add", align: "center" },
      { Header: "잔여 수량", accessor: "status", align: "center" },
      { Header: "사용 일시", accessor: "date", align: "center" },
      { Header: "기타 사항", accessor: "action", align: "center" },
    ],

    rows: [
      {
        project: <Project image={LogoAsana} name="Asana" />,
        budget: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            200 EA
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            0 EA
          </MDTypography>
        ),
        // completion: <Progress color="info" value={60} />,
        date: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            2022 .09. 11
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
      {
        project: <Project image={logoSlack} name="Admin" />,
        status: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            200 EA
          </MDTypography>
        ),
        add: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            100 EA
          </MDTypography>
        ),
        // completion: <Progress color="error" value={0} />,
        date: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            2022 .09. 11
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
      {
        project: <Project image={logoAtlassian} name="Atlassian" />,
        budget: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            200 EA
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            100 EA
          </MDTypography>
        ),
        // completion: <Progress color="error" value={30} />,
        date: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            2022 .09. 11
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
      {
        project: <Project image={logoSpotify} name="Spotify" />,
        budget: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            150 EA
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            350 EA
          </MDTypography>
        ),
        // completion: <Progress color="info" value={80} />,
        date: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            2022 .09. 11
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
      {
        project: <Project image={logoSlack} name="Admin" />,
        status: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            500 EA
          </MDTypography>
        ),
        add: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            300 EA
          </MDTypography>
        ),
        date: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            2022 .09. 11
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
      // {
      //   project: <Project image={logoSlack} name="Slack" />,
      //   budget: (
      //     <MDTypography component="a" variant="button" color="text" fontWeight="medium">
      //       $1,000
      //     </MDTypography>
      //   ),
      //   status: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       canceled
      //     </MDTypography>
      //   ),
      //   completion: <Progress color="error" value={0} />,
      //   action: (
      //     <MDTypography component="a" href="#" color="text">
      //       <Icon>more_vert</Icon>
      //     </MDTypography>
      //   ),
      // },
      {
        project: <Project image={logoInvesion} name="Invesion" />,
        budget: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            100 EA
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            200 EA
          </MDTypography>
        ),
        // completion: <Progress color="success" value={100} />,
        date: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            2022 .09. 11
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
    ],
  };
}
