

import connectDB from "../db/index.js";
import {app} from "./app.js";
connectDB().then(() => {
  app.listen("3000", () => {
    console.log("server is running ");
  });
  app.on("error",()=>{
    console.log("server is not running");
  });
}).catch((error)=>{
  console.log("mongoose not connected ",error)
})
