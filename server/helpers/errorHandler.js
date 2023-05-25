function errorHandler(error, req, res, next) {
  if (error.message === 'bad request') {
    res.status(400).json({ error: 'bad request' });
  } else if (error.message === 'wrong credentials') {
    res.status(401).json({ error: 'wrong credentials' });
  } else if (error.message === 'unauthorized') {
    res.status(403).json({ error: ' unauthorized' });
  } else {
    next(error);
  }
}
export default errorHandler;
