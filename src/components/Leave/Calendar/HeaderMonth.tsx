/* eslint-disable quotes */
import { HeaderProps } from 'react-big-calendar';

const CustomDateHeader: React.FC<HeaderProps> = (props): JSX.Element => {
  return (
    <div className="flex items-center justify-center text-indigo-600">
      {props.label}
    </div>
  );
};

export default CustomDateHeader;
