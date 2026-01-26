
import { useParams } from 'react-router-dom'
import { formsData } from '../data/formsData'

export default function CategoryPage() {
    const { slug } = useParams()

    // Filter forms based on the category slug
    const forms = formsData.filter(form => form.category === slug)

    // Format the category name for display (e.g. "in-campus" -> "In-Campus")
    const categoryName = slug
        ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : 'Category'

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">
                {categoryName}
            </h1>

            {forms.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {forms.map((form) => (
                        <div key={form.id} className="bg-white rounded-lg shadow-sm ring-1 ring-gray-200 p-6 hover:shadow-md transition-shadow">
                            <h2 className="text-xl font-semibold text-primary mb-2">
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
