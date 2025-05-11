module.exports = (a, b) => {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum) => sum + val ** 2, 0));
  const magB = Math.sqrt(b.reduce((sum) => sum + val ** 2, 0));
  return dot / (magA * magB);
};
