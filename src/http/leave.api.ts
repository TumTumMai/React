/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "./index";
import api from "../constants/api";
import { Create, Find } from "../models/leave.api";

const leaveApi = {
  findLeaveDetailByIdUser: async (props: Find.IParams): Promise<Find.IFind> => {
    try {
      let url = api.leaveDetails + `?populate=*&sort[0]=createdAt:desc`;

      if (props?.page) {
        url = url + `&pagination[page]=${props.page}`;
      }

      if (props?.pageSize) {
        url = url + `&pagination[pageSize]=${props.pageSize}`;
      }

      if (props?.userId) {
        url = url + `&filters[user][id][$eq]=${props.userId}`;
      }

      if (props?.leaveDayType) {
        url = url + `&filters[leaveDayType][$eq]=${props.leaveDayType}`;
      }

      const res = await http.get(url);

      return res.data;
    } catch (e: any) {
      throw new Error(e);
    }
  },
  createLeaveDetail: async (props: Create.IParams): Promise<any> => {
    try {
      const url = api.leaveDetails;
      const headers = {
        Authorization: "Bearer " + props.token
      };

      const body = {
        title: props.title,
        leaveDayType: props.leaveDayType,
        description: props.description,
        status: "waiting",
        startDate: props.startDate,
        endDate: props.endDate,
        userId: props.userId
      };

      const res = await http.post(url, { data: body }, { headers });
      return res.data;
    } catch (e: any) {
      throw new Error(e);
    }
  }
};

export default leaveApi;
