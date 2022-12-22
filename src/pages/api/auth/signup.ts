import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import signUpSchema, { type SignUpSchema } from "../../../schemas/SignUpSchema";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: SignUpSchema;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      res.status(405).setHeader("Allow", "POST").send("Method Not Allowed");
      return;
    }

    signUpSchema.parse(req.body);

    const { email, password, name } = req.body;
    const user = await prisma?.user.findFirst({ where: { email } });

    if (user) throw new ApiError(409, "This email has already been used");

    const passwordHash = await bcrypt.hash(password, 10);

    await prisma?.user.create({ data: { email, passwordHash, name } });

    res.redirect("/login");

    return;
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(400).json(e.errors);
      return;
    } else if (e instanceof ApiError) {
      res.status(e.statusCode).send(e.message);
      return;
    } else if (e instanceof Error) {
      res.status(500).send("Internal Server Error");
      return;
    }

    res.status(500).send("Internal Server Error");
    return;
  }
}
