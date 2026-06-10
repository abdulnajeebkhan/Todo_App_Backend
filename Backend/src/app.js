import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const notes = []

app.post("/", (req, res) => {
    notes.push(req.body)
    
    res.json({
        success: true,
        data: notes
    });
});


export default app