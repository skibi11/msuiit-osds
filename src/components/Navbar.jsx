import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm h-20 flex items-center">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link to="/" className="flex items-center">
                    <img src="/images/msuiit-logo-275x280.png" alt="MSU-IIT OSDS Logo" className="h-14 w-auto" />
                    <div className="h-10 w-0.5 bg-gray-200 mx-4 hidden md:block"></div>
                    <span className="ml-3 md:ml-0 text-sm md:text-xl lg:text-2xl font-extrabold tracking-tight leading-tight text-primary">
                        Office of Student Development Services
                    </span>
                </Link>
                <div className="hidden md:flex space-x-8">
                    <Link to="/" className="text-sm font-medium text-text hover:text-primary transition-colors">Home</Link>
                    <Link to="/about" className="text-sm font-medium text-text hover:text-primary transition-colors">About</Link>
                    <Link to="/forms" className="text-sm font-medium text-text hover:text-primary transition-colors">Forms</Link>
                    <a href="https://drive.google.com/file/d/1oeuGMLASUSyMWneUhbyFj_It8lfF3NcF/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-text hover:text-primary transition-colors">Handbook</a>
                </div>
            </div>
        </nav>
    )
}
