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

            {/* Static Programs and Services UI */}
            {slug === 'programs-and-services' ? (
                <div className="max-w-4xl mx-auto space-y-12 pb-12 pt-6">

                    {/* Section 1: Scholarship Programs */}
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4 border-b border-gray-200 pb-2">
                            Scholarship Programs
                        </h2>
                        <div className="text-gray-700 space-y-4 leading-relaxed">
                            <p>
                                The OSDS is committed to ensuring equitable access to education through various scholarship programs and financial assistance. These programs are designed to provide essential support to deserving students across the Institute, subject to specific academic requirements such as maintaining a passing grade in all subjects or meeting a designated GPA threshold.
                            </p>
                            <div className="mt-6 overflow-x-auto border border-gray-200 rounded-lg">
                                <table className="min-w-full text-sm text-left text-gray-700">
                                    <thead className="bg-amber-50 text-xs uppercase tracking-wider">
                                        <tr>
                                            <th className="px-4 py-3 font-semibold text-primary">Form of Scholarship / Grant</th>
                                            <th className="px-4 py-3 font-semibold text-primary">GPA Range</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {[
                                            ['Special Grant — Dance', '2.75 or better'],
                                            ['Special Grant — Theater', '2.75 or better'],
                                            ['Special Grant — Choral', '2.75 or better'],
                                            ['Special Grant — Band', '2.75 or better'],
                                            ['Student Assistantship', 'Passing in all subjects'],
                                            ['Office Assistantship', 'Passing in all subjects'],
                                            ['Teaching Assistantship', 'Passing in all subjects'],
                                        ].map(([program, gpa], i) => (
                                            <tr key={program} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="px-4 py-3">{program}</td>
                                                <td className="px-4 py-3 font-medium text-gray-900">{gpa}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Student Assistantship */}
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4 border-b border-gray-200 pb-2">
                            Student Assistantship
                        </h2>
                        <div className="text-gray-700 space-y-4 leading-relaxed">
                            <p>
                                This program provides student employment opportunities, allowing poor but deserving students to earn their way through college and finish a degree by rendering service to the Institute.
                            </p>
                            <ul className="list-disc pl-5 space-y-1 mt-2">
                                <li><strong>Compensation:</strong> Allowed to work a maximum of 120 hours per month at a rate of ₱30.00 per hour (maximum of ₱3,600/month).</li>
                                <li><strong>Requirements:</strong> Must carry a minimum academic load of twelve (12) units, have no failing grades in the immediately preceding semester, and have no record of misconduct.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 3: Office Assistantship */}
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4 border-b border-gray-200 pb-2">
                            Office Assistantship
                        </h2>
                        <div className="text-gray-700 space-y-4 leading-relaxed">
                            <p>
                                Operating under the student employment mandate, this program provides specialized administrative and office support across various colleges and units. It is specifically designed for junior or graduating students who possess specific technical skills, such as computer operation.
                            </p>
                            <ul className="list-disc pl-5 space-y-1 mt-2">
                                <li><strong>Requirements:</strong> Must carry a minimum academic load of twelve (12) units, have no failing grades, and have no record of misconduct.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 4: Teaching Assistantship */}
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4 border-b border-gray-200 pb-2">
                            Teaching Assistantship
                        </h2>
                        <div className="text-gray-700 space-y-4 leading-relaxed">
                            <p>
                                This program allows qualified junior or graduating students to assist instructors and professors in managing large classes. Duties typically include checking attendance, recording scores, and proctoring examinations.
                            </p>
                            <ul className="list-disc pl-5 space-y-1 mt-2">
                                <li><strong>Compensation:</strong> Compensated at ₱30.00 per hour, not exceeding 120 hours per month.</li>
                                <li><strong>Requirements:</strong> Must pass all subjects to maintain the grant and remain in good academic standing.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 5: Special Grants */}
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4 border-b border-gray-200 pb-2">
                            Special Grants
                        </h2>
                        <div className="text-gray-700 space-y-4 leading-relaxed">
                            <p>
                                The office provides financial assistance, training, and competition support to resident cultural groups and special grantees. Supported organizations include the Bugle Band, Echoes Band, MSU-IIT Debate Varsity, Integrated Performing Arts Guild (IPAG), Kalilang Traditional Music Ensemble, KALIMULAN, OCTAVA Choral Society, and Varsity Athletes.
                            </p>
                            <ul className="list-disc pl-5 space-y-1 mt-2">
                                <li><strong>Benefits:</strong> Grantees receive a monthly allowance of ₱500.00 and are exempted from the payment of upgraded tuition, retail laboratory, and special laboratory fees.</li>
                                <li><strong>Requirements:</strong> Must maintain a minimum academic load of twelve (12) units and a GPA of 2.75 or better.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 6: On Student Publication */}
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4 border-b border-gray-200 pb-2">
                            On Student Publication
                        </h2>
                        <div className="text-gray-700 space-y-4 leading-relaxed">
                            <p>
                                The OSDS formally supervises and assists the Official Student Publication, <em>Silahis</em>. Administrative support includes the preparation of the publication's Work and Financial Plan, Project Procurement Management Plan, and necessary travel documents to ensure their continued operation and successful press releases.
                            </p>
                        </div>
                    </section>

                </div>


            ) : filteredForms.length > 0 ? (
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
