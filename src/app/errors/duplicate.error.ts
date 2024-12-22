import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err:any):TGenericErrorResponse => {

    const match = err.message.match(/"([^"]*)"/)
    const extractedMessage = match && match[1]

    const error: TErrorSource = [{
        path: '',
        message: `${extractedMessage} is already exists`,
    }] 

    const statusCode = 400;

    return {
      statusCode,
      message: 'Invalid ID',
      error,
    };
}


export default handleDuplicateError