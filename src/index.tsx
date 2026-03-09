import { Router } from "./routes";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "@fontsource/ruda/400.css";
import "@fontsource/ruda/500.css";
import "@fontsource/ruda/600.css";
import "@fontsource/ruda/700.css";
import "@fontsource/ruda/800.css";
import "@fontsource/ruda/900.css";
import "./styles/tailwind.css";

const Root = createRoot(document.getElementById("root") as HTMLDivElement);
Root.render(
  <StrictMode>
    <RouterProvider router={Router} />
  </StrictMode>,
);
