export default function Hero() {
    return (
        <div className="relative isolate px-6 lg:px-8">
            <div className="mx-auto max-w-2xl pt-24 pb-12 sm:pt-32 sm:pb-16 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl mb-8">
                    How can OSDS help you today?
                </h1>
                <div className="relative mx-auto mt-8 max-w-lg">
                    <input
                        type="text"
                        className="block w-full rounded-full border-0 py-4 pl-6 pr-4 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition-shadow hover:shadow-xl"
                        placeholder="Search forms, essential services, or FAQs..."
                    />
                </div>
            </div>
        </div>
    )
}
