export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        if (!req.user) throw Error;
        const { rentalList } = req.body;
        const User = await req.db.User.findOne({ user_id: req.user.user_id });

        let result = [];

        for (const book_id of rentalList) {
          try {
            const Book = await req.db.Book.findOne({ book_id });
            if (Book.status == "0") {
              await User.rental_list.push(Book.id);
              await User.save();
              await Book.updateOne({
                status: 1,
                rental_date: new Date(),
                render_id: User.id,
              });
              await Book.save();
              result.push({ book_id, ok: true });
            } else result.push({ book_id, ok: false });
          } catch (error) {
            result.push({ book_id, ok: false });
          }
        }
        res.status(200).json({ ok: true, BookInfo: result });
      } catch (error) {
        res.status(200).json({ ok: false, BookInfo: null });
      }
      break;
    case "DELETE":
      try {
        const { rentalList } = req.body;
        let result = [];

        for (const book_id of rentalList) {
          try {
            const Book = await req.db.Book.findOne({ book_id });
            console.log(Book);
            if (Book.status == "1") {
              const User = await req.db.User.findById(Book.render_id);
              await User.rental_list.pull(Book.id);
              await User.save();
              await Book.updateOne({
                status: 0,
                rental_date: null,
                render_id: null,
              });
              await Book.save();
              result.push({ book_id, ok: true });
            } else result.push({ book_id, ok: false });
          } catch (error) {
            console.log(error);
            result.push({ book_id, ok: false });
          }
        }
        res.status(200).json({ ok: true, BookInfo: result });
      } catch (error) {
        res.status(200).json({ ok: false, BookInfo: null });
      }
      break;
    default:
      res.setHeader("Allow", ["POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
