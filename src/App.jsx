import Navbar from './components/Navbar'
import Hero from './components/Hero'
import QuickActions from './components/QuickActions'
import FAQSection from './components/FAQSection'

function App() {
    return (
        <div className="min-h-screen bg-background text-text font-sans">
            <Navbar />
            <main>
                <Hero />
                <QuickActions />
                <FAQSection />
            </main>
        </div>
    )
}

export default App
