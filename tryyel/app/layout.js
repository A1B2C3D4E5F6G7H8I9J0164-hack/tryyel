import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Tryyel",
  description: "Shop the latest fashion at Tryyel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Navbar />
        <div className="pt-14">{children}</div> {/* space for fixed navbar */}
      </body>
    </html>
  );
}
