import Preloader from '@/components/Preloader/Preloader'
import Header from '@/components/Header/Header'
import Sidebar from '@/components/Sidebar/Sidebar'
import About from '@/components/About/About'
import Skills from '@/components/Skills/Skills'
import Experience from '@/components/Experience/Experience'
import Portfolio from '@/components/Portfolio/Portfolio'
import Contact from '@/components/Contact/Contact'
import Cursor from '@/components/Cursor/Cursor'

export default function Home() {
  return (
    <>
      <Preloader />
      <Cursor />
      <Header />
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">

          {/* Left — Sidebar */}
          <Sidebar />

          {/* Right — Main content sections */}
          <main className="flex flex-col gap-16">
            <About />
            <Skills />
            <Experience />
            <Portfolio />
            <Contact />
          </main>

        </div>
      </div>
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} JC_Baliling. All rights reserved.
      </footer>
    </>
  )
}
