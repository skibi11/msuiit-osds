export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <span className="text-xl font-bold text-primary">OSDS Portal</span>
                </div>
                <div className="hidden md:flex space-x-8">
                    <a href="#" className="text-sm font-medium text-text hover:text-primary transition-colors">Home</a>
                    <a href="#" className="text-sm font-medium text-text hover:text-primary transition-colors">Forms</a>
                    <a href="#" className="text-sm font-medium text-text hover:text-primary transition-colors">Policies</a>
                </div>
            </div>
        </nav>
    )
}
