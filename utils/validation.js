import * as Yup from "yup";
export const validationSchema = Yup.object({
  trade_code: Yup.string().required("Trade code is required"),
  high: Yup.number()
    .transform((value) => (value === "" ? null : value))
    .test("decimalPlaces", "Must have at most 2 decimal places", (value) => {
      const regex = /^\d+(\.\d{0,2})?$/;
      return regex.test(value);
    }),
  low: Yup.number()
    .transform((value) => (value === "" ? null : value))
    .test("decimalPlaces", "Must have at most 2 decimal places", (value) => {
      const regex = /^\d+(\.\d{0,2})?$/;
      return regex.test(value);
    }),
  open: Yup.number()
    .transform((value) => (value === "" ? null : value))
    .test("decimalPlaces", "Must have at most 2 decimal places", (value) => {
      const regex = /^\d+(\.\d{0,2})?$/;
      return regex.test(value);
    }),
  close: Yup.number()
    .transform((value) => (value === "" ? null : value))
    .test("decimalPlaces", "Must have at most 2 decimal places", (value) => {
      const regex = /^\d+(\.\d{0,2})?$/;
      return regex.test(value);
    }),
  volume: Yup.number()
    .positive("Volume must be a positive integer")
    .integer("Volume must be an integer")
    .required("Volume is required"),
});
