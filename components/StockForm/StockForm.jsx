"use client";
import {
  Card,
  Typography,
  Input,
  Button,
  Spinner,
  Alert,
} from "@material-tailwind/react";
import { createStockData, updateStockData } from "@/app/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { validationSchema } from "@/utils/validation";

export default function StockForm() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const createMutation = useMutation({
    mutationFn: createStockData,
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries(["stockData"]);
    },
  });

  const initialValues = {
    date: "",
    trade_code: "",
    high: "",
    low: "",
    open: "",
    close: "",
    volume: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    await createMutation.mutateAsync(values);
  };

  return (
    <>
      <Alert
        className="mb-1 bg-indigo-600"
        open={open}
        onClose={() => setOpen(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
      >
        Stock {create ? "Added" : "Saved"}
      </Alert>
      <Card
        color="transparent"
        shadow={false}
        className="mt-4 flex items-center"
      >
        <Typography variant="h4" color="blue-gray">
          {create ? "Create Stock" : "Update Stock"}
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur={false}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Trade Code
                </Typography>
                <Field
                  name="trade_code"
                  as={Input}
                  size="lg"
                  placeholder="Enter trade code"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <ErrorMessage
                  name="trade_code"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="my-4 flex items-center gap-4">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    High
                  </Typography>
                  <Field
                    name="high"
                    as={Input}
                    maxLength={10}
                    containerProps={{ className: "min-w-[72px]" }}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <ErrorMessage
                    name="high"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Low
                  </Typography>
                  <Field
                    name="low"
                    as={Input}
                    maxLength={10}
                    containerProps={{ className: "min-w-[72px]" }}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <ErrorMessage
                    name="low"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="my-4 flex items-center gap-4">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Open
                  </Typography>
                  <Field
                    name="open"
                    as={Input}
                    maxLength={10}
                    containerProps={{ className: "min-w-[72px]" }}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <ErrorMessage
                    name="open"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Close
                  </Typography>
                  <Field
                    name="close"
                    as={Input}
                    maxLength={10}
                    containerProps={{ className: "min-w-[72px]" }}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <ErrorMessage
                    name="close"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Volume
                  </Typography>
                  <Field
                    name="volume"
                    as={Input}
                    maxLength={10}
                    containerProps={{ className: "min-w-[72px]" }}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <ErrorMessage
                    name="volume"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <Button className="mt-6" fullWidth type="submit">
                Create
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </>
  );
}
