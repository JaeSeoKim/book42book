export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        if (!req.user) throw Error;
        const User = await req.db.User.findOne({ user_id: req.user.user_id })
          .populate("rental_list")
          .populate({
            path: "rental_list",
            populate: [{ path: "book_info" }],
          });

        res.status(200).json({ ok: true, user: User });
      } catch (error) {
        console.log(error);
        res
          .status(200)
          .json({ ok: false, user: null, msg: "로그인이 필요합니다." });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
