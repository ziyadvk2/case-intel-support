import { TicketProvider } from './context/TicketContext';
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <TicketProvider>{children}</TicketProvider>
      </body>
    </html>
  );
}
