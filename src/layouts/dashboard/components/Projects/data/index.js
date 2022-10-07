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
// import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
// import MDAvatar from "components/MDAvatar";
// import MDProgress from "components/MDProgress";

// Images
// import logoXD from "assets/images/small-logos/logo-xd.svg";
// import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
// import logoSlack from "assets/images/small-logos/logo-slack.svg";
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
// import logoJira from "assets/images/small-logos/logo-jira.svg";
// import logoInvesion from "assets/images/small-logos/logo-invision.svg";
// import team1 from "assets/images/team-1.jpg";
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function data() {
  // const avatars = (members) =>
  //   members.map(([image, name]) => (
  //     <Tooltip key={name} title={name} placeholder="bottom">
  //       <MDAvatar
  //         src={image}
  //         alt="name"
  //         size="xs"
  //         sx={{
  //           border: ({ borders: { borderWidth }, palette: { white } }) =>
  //             `${borderWidth[2]} solid ${white.main}`,
  //           cursor: "pointer",
  //           position: "relative",

  //           "&:not(:first-of-type)": {
  //             ml: -1.25,
  //           },

  //           "&:hover, &:focus": {
  //             zIndex: "10",
  //           },
  //         }}
  //       />
  //     </Tooltip>
  //   ));

  const Company = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={name} size="sm" /> */}
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getUserToken = async () => {
      const result = await axios.get(`http://3.35.55.229:8080/admin/personal`, {
        headers: {
          "Content-Type": "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      });
      const a = result.data.personal;
      setUserData(a);
    };
    getUserToken();
  }, []);

  const tokenCollect = async (e) => {
    const result = await axios({
      method: "patch",
      url: `http://3.35.55.229:8080/req/collect`,
      data: {
        userId: e,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.data.message === "TOKEN COLLECT") {
      alert("토큰이 회수되었습니다.");
      window.location.reload();
    }
    return result;
  };

  const rowsData = [];
  userData.forEach((item) =>
    rowsData.push({
      token: <Company name={item.all_token} />,
      email: <MDBox>{item.email}</MDBox>,
      collect: <MDButton onClick={() => tokenCollect(item.user_id)}> 회수 </MDButton>,
    })
  );

  return {
    columns: [
      { Header: "user email", accessor: "email", width: "45%", align: "left" },
      { Header: "token", accessor: "token", width: "10%", align: "right" },
      { Header: "collect", accessor: "collect", width: "10%", align: "right" },
    ],
    rows: rowsData,
  };
}
