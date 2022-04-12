/* eslint-disable quotes */
import { IRoutes } from '../../constants/routes';
import Auth from './auth';
import Role from './role';

const MiddlewareRotue: React.FC<IRoutes> = (props): JSX.Element | null => {
  return Auth(Role(props), props);
};

export default MiddlewareRotue;
