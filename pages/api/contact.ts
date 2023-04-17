import { NextApiRequest, NextApiResponse } from "next";
import z, { ZodError } from "zod";
import { MongoClient, ObjectId } from "mongodb";
import { connectDatabase, insertDocument } from "@/lib/db-utils";

const contactSchema = z.object({
  name: z.string().trim().min(3),
  message: z.string().trim().min(3),
  email: z.string().trim().email(),
});

type Contact = {
  id?: ObjectId;
  name: string;
  email: string;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!["POST"].includes(req.method!)) return res.status(404).end();

  if (req.method === "POST") {
    const { email, name, message } = req.body;
    let client: MongoClient | undefined;

    // 1- validate Data
    try {
      contactSchema.parse({ email, name, message });
    } catch (err) {
      const error = err as ZodError;
      return res.status(422).json({ message: error.message });
    }

    // 2- store data to DB
    const newMessage: Contact = { name, email, message };

    try {
      client = await connectDatabase();
      const result = await insertDocument(client, "contacts", newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }

    res.status(200).json({ message: newMessage });

    client?.close();
  }
};

export default handler;
