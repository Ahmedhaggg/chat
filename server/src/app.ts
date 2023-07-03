import app from "./index"
import { PORT } from "./config/index"


app.listen(PORT, () => console.log("server is running"))