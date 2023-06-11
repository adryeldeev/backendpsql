import express from 'express'
import cors from 'cors'

import { router } from "./routes.js";

    
const app = express();
const port = process.env.PORT || 8081

app.use(express.json())
app.use(cors())
app.use(router)




app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
