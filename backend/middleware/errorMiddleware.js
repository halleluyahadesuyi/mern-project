// Middleware to handle 404 - Not Found errors
const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`); // Create an error with the requested URL
  res.status(404);                                           // Set HTTP status to 404
  next(error);                                               // Pass the error to the next middleware
};

// General error handler middleware
const errorHandler = (err, req, res, next) => {
  // Use 500 if no specific status code has been set
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Handle invalid MongoDB ObjectId errors (e.g., malformed IDs)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Return the error response
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide stack trace in production
  });
};

export { notFound, errorHandler };