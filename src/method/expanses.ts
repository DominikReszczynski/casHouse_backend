import mongoose from "mongoose";
import Expanse from "../models/expanse";

var expansesFunctions = {
  async addExpanse(req: any, res: any) {
    console.log("zaczynam dodawać");
    try {
      let expanseId = new mongoose.Types.ObjectId();
      let newExpanse = new Expanse(req.body.expanse);
      newExpanse._id = expanseId;
      let authorId = newExpanse.authorId;
      newExpanse.authorId = new mongoose.Types.ObjectId(authorId);

      await newExpanse.save();
      newExpanse = newExpanse.toObject();
      return res.status(200).send({ success: true, expanse: newExpanse });
    } catch (e) {
      console.log(e);
      return res.status(500).send({ success: false });
    }
  },

  async removeExpanse(req: any, res: any) {
    console.log("zaczynam removeExpanse");
    console.log(req.body.expanseId);
    try {
      const expanseId = new mongoose.Types.ObjectId(req.body.expanseId);

      // Poczekaj na zakończenie operacji usuwania
      const result = await Expanse.findByIdAndRemove(expanseId);

      // Sprawdź, czy element został usunięty
      if (!result) {
        return res
          .status(404)
          .send({ success: false, message: "Expanse not found" });
      }

      return res.status(200).send({ success: true });
    } catch (e) {
      console.log(e);
      return res.status(500).send({ success: false });
    }
  },

  async getExpansesByAuthor(req: any, res: any) {
    console.log("Pobieram wydatki dla autora o ID 6459f367dff5d419539cbd41");
    try {
      const authorId = new mongoose.Types.ObjectId("6459f367dff5d419539cbd41");

      // Pobieranie wydatków z bazy
      const expanses = await Expanse.find({ authorId: authorId });

      return res.status(200).send({ success: true, expanses });
    } catch (e) {
      console.log(e);
      return res.status(500).send({ success: false });
    }
  },
};

module.exports = expansesFunctions;
