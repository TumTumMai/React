/* eslint-disable quotes */
/* eslint-disable no-self-compare */
/* eslint-disable no-constant-condition */
// eslint-disable-next-line no-self-compare
/* eslint-disable @typescript-eslint/no-explicit-any */
import http from './index';
import api from '../constants/api';
import utils from 'utils';
import { Create, Find, Update, IData, Sum } from '../models/leave.api';

const leaveApi = {
  findLeaveDetail: async (props: Find.IParamsFind): Promise<Find.IFind> => {
    try {
      let url = api.leaveDetails + '?populate=*';

      if (props?.status) {
        url = url + `&filters[status][$eq]=${props.status}`;
      }

      const headers = {
        Authorization: 'Bearer ' + props.token
      };

      const res = await http.get(url, { headers });

      res.data.data = res.data.data?.map((item: IData) => {
        item.attributes.startDate = utils.time
          .convertTimeToLocal(item.attributes.startDate)
          .format();
        item.attributes.endDate = utils.time
          .convertTimeToLocal(item.attributes.endDate)
          .format();

        return item;
      });

      return res.data;
    } catch (e: any) {
      return e.response.data;
    }
  },
  SumLeaveDetail: async (props: Sum.IParams): Promise<Sum.ISum> => {
    try {
      const headers = {
        Authorization: 'Bearer ' + props.token
      };

      const url =
        api.leaveDetailsSum +
        `?userId=${props.userId}&leaveDayType=${props.leaveDayType}`;

      const res = await http.get(url, { headers });

      return res.data;
    } catch (e: any) {
      return e.response.data;
    }
  },
  findLeaveDetailByIdUser: async (
    props: Find.IParamsFindById
  ): Promise<Find.IFind> => {
    try {
      let url = api.leaveDetails + '?populate=*&sort[0]=createdAt:desc';

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

      res.data.data = res.data.data?.map((item: IData) => {
        item.attributes.startDate = utils.time
          .convertTimeToLocal(item.attributes.startDate)
          .format();
        item.attributes.endDate = utils.time
          .convertTimeToLocal(item.attributes.endDate)
          .format();

        return item;
      });

      return res.data;
    } catch (e: any) {
      return e.response.data;
    }
  },
  createLeaveDetail: async (props: Create.IParams): Promise<Create.ICreate> => {
    try {
      const url = api.leaveDetails;
      const headers = {
        Authorization: 'Bearer ' + props.token
      };

      const body = {
        title: props.title,
        leaveDayType: props.leaveDayType,
        description: props.description,
        status: 'waiting',
        startDate: utils.time.convertTimeToUTC(props.startDate).format(),
        endDate: utils.time.convertTimeToUTC(props.endDate).format(),
        userId: props.userId
      };

      const res = await http.post(url, { data: body }, { headers });
      res.data.data.attributes.startDate = utils.time
        .convertTimeToLocal(res.data.data.attributes.startDate)
        .format();
      res.data.data.attributes.endDate = utils.time
        .convertTimeToLocal(res.data.data.attributes.endDate)
        .format();

      return res.data;
    } catch (e: any) {
      return e.response.data;
    }
  },
  updateLeaveDetail: async (props: Update.IParams): Promise<Update.IUpdate> => {
    try {
      const url = api.leaveDetails + `/${props.id}`;
      const headers = {
        Authorization: 'Bearer ' + props.token
      };

      const body: Update.IBody = {
        title: props.title,
        description: props.description,
        status: props.status,
        startDate: utils.time.convertTimeToUTC(props.startDate).format(),
        endDate: utils.time.convertTimeToUTC(props.endDate).format(),
        userId: props.userId
      };

      const res = await http.put(url, { data: body }, { headers });
      res.data.data.attributes.startDate = utils.time
        .convertTimeToLocal(res.data.data.attributes.startDate)
        .format();
      res.data.data.attributes.endDate = utils.time
        .convertTimeToLocal(res.data.data.attributes.endDate)
        .format();

      return res.data;
    } catch (e: any) {
      return e.response.data;
    }
  }
};

export default leaveApi;
