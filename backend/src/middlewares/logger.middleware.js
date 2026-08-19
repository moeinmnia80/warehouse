export function requestLogger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] [${req.id}] ${req.method} ${req.url}`,
  );
  next();
}
