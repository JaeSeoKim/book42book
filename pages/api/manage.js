export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "PUT":
      try {
        // 42 is Master ex) 학장님
        if (!req.user || req.user.level >= 3) throw Error;
        const { target_name, level } = req.body;
        if (level >= 0 && level < req.user.level) {
          const User = await req.db.User.findOne({ intra_id: target_name });
          if (User == null) {
            res.status(200).json({
              ok: false,
              msg: "등록되지 않은 사용자 입니다.",
            });
          } else if (User.level > req.user.level) {
            res
              .status(200)
              .json({ ok: false, msg: "변경할 수 없는 대상입니다." });
          } else {
            const result = await User.updateOne({ level });
            res.status(200).json({ ok: result.ok ? true : false });
          }
        } else res.status(200).json({ ok: false, msg: "잘못된 level 입니다." });
      } catch (error) {
        console.log(error);
        res.status(200).json({ ok: false, msg: "로그인이 필요합니다." });
      }
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
