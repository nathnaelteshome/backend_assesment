"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const commentRoute_1 = __importDefault(require("./routes/commentRoute"));
const recipeRoute_1 = __importDefault(require("./routes/recipeRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.i0a9qcb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
console.log(process.env.MONGO_USER);
mongoose_1.default
    .connect(uri)
    .then(() => app.listen(PORT, () => (console.log(`Server running on http://localhost:${PORT}`),
    console.log("connected to DB"))))
    .catch((error) => {
    console.log("error", error);
});
app.use("/api/users", userRoute_1.default);
app.use("/api/reciepe", recipeRoute_1.default);
app.use("/api/comment", commentRoute_1.default);
app.use("/api/auth", authRoute_1.default);
