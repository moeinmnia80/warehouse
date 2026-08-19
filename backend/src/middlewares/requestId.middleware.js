export function requestId(req, res, next) {
  const id = req.headers["x-request-id"] || crypto.randomUUID();

  req.id = id;
  res.set("X-Request-Id", id);

  next();
}
