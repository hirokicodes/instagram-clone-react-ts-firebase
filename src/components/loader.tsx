import React from "react";
import Loader from "react-loader-spinner";

const ReactLoader: React.FC = () => {
  return (
    <Loader
      type="TailSpin"
      color="#00000059"
      height={70}
      width={70}
      // className="flex justify-center mt-12"
    />
  );
};

export default ReactLoader;
