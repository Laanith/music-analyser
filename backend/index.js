import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import tsne from './utilities/tsne_results.mjs';


const app = express();
const port = 8000;

// Middleware
app.use(cors()); // Allow all origins
app.use(express.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));

// Routes
app.get("/", (req, res) => {
  res.send("Hi");
});

app.post("/", async (req, res) => {
  let result = await tsne.analyseSongs(req.body);
  result.items = result.items.slice(0,50);
  res.json(result);
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
