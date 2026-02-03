const actions = [
    { title: 'On-Campus Activity', description: 'Permits and venue reservations', path: '/category/on-campus' },
    { title: 'Off-Campus Activity', description: 'Travel orders and risk management', path: '/category/off-campus' },
    { title: 'Organizations', description: 'Accreditation and renewal', path: '/category/organizations' },
    { title: 'Scholarships', description: 'Application and requirements', path: '/category/scholarships' },
]

import { Link } from 'react-router-dom'

export default function QuickActions() {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {actions.map((action) => (
                    <Link
                        key={action.title}
                        to={action.path}
                        className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:-translate-y-1 hover:shadow-md block"
                    >
                        <h3 className="text-lg font-semibold leading-7 text-primary group-hover:text-secondary transition-colors">
                            {action.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                            {action.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}
