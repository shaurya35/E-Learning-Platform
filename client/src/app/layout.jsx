import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthProvider";
import { ProfileProvider } from "@/contexts/ProfileContext";
import Navbar from "@/components/main/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});


export const metadata = {
  title: "E-Learning",
  description: "Transforming Education with Technology",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${geistSans.variable} ${geistMono.variable} antialiased min-h-screen overflow-x-hidden `}
      >
        <ThemeProvider>
          <AuthProvider>
            <ProfileProvider>
              <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <Navbar /> 
                {children}
              </div>
            </ProfileProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
