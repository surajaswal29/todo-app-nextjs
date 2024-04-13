import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "@/styles/globals.css"
import TaskDataProvider from "@/context/TaskDataContext"

const roboto = Roboto({
  subsets: ["cyrillic"],
  weight: ["100", "400", "500", "700", "900"],
})

export const metadata: Metadata = {
  title: "Weather Forecast App",
  description: "Infinite Scroll Weather Forecast App",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className={`bg-slate-100 ${roboto.className}`}>
        <TaskDataProvider>
          {children}
        </TaskDataProvider>
      </body>
    </html>
  )
}
