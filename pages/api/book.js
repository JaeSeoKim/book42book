export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { id } = req.query;
        const result = await req.db.BookInfo.findById(id)
          .populate("book")
          .populate({
            path: "book",
            populate: [{ path: "render_id" }],
          });
        res.status(200).json({ ok: true, BookInfo: result });
      } catch (error) {
        console.log(error);
        res.status(200).json({ ok: false, BookInfo: null });
      }
      break;
    case "POST":
      try {
        if (!req.user || req.user.level < 2) throw Error;

        const { name, author, publisher } = req.body;

        const result = await req.db.BookInfo.create({
          name,
          author,
          publisher,
          book: [],
        });
        res.status(200).json({ ok: true, BookInfo: result });
      } catch (error) {
        console.log(error);
        res.status(200).json({ ok: false, BookInfo: null });
      }
      break;
    case "PUT":
      try {
        if (!req.user || req.user.level < 2) throw Error;
        const { book_id, bookinfo_id, donater } = req.body;
        const bookInfo = await req.db.BookInfo.findById(bookinfo_id);

        const result = await req.db.Book.create({
          book_id: book_id,
          status: 0,
          donater,
          book_info: bookInfo.id,
        });
        bookInfo.book.push(result.id);
        bookInfo.save();
        res.status(200).json({ ok: true, book: result });
      } catch (error) {
        console.log(error);
        res.status(200).json({ ok: false, BookInfo: null });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
