import "./globals.css";
import { DM_Sans, Noto_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const notoSansHeading = Noto_Sans({ subsets: ['latin'], variable: '--font-heading' });

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", "font-sans", dmSans.variable, notoSansHeading.variable)}>
      <body className="min-h-full flex flex-col">
        {/* <Navbar /> */}
        <Toaster position="top-right" richColors />
        {children}
      </body>
    </html>
  );
}