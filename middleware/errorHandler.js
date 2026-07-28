export const errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ message: `${field} already exists` });
  }
  const status = err.statusCode || 500;
  const message = err.message || "Internal server error";
  console.error(`[${new Date().toISOString()}] ${status} - ${message}`);
  res.status(status).json({
    succes: false,
    message,
  });
};
