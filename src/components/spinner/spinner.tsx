import React from "react";

import "./spinner.css";

const Spinner: React.FunctionComponent<{}> = () => {
  return (
    <div className="container movie__spinner">
      <div className="lds-double-ring">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
