import React from "react";

const Comp: React.FC = ({ children }): JSX.Element => {
  return (
    <div className="p-16 rounded-lg shadow-lg shadow-black-200 bg-white">
      {children}
    </div>
  );
};

export default Comp;
