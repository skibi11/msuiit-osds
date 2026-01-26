import Hero from '../components/Hero'
import QuickActions from '../components/QuickActions'
import FAQSection from '../components/FAQSection'

export default function Home() {
    return (
        <main>
            <Hero />
            <QuickActions />
            <div className="mt-12">
                <FAQSection />
            </div>
        </main>
    )
}
