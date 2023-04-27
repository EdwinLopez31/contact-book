// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/lib/prisma";
import { Contact } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: Contact[] | Contact;
    message?: string;
  }>
) {
  if (req.method === "GET") {
    try {
      const contacts = await prisma.contact.findMany();
      res.status(200).json({
        data: contacts,
        message: "Successfully fetched contacts",
      });
    } catch (error) {
      res.status(400).json({ message: "Failed to fetch contacts" });
    }
  } else if (req.method === "POST") {
    try {
      const { email, contactNumber, image, name } = req.body;
      const contact = await prisma.contact.create({
        data: {
          image: image,
          name: name,
          email: email,
          contactNumber: contactNumber,
        },
      });
      res.status(201).json({
        data: contact,
        message: "Successfully created new contact",
      });
    } catch (error) {
      res.status(400).json({ message: "Failed to create contact" });
    }
  }
}
