function createInterval(delay, callback) {
  const id = setInterval(callback, delay);
  return () => clearInterval(id);
}

module.exports = createInterval;
