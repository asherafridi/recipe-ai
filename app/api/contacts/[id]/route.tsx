import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Missing contact ID' });
    }

    const session = await getServerSession();
    if (!session?.user?.id) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    try {
        const contact = await prisma.contact.findFirst({
            where: {
                userId: +session.user.id,
                id: +id 
            }
        });

        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        return res.status(200).json({ contact });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
