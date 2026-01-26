import { useState } from 'react'
import useGoogleSheet from '../hooks/useGoogleSheet'
// import { formsData } from '../data/formsData'

export default function Hero() {
    const { data: formsData } = useGoogleSheet('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6690GqobcQRr7x9wGxxA0HQEbDwtx83so1LkbZzgYJ8sVIeRuEHK3beBkM5d4vweBC4MePCH6U_X9/pub?gid=0&single=true&output=csv')
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const handleSearch = (e) => {
        const term = e.target.value
        setSearchTerm(term)

        if (term.trim() === '') {
            setSearchResults([])
            return
        }

        const results = formsData ? formsData.filter(form =>
            form.title.toLowerCase().includes(term.toLowerCase()) ||
            form.keywords.split(',').some(keyword => keyword.trim().toLowerCase().includes(term.toLowerCase()))
        ) : []
        setSearchResults(results)
    }

    return (
        <div className="relative isolate px-6 lg:px-8 z-40">
            <div className="mx-auto max-w-2xl pt-24 pb-12 sm:pt-32 sm:pb-16 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl mb-8">
                    How can OSDS help you today?
                </h1>
                <div className="relative mx-auto mt-8 max-w-lg z-50">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="block w-full rounded-full border-0 py-4 pl-6 pr-4 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition-shadow hover:shadow-xl"
                        placeholder="Search forms, essential services, or FAQs..."
                    />

                    {/* Search Results Dropdown */}
                    {searchTerm && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl ring-1 ring-gray-200 z-50 overflow-hidden text-left">
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
                                    Can't find it? Try looking in the <span className="font-medium text-primary cursor-pointer">Scholarships</span> tab.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
