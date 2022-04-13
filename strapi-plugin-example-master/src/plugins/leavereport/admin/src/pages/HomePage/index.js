/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect, useRef } from "react";
import { Box } from "@strapi/design-system/Box";
import { BaseCheckbox } from "@strapi/design-system/BaseCheckbox";
import { Typography } from "@strapi/design-system/Typography";
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import { Avatar } from "@strapi/design-system/Avatar";
import { Flex } from "@strapi/design-system/Flex";
import { IconButton } from "@strapi/design-system/IconButton";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";

// import PropTypes from 'prop-types';
// import pluginId from '../../pluginId';
import api from "../../components/constants/api";

const HomePage = () => {
  const [dataUser, setdataUser] = useState();

  useEffect(async () => {
    const users = () => {
      return axios.get(`${api.getUser}`).then((res) => {
        const Users = res.data.map((Fdata) => {
          return {
            id: Fdata.id,
            firstName: Fdata.firstName,
            Personalleave: Fdata.persanal_leave,
            VacationLeave: Fdata.vacation_leave,
            SickLeave: Fdata.sick_leave,
            All: Fdata.total_leave,
          };
        });
        return Users;
      });
    };
    let allUser_leaveDay = await users();
    setdataUser(allUser_leaveDay);
  }, []);

  const ROW_COUNT = 6;
  const COL_COUNT = 10;
  // const entry = [
  //   {
  //     id: 1,
  //     cover: "ToongVince",
  //     Personalleave: "2",
  //     VacationLeave: "2",
  //     SickLeave: "2",
  //     All: "6",
  //   },
  //   {
  //     id: 2,
  //     cover: "aaaaaa",
  //     Personalleave: "2",
  //     VacationLeave: "2",
  //     SickLeave: "2",
  //     All: "6",
  //   },
  // ];
  // const entries = [];
  // for (let i = 0; i < 5; i++) {
  //   entries.push({ ...entry, id: i });
  // }

  return (
    <div>
      <Box padding={8} background="neutral100">
        <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
          <Thead>
            <Tr>
              <Th>
                <Typography variant="sigma">ID</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Name</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">PersonalLeave</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">VacationLeave</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">SickLeave</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">ALL</Typography>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {!!dataUser &&
              dataUser.map((entry) => (
                <Tr key={entry.id}>
                  <Td>
                    <Typography textColor="neutral800">{entry.id}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {entry.firstName}
                    </Typography>{" "}
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {entry.Personalleave}
                    </Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {entry.VacationLeave}
                    </Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {entry.SickLeave}
                    </Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{entry.All}</Typography>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </div>
  );
};

export default memo(HomePage);
