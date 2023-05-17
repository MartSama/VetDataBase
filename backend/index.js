import personalRoutes from "./routes/personalRoutes.js";
import express from "express";
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
app.use("/api/personal", personalRoutes);
