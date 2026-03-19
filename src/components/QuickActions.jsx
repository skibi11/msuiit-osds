const actions = [
    { title: 'On-Campus Activity', description: 'Permits and venue reservations', path: '/category/on-campus' },
    { title: 'Off-Campus Activity', description: 'Travel orders and risk management', path: '/category/off-campus' },
    { title: 'Student Organizations', description: 'University Based Organizations', path: '/category/organizations' },
    { title: 'Programs and Services', description: 'Scholarships, assistantships & grants', path: '/category/programs-and-services' },
]

import { Link } from 'react-router-dom'

export default function QuickActions() {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
                {actions.map((action) => (
                    <Link
                        key={action.title}
                        to={action.path}
                        className="group bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-center h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                        <h3 className="text-lg font-bold text-[#8a1538] transition-colors duration-300 group-hover:text-[#fdb813] mb-1">
                            {action.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {action.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}
