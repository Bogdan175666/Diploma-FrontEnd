
import "./globals.css";

export const metadata = {
  title: "HelpMe",
  description: "HelpMe is a solution for helping people to get their work done",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
