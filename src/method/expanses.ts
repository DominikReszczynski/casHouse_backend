import mongoose from "mongoose";
import Expanse from "../models/expanse";

var expansesFunctions = {
  addExpanse(req: any, res: any) {
    console.log("zaczynam dodawać");
    try {
      console.log(1);
      let expanseId = new mongoose.Types.ObjectId();
      console.log(req.body);
      let newExpanse = new Expanse(req.body.expanse);
      console.log(3);
      newExpanse._id = expanseId;
      console.log(4);
      let authorId = newExpanse.authorId;
      newExpanse.authorId = new mongoose.Types.ObjectId(authorId);
      console.log(5);

      newExpanse.save();
      console.log(6);
      newExpanse = newExpanse.toObject();
      return res.status(200).send({ success: true, expanse: newExpanse });
    } catch (e) {
      console.log(e);
      return res.status(500).send({ success: false });
    }
  },
};

module.exports = expansesFunctions;
