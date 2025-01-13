import mongoose from "mongoose";
import { CohereClientV2 } from "cohere-ai";
import Expanse from "../models/expanse";
const cohere = new CohereClientV2({
  token: process.env.COHERE_CHAT_BOT_AI_API_KEY,
});
var message: string =
  "Analyze the following list of expenses and provide a short (maximum 10 sentences) response suggesting practical ways to optimize and reduce spending. Focus on identifying categories or specific areas where savings are possible, and propose actionable steps to cut costs while maintaining essential needs. Here is the list of expenses: ";

const dasboardFunctions = {
  async chatWithCohere(req: any, res: any) {
    console.log(req.body.userID);
    try {
      const authorId = new mongoose.Types.ObjectId(req.body.userID);
      const expanses = await Expanse.find({ authorId: authorId });
      message += expanses.toString();
      console.log(message);
      const response = await cohere.chat({
        model: "command-r-plus",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      });
      if (response.message && response.message.content) {
        const responseMessage = response.message.content;
        const text = responseMessage[0]?.text;
        console.log(text);
        return res.status(200).send({
          success: true,

          text,
        });
        // text: "" });
      }
    } catch (error) {
      console.error("Error communicating with Cohere API:", error);
      return res.status(500).send({ success: false });
    }
  },
};

module.exports = dasboardFunctions;
