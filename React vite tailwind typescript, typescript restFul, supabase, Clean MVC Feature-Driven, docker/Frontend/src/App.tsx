import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ThemeProvider } from "./shared/providers/theme-provider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
