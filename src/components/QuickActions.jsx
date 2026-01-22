const actions = [
    { title: 'In-Campus Activity', description: 'Permits and venue reservations' },
    { title: 'Off-Campus Activity', description: 'Travel orders and risk management' },
    { title: 'Organizations', description: 'Accreditation and renewal' },
    { title: 'Scholarships', description: 'Application and requirements' },
]

export default function QuickActions() {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {actions.map((action) => (
                    <div
                        key={action.title}
                        className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:-translate-y-1 hover:shadow-md"
                    >
                        <h3 className="text-lg font-semibold leading-7 text-primary group-hover:text-secondary transition-colors">
                            {action.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                            {action.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
