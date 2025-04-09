import { TErrorSources, TGenericsErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericsErrorResponse => {
  
  const message = 'Duplicate key';
  const statusCode = 400;
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleDuplicateError;
