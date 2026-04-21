import useGoogleSheet from '../hooks/useGoogleSheet'

export default function AllForms() {
    const { formsData, flowchartsData, loading, error } = useGoogleSheet()

    // Pull the feedback form link from the Flowcharts sheet.
    // Add a row with category "feedback-form" in your Flowcharts sheet to set this link.
    const feedbackFormUrl = flowchartsData.find(fc => fc.category === 'feedback-form')?.flowchartLink || '#'

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

    // Deduplicate forms based on title, and skip entries with no title
    const uniqueForms = Array.from(
        new Map(
            formsData
                .filter(item => item.title && item.title.trim() !== '')
                .map(item => [item.title, item])
        ).values()
    )

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            {/* Feedback Form Section */}
            <section className="mb-10 rounded-xl bg-primary/5 border border-primary/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-primary mb-1">Student Feedback Form</h2>
                    <p className="text-sm text-gray-600">
                        We value your feedback! Share your thoughts, concerns, or suggestions about OSDS services.
                    </p>
                </div>
                <a
                    href={feedbackFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-opacity-90 transition-colors"
                >
                    Fill Out Feedback Form →
                </a>
            </section>

            <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">
                All Downloadable Forms
            </h1>


            {uniqueForms.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {uniqueForms.map((form) => (
                        <div key={form.id || form.title} className="bg-white rounded-lg shadow-sm ring-1 ring-gray-200 p-6 hover:shadow-md transition-shadow">
                            <h2 className="text-lg font-bold mb-2 leading-tight text-primary">
                                {form.title}
                            </h2>
                            <p className="text-sm text-gray-500 mb-4 h-12 overflow-hidden">
                                {form.description}
                            </p>
                            <div className="mt-2 flex justify-center">
                                <a
                                    href={form.downloadLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-md bg-secondary px-8 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition-colors w-full sm:w-auto"
                                >
                                    View Form
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">No forms found.</p>
                </div>
            )}
        </div>
    )
}
