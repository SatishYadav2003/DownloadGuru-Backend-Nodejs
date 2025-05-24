const express = require("express");
const cors = require("cors");

const downloadRoutes = require("./routes/downloadRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", downloadRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend proxy listening on port ${PORT}`);
});
