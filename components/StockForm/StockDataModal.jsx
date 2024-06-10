import React from "react";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import ProductForm from "./ProductForm";
import StockFormUpdate from "./StockFormUpdate";

function ProductChangeModal({ open, setOpen, data }) {
  const handleOpen = () => setOpen(!open);
  return (
    <div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Change Product</DialogHeader>
        <DialogBody>
          <StockFormUpdate data={data} />
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default ProductChangeModal;
