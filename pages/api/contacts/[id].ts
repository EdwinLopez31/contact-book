// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/lib/prisma";
import { Contact } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: Contact;
    message?: string;
  }>
) {
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const contact = await prisma.contact.findUnique({
        where: {
          id: id as string,
        },
      });
      if (contact) {
        res.status(200).json({
          data: contact,
          message: "Successfully fetched contact",
        });
      } else {
        res.status(200).json({
          message: "Failed fetching contact",
        });
      }
    } catch (error) {
      res.status(400).json({ message: "Failed fetching contact" });
    }
  } else if (req.method === "PUT") {
    try {
      const { id } = req.query;
      const { email, contactNumber, image, name } = req.body;
      const updatedContact = await prisma.contact.update({
        where: {
          id: id as string,
        },
        data: {
          image: image,
          name: name,
          email: email,
          contactNumber: contactNumber,
        },
      });

      res.status(200).json({
        data: updatedContact,
        message: "Successfully updated contact",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Failed to update contact" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      await prisma.contact.delete({
        where: {
          id: id as string,
        },
      });
      res.status(200).json({
        message: "Successfully deleted contact",
      });
    } catch (error) {
      res.status(400).json({ message: "Failed to delete contact" });
    }
  }
}
