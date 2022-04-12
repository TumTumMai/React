/* eslint-disable quotes */
import Button from './button';
import Text from './text';

export interface IPagination {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}

export { Button, Text };
