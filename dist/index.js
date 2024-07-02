"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.users.findMany();
        // Convert BigInt fields to strings or numbers
        const usersToSend = users.map(user => (Object.assign(Object.assign({}, user), { telegram_id: user.telegram_id.toString() })));
        res.json(usersToSend);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}));
app.get('/api/bookmarks/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const bookmarks = yield prisma.bookmarks.findMany({
            where: {
                userId: parseInt(userId), // Convert userId to integer if necessary
            },
            take: 5, // Limit the results to the first 5
        });
        res.json(bookmarks);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}));
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json('HELLO');
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
