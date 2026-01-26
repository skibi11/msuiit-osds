import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import AllForms from './pages/AllForms'
import Policies from './pages/Policies'

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-background text-text font-sans">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/forms" element={<AllForms />} />
                    <Route path="/policies" element={<Policies />} />
                    <Route path="/category/:slug" element={<CategoryPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
