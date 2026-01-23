export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm h-20 flex items-center">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <img src="/images/msuiit-logo-275x280.png" alt="MSU-IIT OSDS Logo" className="h-14 w-auto" />
                    <div className="h-10 w-0.5 bg-gray-200 mx-4 hidden md:block"></div>
                    <span className="ml-3 md:ml-0 text-sm md:text-xl lg:text-2xl font-extrabold tracking-tight leading-tight text-primary">
                        Office of Student Development Services
                    </span>
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
