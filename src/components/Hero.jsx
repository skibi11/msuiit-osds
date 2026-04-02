import { useState } from 'react'
import useGoogleSheet from '../hooks/useGoogleSheet'
// import { formsData } from '../data/formsData'

export default function Hero() {
    const { formsData } = useGoogleSheet()
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const handleSearch = (e) => {
        const term = e.target.value
        setSearchTerm(term)

        if (term.trim() === '') {
            setSearchResults([])
            return
        }

        const results = formsData.filter(form =>
            (form.title || '').toLowerCase().includes(term.toLowerCase()) ||
            (form.description || '').toLowerCase().includes(term.toLowerCase())
        ).slice(0, 4)
        setSearchResults(results)
    }

    return (
        <div className="relative isolate px-6 lg:px-8 z-40">
            {/* Background Image Setup */}
            <div
                className="absolute inset-0 w-full h-full -z-20 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/OSDSbuilding1.jpg')" }}
            />
            {/* Neutral Background Overlay for text readability */}
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
                                        <li key={result.id} className="group relative flex gap-x-6 px-4 py-4 hover:bg-gray-50 cursor-pointer">
                                            <div className="flex-auto">
                                                <h3 className="font-semibold text-gray-900 group-hover:text-primary">
                                                    {result.title}
                                                    <span className="absolute inset-0" />
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-600">{result.description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="px-4 py-6 text-sm text-gray-500 text-center">
                                    Can't find it? Try looking in the <span className="font-medium text-primary cursor-pointer">Programs and Services</span> tab.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
