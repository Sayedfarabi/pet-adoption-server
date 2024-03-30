import { ZodError, ZodIssue } from "zod";
import { TErrorDetails, TGenericErrorResponse } from "../interfaces/error";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorDetails: TErrorDetails = err.issues.map((issue: ZodIssue) => {
    return {
      field: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;

  const errorMessage: string = errorDetails.reduce(
    (accumulator, currentValue) => {
      return (accumulator += accumulator.length
        ? currentValue?.message
        : currentValue?.message + " ");
    },
    ""
  );

  return {
    statusCode,
    // message: "Validation Error",
    message: errorMessage,
    errorDetails,
  };
};

export default handleZodError;
