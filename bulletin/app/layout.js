import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { authOptions } from "@/pages/api/auth/[...nextauth].js"
import { getServerSession } from "next-auth"
import LoginBtn from "./LoginBtn.js";
import LogoutBtn from "./LogoutBtn.js";
import RegisterBtn from "./RegisterBtn";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {

  let session = await getServerSession(authOptions);

  if (session) {
    console.log(session);
  }

  return (
    <html lang="en">
      <body>
        <div className="navbar"> 
          <Link href="/" className="logo">Appleforum</Link> 
          <Link href="/list">List</Link> 

          {session == null ?  
            <LoginBtn/> : <LogoutBtn/>}
          <RegisterBtn/>
        </div>  
        {children}
      </body>
    </html>
  );
}
