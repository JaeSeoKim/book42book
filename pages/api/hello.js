export default (req, res) => {
  const result = 100 * 100;
  res.statusCode = 200
  res.json({ name: result })
}
