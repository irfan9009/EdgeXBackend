const { distance, closest } = require("fastest-levenshtein");
const { userUpdate, userCount } = require("../services/userService");
checkAnswer = async function (req, res) {
  try {
    const input = req.body.answer.toLowerCase();
    const answer = [
      "calaim",
      "cal aim",
      "california advancing and innovating medi-cal",
      "medi-cal",
      "california advancing and innovating medical",
      "medical",
      "medi cal",
      "cal-aim",
    ];

    if (answer.includes(input)) {
      const count = await userCount({ completedAt: { $ne: null } });
      const points = Math.round(100 * Math.pow(0.9, count));
      const result = await userUpdate(req.user.User.id, {
        completedAt: Date.now(),
        points: points,
      });
      res.status(200).json({ success: true, message: "success" });
    } else {
      let accuracy = 1;
      for (let i = 0; i < answer.length; i++) {
        let curAccuracy = distance(input, answer[i]) / answer[i].length;
        if (curAccuracy < accuracy) {
          accuracy = curAccuracy;
        }
      }
      let message = "Sorry, Wrong Answer";
      if (accuracy <= 0.2) {
        message = "You're very close to the answer!!";
      }
      res.status(200).json({ success: false, message: message });
    }
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({ success: false, message: error });
  }
};

module.exports = { checkAnswer };
