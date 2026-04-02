import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useGoogleSheet from '../hooks/useGoogleSheet'

// --- Static searchable sources ---

const faqItems = [
    {
        title: "How many absences are allowed before I get dropped?",
        description: "A student is dropped if absences reach 20% of the scheduled class hours.",
    },
    {
        title: "Are educational tours or field trips mandatory?",
        description: "No. Field trips are optional and cannot be used as a substitute for major examinations.",
    },
    {
        title: "How do I apply for a Leave of Absence (LOA)?",
        description: "You must file a written petition to your Dean. If it is for health reasons, it must be recommended by the University Physician.",
    },
    {
        title: "What is the grade requirement to shift courses?",
        description: "You generally need a GPA of at least 2.0 and must have no disciplinary record.",
    },
]

const serviceItems = [
    { title: 'On-Campus Activity', description: 'Permits and venue reservations', path: '/category/on-campus' },
    { title: 'Off-Campus Activity', description: 'Travel orders and risk management', path: '/category/off-campus' },
    { title: 'Student Organizations', description: 'University Based Organizations', path: '/category/organizations' },
    { title: 'Programs and Services', description: 'Scholarships, assistantships & grants', path: '/category/programs-and-services' },
]

// Badge colours per result type
const typeBadge = {
    form: { label: 'Form', className: 'bg-yellow-100 text-yellow-700' },
    faq: { label: 'FAQs', className: 'bg-blue-100 text-blue-700' },
    service: { label: 'Service', className: 'bg-green-100 text-green-700' },
}

export default function Hero() {
    const { formsData } = useGoogleSheet()
    const navigate = useNavigate()
    const location = useLocation()
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const clearSearch = () => { setSearchTerm(''); setSearchResults([]) }

    const handleSearch = (e) => {
        const term = e.target.value
        setSearchTerm(term)

        if (term.trim() === '') { setSearchResults([]); return }

        const lower = term.toLowerCase()

        // 1. Forms (deduplicated, no blank titles)
        const uniqueForms = Array.from(
            new Map(
                formsData
                    .filter(f => f.title && f.title.trim() !== '')
                    .map(f => [f.title, f])
            ).values()
        )
        const formResults = uniqueForms
            .filter(f =>
                (f.title || '').toLowerCase().includes(lower) ||
                (f.description || '').toLowerCase().includes(lower)
            )
            .slice(0, 3)
            .map(f => ({
                key: 'form-' + f.title,
                type: 'form',
                title: f.title,
                description: f.description,
                href: f.downloadLink,
                external: true,
            }))

        // 2. FAQs (hardcoded)
        const faqResults = faqItems
            .filter(faq =>
                faq.title.toLowerCase().includes(lower) ||
                faq.description.toLowerCase().includes(lower)
            )
            .slice(0, 2)
            .map(faq => ({
                key: 'faq-' + faq.title,
                type: 'faq',
                title: faq.title,
                description: faq.description,
                href: '/#faqs',
                external: false,
            }))

        // 3. Programs & Services (quick actions)
        const serviceResults = serviceItems
            .filter(s =>
                s.title.toLowerCase().includes(lower) ||
                s.description.toLowerCase().includes(lower)
            )
            .slice(0, 2)
            .map(s => ({
                key: 'service-' + s.title,
                type: 'service',
                title: s.title,
                description: s.description,
                href: s.path,
                external: false,
            }))

        // Merge, cap at 6
        setSearchResults([...formResults, ...faqResults, ...serviceResults].slice(0, 6))
    }

    const scrollToFaqs = () => {
        setTimeout(() => {
            const el = document.getElementById('faqs')
            if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 88
                window.scrollTo({ top, behavior: 'smooth' })
            }
        }, 80)
    }

    const handleResultClick = (result) => {
        clearSearch()
        if (result.external) {
            window.open(result.href, '_blank', 'noopener,noreferrer')
        } else if (result.type === 'faq') {
            if (location.pathname === '/') {
                scrollToFaqs()
            } else {
                navigate('/')
                scrollToFaqs()
            }
        } else {
            navigate(result.href)
        }
    }

    return (
        <div className="relative isolate px-6 lg:px-8 z-40">
            {/* Background Image */}
            <div
                className="absolute inset-0 w-full h-full -z-20 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/OSDSbuilding1.jpg')" }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#8a1538]/25 -z-10" />

            <div className="relative mx-auto max-w-2xl pt-24 pb-12 sm:pt-24 sm:pb-20 text-center z-10 w-full">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-8">
                    How can we help you today?
                </h1>
                <div className="relative mx-auto mt-8 max-w-lg z-50">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="block w-full rounded-full border-0 py-4 pl-6 pr-4 bg-white/30 backdrop-blur-sm text-white shadow-lg ring-2 ring-inset ring-white/70 placeholder:text-white/70 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 transition-shadow hover:shadow-xl hover:bg-white/40"
                        placeholder="Search forms, essential services, or FAQs..."
                    />

                    {/* Search Results Dropdown */}
                    {searchTerm && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl ring-1 ring-gray-200 z-[9999] overflow-hidden text-left">
                            {searchResults.length > 0 ? (
                                <ul className="divide-y divide-gray-100">
                                    {searchResults.map((result) => (
                                        <li key={result.key}>
                                            <button
                                                onClick={() => handleResultClick(result)}
                                                className="group w-full flex items-center justify-between gap-x-4 px-4 py-3 hover:bg-gray-50 text-left"
                                            >
                                                <div className="flex-auto min-w-0">
                                                    <div className="flex items-center gap-2 mb-0.5">
                                                        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${typeBadge[result.type].className}`}>
                                                            {typeBadge[result.type].label}
                                                        </span>
                                                        <h3 className="font-semibold text-sm text-gray-900 group-hover:text-primary truncate">
                                                            {result.title}
                                                        </h3>
                                                    </div>
                                                    <p className="text-xs text-gray-500 truncate">{result.description}</p>
                                                </div>
                                                <span className="shrink-0 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {result.external ? 'Open ↗' : 'Go →'}
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="px-4 py-6 text-sm text-gray-500 text-center">
                                    Can't find it? Try looking in the{' '}
                                    <span
                                        className="font-medium text-primary cursor-pointer"
                                        onClick={() => { clearSearch(); navigate('/category/programs-and-services') }}
                                    >
                                        Programs and Services
                                    </span>{' '}
                                    tab.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
