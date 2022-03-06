import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRoutes } from "../../constants/routes";
import { IAllReducers } from "../../redux/store";

const Role = (props: IRoutes): JSX.Element | null => {
  const auth = useSelector((state: IAllReducers) => state.auth);

  if (props?.requestRole) {
    if (auth?.user?.role?.name && auth.user.role.name === props.requestRole) {
      return <props.element />;
    } else if (
      auth?.user?.role?.name &&
      auth.user.role.name !== props.requestRole
    ) {
      return <Navigate to="*" />;
    } else {
      return null;
    }
  } else {
    return <props.element />;
  }
};

export default Role;
