import "./globals.css";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";

export const metadata = {
  title: "Tryyel",
  description: "Shop the latest fashion at Tryyel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex justify-center bg-gray-100 min-h-screen text-gray-900">
        <div className="w-full max-w-md bg-white shadow-md">
          <Navbar />
        <div className="pt-14">{children}</div> {/* space for fixed navbar */}
        <BottomNav />
        </div>
      </body>
    </html>
  );
}
