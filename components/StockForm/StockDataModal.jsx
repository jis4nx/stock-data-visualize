import React from "react";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import StockFormUpdate from "./StockFormUpdate";

function StockDataUpdateModal({ open, setOpen, data }) {
  const handleOpen = () => setOpen(!open);
  return (
    <div>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody>
          <StockFormUpdate data={data} />
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default StockDataUpdateModal;
