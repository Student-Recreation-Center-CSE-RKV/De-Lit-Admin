import ThemeToggleButton from "@/components/ThemeToggleButton";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/AuthContext";
import MyToaster from "@/components/MyToaster";

export const metadata = {
  title: "De-Lit",
  description: "OnlyAdmins",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <MyToaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <ThemeToggleButton />
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
