// main.js

import { Routing } from "../src/index.js"
import Joinning from "./pages/Joinning.js"
import Waitting from "./pages/Waitting.js";

const routes = {
  // "/": Counter,
  // "/about": About,
  "/waiting": Waitting,
  "/joining": Joinning,
}

const root = document.getElementById("root")

Routing(root, routes)
