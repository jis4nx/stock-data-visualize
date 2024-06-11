import { Spinner } from "@material-tailwind/react";
import React from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center">
      <Spinner className="h-12 w-12" />
    </div>
  );
}

export default Loader;
