import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useGoogleSheet from '../hooks/useGoogleSheet'


export default function CategoryPage() {
    const { slug } = useParams()
    const { formsData, flowchartsData, organizationsData, loading, error } = useGoogleSheet()
    const [activeFilter, setActiveFilter] = useState(slug === 'organizations' ? 'Forms' : 'All')
    const [selectedOrg, setSelectedOrg] = useState(null)

    // Lock body scrolling when the modal is open
    useEffect(() => {
        if (selectedOrg) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedOrg]);

    // Format the category name for display (e.g. "in-campus" -> "In-Campus")
    const categoryName = slug === 'organizations'
        ? 'Student Organizations'
        : slug
            ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            : 'Category'

    // Filter forms based on the category slug
    const forms = formsData ? formsData.filter(form => form.category === slug) : []

    // Filter logic for Organizations page
    const filteredForms = forms.filter(form => {
        if (slug !== 'organizations') return true; // No extra filtering for other pages
        return activeFilter === 'Forms';
    });

    const filteredOrganizations = organizationsData ? organizationsData.filter(org => {
        if (slug !== 'organizations') return false;
        if (activeFilter === 'Forms') return false;
        return org.category && org.category.trim() === activeFilter;
    }) : [];

    // Find the flowchart for the current category from the Flowcharts tab
    const flowchart = flowchartsData.find(fc => fc.category === slug && fc.imageSrc)

    const filterOptions = slug === 'organizations'
        ? ["Forms", "Student Publication", "Service & Advocacy", "Religious & Faith-Based", "Academic & Professional", "Sports & Recreation"]
        : ["All", "KASAMA", "Student Councils", "Societies"];

    // Programs and Services is fully static — return immediately, no data needed
    if (slug === 'programs-and-services') {
        return (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">
                    {categoryName}
                </h1>
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
            </div>
        )
    }

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

            {flowchart && flowchart.imageSrc && (
                <img
                    src={flowchart.imageSrc}
                    alt={flowchart.title || 'Flowchart'}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain rounded-xl shadow-sm mb-6"
                />
            )}

            {/* Filter Buttons - Only for Organizations */}
            {slug === 'organizations' && (
                <div className="flex flex-wrap gap-2 mb-6">
                    {filterOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => setActiveFilter(option)}
                            className={`px-3 py-1.5 text-xs md:text-sm font-medium rounded-full transition-colors duration-200 ${activeFilter === option
                                ? 'bg-primary text-white shadow-sm'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}

            {/* Content Rendering based on Active Filter */}
            {slug === 'organizations' && activeFilter !== 'Forms' ? (
                // Organization Cards
                filteredOrganizations.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {filteredOrganizations.map((org) => (
                            <div
                                key={org.id}
                                onClick={() => setSelectedOrg(org)}
                                className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 flex flex-col items-center text-center hover:border-[#8a1538] hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer h-full"
                            >
                                {/* Compact Tile Logo */}
                                <div className="w-20 h-20 bg-gray-50 rounded-xl mb-4 flex items-center justify-center border border-gray-100 shrink-0 overflow-hidden">
                                    {org.imageSrc ? (
                                        <img src={org.imageSrc} alt={org.name} referrerPolicy="no-referrer" className="w-full h-full object-cover mix-blend-multiply" />
                                    ) : (
                                        <span className="text-3xl font-extrabold text-[#8a1538] uppercase">
                                            {org.name ? org.name.charAt(0) : '?'}
                                        </span>
                                    )}
                                </div>

                                {/* Tile Name */}
                                <h2 className="text-sm font-bold leading-tight text-[#8a1538]">
                                    {org.name}
                                </h2>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500 text-lg">No organizations found for this category.</p>
                    </div>
                )
            ) : (
                // Form Cards
                filteredForms.length > 0 ? (
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
                )
            )}

            {/* Modal */}
            {selectedOrg && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedOrg(null)}
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-[#8a1538] p-6 lg:p-8 flex items-center gap-6 relative shrink-0">
                            <button
                                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                                onClick={() => setSelectedOrg(null)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white rounded-xl p-1 shrink-0 flex items-center justify-center shadow-inner border-2 border-yellow-500 overflow-hidden">
                                {selectedOrg.imageSrc ? (
                                    <img src={selectedOrg.imageSrc} alt={selectedOrg.name} referrerPolicy="no-referrer" className="w-full h-full object-cover drop-shadow-sm scale-105" />
                                ) : (
                                    <span className="text-4xl lg:text-5xl font-extrabold text-[#8a1538] uppercase">
                                        {selectedOrg.name ? selectedOrg.name.charAt(0) : '?'}
                                    </span>
                                )}
                            </div>
                            <div className="text-white">
                                <span className="bg-yellow-500 text-white text-[10px] lg:text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-sm mb-2 inline-block shadow-sm">
                                    {selectedOrg.category || 'Organization'}
                                </span>
                                <h2 className="text-xl lg:text-3xl font-extrabold leading-tight">
                                    {selectedOrg.name}
                                </h2>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6 lg:p-8 overflow-y-auto bg-gray-50/50">
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-yellow-500 inline-block pb-1">About the Organization</h3>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {selectedOrg.description || 'No description provided.'}
                                </p>
                            </div>

                            {/* Footer Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                {selectedOrg.adviser && (
                                    <div>
                                        <h4 className="text-xs font-bold uppercase text-gray-400 mb-1 tracking-wider">Adviser</h4>
                                        <p className="font-semibold text-gray-900">{selectedOrg.adviser}</p>
                                    </div>
                                )}
                                {selectedOrg.president && (
                                    <div>
                                        <h4 className="text-xs font-bold uppercase text-gray-400 mb-1 tracking-wider">President/Chair</h4>
                                        <p className="font-semibold text-gray-900">{selectedOrg.president}</p>
                                    </div>
                                )}
                                {selectedOrg.contact && (
                                    <div className="sm:col-span-2">
                                        <h4 className="text-xs font-bold uppercase text-gray-400 mb-1 tracking-wider">Contact</h4>
                                        <a href={`mailto:${selectedOrg.contact}`} className="font-semibold text-[#8a1538] hover:underline break-words transition-all">
                                            {selectedOrg.contact}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
