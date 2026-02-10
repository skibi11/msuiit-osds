import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useGoogleSheet from '../hooks/useGoogleSheet'
// import { formsData } from '../data/formsData'

// Helper to convert Google Drive share link to direct image link
const getDirectImageLink = (url) => {
    if (!url) return null;

    // 1. Try to find the ID (matches both /d/ID and id=ID formats)
    const idMatch = url.match(/\/d\/(.+?)(\/|$)/) || url.match(/id=(.+?)($|&)/);

    if (idMatch && idMatch[1]) {
        // 2. Return the Thumbnail URL (sz=w1000 requests a high-res width of 1000px)
        return `https://drive.google.com/thumbnail?sz=w1000&id=${idMatch[1]}`;
    }

    return url; // Fallback
};

export default function CategoryPage() {
    const { slug } = useParams()
    const { data: formsData, loading, error } = useGoogleSheet('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6690GqobcQRr7x9wGxxA0HQEbDwtx83so1LkbZzgYJ8sVIeRuEHK3beBkM5d4vweBC4MePCH6U_X9/pub?gid=0&single=true&output=csv')
    const [activeFilter, setActiveFilter] = useState("All")

    // Format the category name for display (e.g. "in-campus" -> "In-Campus")
    const categoryName = slug
        ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : 'Category'

    // Filter forms based on the category slug
    const forms = formsData ? formsData.filter(form => form.category === slug && form.category !== 'footer_social') : []

    // Filter logic for Organizations page
    const filteredForms = forms.filter(form => {
        if (slug !== 'organizations') return true; // No extra filtering for other pages

        // Always show global forms (college === 'all')
        if (form.college && form.college.toLowerCase() === 'all') return true;

        if (activeFilter === "All") return true;

        const college = form.college ? form.college.toLowerCase() : '';

        // Map button labels to data values
        if (activeFilter === "KASAMA") return college === 'kasama';
        if (activeFilter === "Student Councils") return college === 'student_council';
        if (activeFilter === "Societies") return college === 'societies'; // Assuming 'societies' is the tag

        return true;
    });

    // Find the first form with a flowchart link in this category
    const flowchartUrl = forms.find(form => form.flowchart_link)?.flowchart_link
    console.log("Processing Flowchart URL:", flowchartUrl)
    const directFlowchartUrl = getDirectImageLink(flowchartUrl)

    const filterOptions = ["All", "KASAMA", "Student Councils", "Societies"];

    if (loading) {
        return (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-center">
                <p className="text-gray-500 text-xl">Loading forms...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-center">
                <p className="text-red-500 text-xl">Error: {error.message || 'Failed to load forms'}</p>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">
                {categoryName}
            </h1>

            {directFlowchartUrl && (
                <img
                    src={directFlowchartUrl}
                    alt={`${categoryName} Flowchart`}
                    className="w-full max-w-4xl mx-auto mb-8 rounded shadow-lg border border-gray-200"
                />
            )}

            {/* Filter Buttons - Only for Organizations */}
            {slug === 'organizations' && (
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                    {filterOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => setActiveFilter(option)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${activeFilter === option
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}

            {filteredForms.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredForms.map((form) => (
                        <div key={form.id} className="bg-white rounded-lg shadow-sm ring-1 ring-gray-200 p-6 hover:shadow-md transition-shadow">
                            <h2 className="text-lg font-bold mb-2 leading-tight text-primary">
                                {form.title}
                            </h2>
                            <p className="text-sm text-gray-500 mb-4 h-12 overflow-hidden">
                                {form.description}
                            </p>
                            <a
                                href={form.downloadLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition-colors w-full sm:w-auto"
                            >
                                View Form
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">No forms found for this category.</p>
                </div>
            )}
        </div>
    )
}
