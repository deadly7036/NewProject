

import connectDB from "../db/index.js";
import {app} from "./app.js";
connectDB().then(() => {
  app.on("error",()=>{
    console.log("server is not running");
  });
  app.listen("3000", () => {
    console.log("server is running ");
  });
}).catch((error)=>{
  console.log("mongoose not connected ",error)
})
