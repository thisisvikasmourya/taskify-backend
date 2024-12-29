import express from "express"
import userRoutes from "./routes/user.routes.js"
import taskRoutes from "./routes/task.routes.js"
import projectRoutes from "./routes/project.routes.js"

import bodyParser from "body-parser";
import cors from "cors"
import labelRoutes from "./routes/label.routes.js";
import commentRoutes from "./routes/comment.routes.js";
const app = express();

app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});


app.use('/auth', userRoutes)
app.use('/api', taskRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/project', projectRoutes)
app.use('/api/label', labelRoutes)

export { app }
