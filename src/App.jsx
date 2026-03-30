import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import AllForms from './pages/AllForms'
import About from './pages/About'
import Policies from './pages/Policies'
import Footer from './components/Footer'

import ScrollToTop from './components/ScrollToTop'

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <div className="min-h-screen bg-background text-text font-sans">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/forms" element={<AllForms />} />
                    <Route path="/policies" element={<Policies />} />
                    <Route path="/category/:slug" element={<CategoryPage />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App
