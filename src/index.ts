import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/api/users', async (req: any, res: any) => {
    try {
        const users = await prisma.users.findMany();
        // Convert BigInt fields to strings or numbers
        const usersToSend = users.map(user => ({
          ...user,
          telegram_id: user.telegram_id.toString(), // Example: Convert BigInt id to string
          // other fields if necessary
      }));

      res.json(usersToSend);
    } catch (error) {
      console.log(error);

        res.status(500).json({ error: 'Failed to fetch users' });
    }

});

app.get('/api/bookmarks/:telegramId', async (req: any, res: any) => {
  const { telegramId } = req.params;

    try {
      const bookmarks = await prisma.bookmarks.findMany({
        where: {
          users: {
            telegram_id: parseInt(telegramId), // Filter by user's telegramId
          },
        },
        // take: 5, // Limit the results to the first 5
      });

      res.json(bookmarks);
    } catch (error) {
      console.log(error);

        res.status(500).json({ error: 'Failed to fetch users' });
    }

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
