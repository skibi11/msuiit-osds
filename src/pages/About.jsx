import { useState } from 'react'

export default function About() {
    const [activeTab, setActiveTab] = useState('overview')

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'staff', label: 'Staff and Directory' },
        { id: 'structure', label: 'Organizational Structure' },
    ]

    return (
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-12">

            {/* Page Header */}
            <div className="text-center space-y-2 mb-8">
                <h1 className="text-3xl font-extrabold text-[#8a1538] tracking-tight">About OSDS</h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                    Discover the history, mandate, and vision of the Office of Student Development Services.
                </p>

                {/* Tab Navigation */}
                <div className="flex flex-wrap justify-center gap-2 mt-5 border-b border-gray-200 pb-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === tab.id
                                ? 'bg-[#8a1538] text-white shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                    {/* Left Column — Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* History Block */}
                        <div className="bg-white border border-gray-200 border-l-4 border-l-[#8a1538] rounded-2xl shadow-sm p-8">
                            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">Office Overview</h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                The Office of Student Development Services (OSDS) serves as the central hub for student welfare, engagement, and holistic development. It is committed to fostering a supportive, inclusive, and student-centered environment that empowers learners to succeed academically, socially, and personally.
                            </p>
                            <p className="text-gray-700 leading-relaxed text-lg mt-4">
                                OSDS provides a wide range of programs and services designed to enrich the student experience. These include student organization accreditation and support, leadership development programs, student discipline and conduct management, and supervision of student-led activities and events. OSDS also facilitates co-curricular and extracurricular engagement to promote values formation, civic responsibility, and lifelong learning.
                            </p>
                            <p className="text-gray-700 leading-relaxed text-lg mt-4">
                                Through its services, OSDS ensures that students are guided, supported, and equipped to become competent, responsible, and future-ready graduates.
                            </p>
                        </div>

                        {/* Vision & Mandate Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 border-t-4 border-t-yellow-500 hover:shadow-lg transition-shadow">
                                <h2 className="text-2xl font-bold text-[#8a1538] mb-4">Our Vision</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    To provide our students with excellent services and be recognized in the support
                                    of quality, prompt, convenient, and effective channels of communication between
                                    the student body and the administration.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 border-t-4 border-t-[#8a1538] hover:shadow-lg transition-shadow">
                                <h2 className="text-2xl font-bold text-[#8a1538] mb-4">Our Mandate</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    The OSDS exercises general supervision over overall student activities to ensure
                                    holistic development. Our primary concern is to protect and enhance student
                                    welfare by initiating and supervising meaningful programs that supplement
                                    academic training.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column — Director Sidebar */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                        <div className="p-6 text-center">
                            <img
                                src="/images/director.jpg"
                                alt="Assoc. Prof. Phyllis Marie Teanco"
                                className="w-full h-80 object-cover object-top rounded-xl mb-6 border-4 border-white shadow-md ring-1 ring-gray-200"
                            />
                            <h3 className="text-xl font-bold text-[#1a1a1a] leading-tight">
                                Assoc. Prof. Phyllis Marie Teanco
                            </h3>
                            <p className="text-[#8a1538] font-medium mt-1">Director, OSDS</p>

                            <div className="mt-6 pt-6 border-t border-gray-100 text-left text-sm text-gray-600 space-y-2">
                                <h4 className="font-bold text-[#1a1a1a] mb-3">Contact Us</h4>
                                <p>Telephone: +63 221-2179</p>
                                <p>Email: osds@g.msuiit.edu.ph</p>
                            </div>
                        </div>
                    </div>

                </div>
            )}

            {/* Staff and Directory Tab — Team Directory */}
            {activeTab === 'staff' && (
                <div className="space-y-10">
                    {/* Unified Team Introduction card */}
                    <div className="bg-white border border-gray-100 border-l-4 border-l-[#8a1538] rounded-2xl shadow-md p-10 mb-12 flex flex-col md:flex-row items-center gap-10">
                        <div className="flex flex-col text-center md:text-left">
                            <h3 className="text-2xl font-extrabold text-[#8a1538]">Phyllis Marie S. Teanco</h3>
                            <p className="text-gray-500 font-medium tracking-wide uppercase text-sm mt-2">Director, OSDS</p>
                        </div>
                        <div className="hidden md:block w-px h-24 bg-gray-100 flex-shrink-0" aria-hidden="true" />
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Meet the Team</h2>
                            <p className="text-gray-600 leading-relaxed">
                                The OSDS team supports student development through programs, permits, finances, and communications.
                                Get to know the people behind the office who keep student services running smoothly.
                            </p>
                        </div>
                    </div>

                    {/* Administrative Staff — 2-column list with maroon accent bar */}
                    <div>
                        <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Administrative Staff</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { name: 'Al-Musa M. Musa', role: 'Administrative Staff' },
                                { name: 'Elmar B. Albios', role: 'Administrative Assistant' },
                                { name: 'Faruzaima M. Esmail', role: 'Administrative Assistant' },
                                { name: 'Alyha Zshiazny B. Lantud', role: 'Social Media Manager' },
                                { name: 'Jeinalisa L. Bayadog', role: 'Financial Assistant' },
                            ].map((person, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-xl border border-gray-100 shadow-sm border-l-2 border-l-[#8a1538] p-5 pl-6"
                                >
                                    <h3 className="text-gray-900 font-bold text-lg">{person.name}</h3>
                                    <p className="text-[#8a1538] font-medium text-sm mt-1">{person.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'structure' && (
                <div className="max-w-6xl mx-auto py-6 flex flex-col items-center">

                    <div className="w-full flex flex-col items-center">

                        {/* Level 1: Director */}
                        <div className="bg-white border-t-4 border-[#8a1538] shadow-md rounded-xl p-6 w-full max-w-sm text-center z-10 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                            <h3 className="text-xl font-bold text-[#1a1a1a]">OSDS Director</h3>
                            <p className="text-sm text-[#8a1538] font-medium mt-1">(Designation)</p>
                        </div>

                        {/* Vertical drop from Director */}
                        <div className="hidden md:block w-0.5 h-8 bg-gray-300"></div>

                        {/* Horizontal spanning connector with 4 drop lines */}
                        <div className="hidden md:block w-[75%] border-t-2 border-gray-300 relative h-8 mx-auto">
                            <div className="absolute top-0 left-0 w-0.5 h-8 bg-gray-300 -ml-px"></div>
                            <div className="absolute top-0 left-[33.33%] w-0.5 h-8 bg-gray-300 -ml-px"></div>
                            <div className="absolute top-0 left-[66.67%] w-0.5 h-8 bg-gray-300 -ml-px"></div>
                            <div className="absolute top-0 right-0 w-0.5 h-8 bg-gray-300 -mr-px"></div>
                        </div>

                        {/* Level 2: Coordinators & Assistants */}
                        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mt-4 md:mt-0 z-10">
                            {[
                                { title: 'Administrative Assistant VI', role: 'Financial Assistant' },
                                { title: 'Administrative Assistant IV', role: 'Program Coordinator' },
                                { title: 'Administrative Assistant II', role: 'Organizations Coordinator' },
                                { title: 'Administrative Assistant II', role: 'Secretary' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 border-t-4 border-t-yellow-500 shadow-md rounded-xl p-5 text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                                    <h3 className="font-bold text-gray-800 text-sm">{item.title}</h3>
                                    <p className="text-xs text-gray-500 mt-2 bg-gray-50 py-1 px-2 rounded-md inline-block">({item.role})</p>
                                </div>
                            ))}
                        </div>

                        {/* Level 3: Aides */}
                        <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-12">
                            <div className="bg-gray-50 border border-gray-200 border-l-4 border-l-gray-400 shadow-sm rounded-r-xl rounded-l-sm p-5 text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                                <h3 className="font-bold text-gray-700 text-sm">Administrative Aide VI</h3>
                                <p className="text-xs text-gray-500 mt-1">(Clerk III)</p>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 border-l-4 border-l-gray-400 shadow-sm rounded-r-xl rounded-l-sm p-5 text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                                <h3 className="font-bold text-gray-700 text-sm">Administrative Aide IV</h3>
                                <p className="text-xs text-gray-500 mt-1">(Liaison)</p>
                            </div>
                        </div>

                    </div>

                    {/* Narrative — moved to bottom */}
                    <div className="text-center mt-16 max-w-3xl mx-auto border-t border-gray-200 pt-10">
                        <p className="text-gray-600 leading-relaxed text-lg">
                            The Office of Student Development Services (OSDS) is systematically organized to effectively
                            execute its mandate of protecting and enhancing student welfare. This framework ensures
                            dedicated support for financial assistance, program coordination, student organizations,
                            and essential administrative operations.
                        </p>
                    </div>

                </div>
            )}

        </div>
    )
}
