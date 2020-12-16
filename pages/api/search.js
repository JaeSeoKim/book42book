export default async (req, res) => {
  const { q } = req.query;
  res.statusCode = 200;
  try {
    const bookList = await req.db.BookInfo.find();
    const filteredData = bookList.filter((book) => {
      const searchQuery = q.toLowerCase().trim();
      const { name, author, publisher } = book;
      return (
        (name && name.toLowerCase().includes(searchQuery)) ||
        (author && author.toLowerCase().includes(searchQuery))
      );
    });
    res.json({ ok: true, bookList: filteredData });
  } catch (error) {
    console.log(error);
    res.json({ ok: false, bookList: null });
  }
};
