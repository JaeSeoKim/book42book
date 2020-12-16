export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const result = await req.db.BookInfo.findById(req.query.id)
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
        if (!req.user || req.user.level == 1) throw Error;
        const result = await req.db.BookInfo.create({ ...req.body, book: [] });
        res.status(200).json({ ok: true, BookInfo: result });
      } catch (error) {
        console.log(error);
        res.status(200).json({ ok: false, BookInfo: null });
      }
      break;
    case "PUT":
      try {
        if (!req.user || req.user.level == 1) throw Error;
        const { book_id, book_info, donater } = req.body;
        const bookInfo = await req.db.BookInfo.findById(book_info);

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
