import useGoogleSheet from '../hooks/useGoogleSheet'

const councilLogos = {
    CCS: '/images/ccs-sc.jpg',
    CASS: '/images/cass-sc.jpg',
    CEBA: '/images/ceba-sc.jpg',
    CED: '/images/ced-sc.jpg',
    CHS: '/images/chs-sc.jpg',
    CON: '/images/chs-sc.jpg',
    COE: '/images/coe-sc.jpg',
    CSM: '/images/csm-sc.jpg',
    KASAMA: '/images/kasama.jpg',
}

export default function Footer() {
    const { socialsData, loading } = useGoogleSheet()

    // Filter only college council entries for the footer
    const collegeCouncils = socialsData.filter(item => item.category === 'footer_social')

    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {/* Column 1: Institute Info */}
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <img src="/images/msuiit-logo-275x280.png" alt="MSU-IIT Logo" className="h-12 w-auto" />
                            <div>
                                <h3 className="font-bold text-gray-900 text-base">MSU-IIT</h3>
                                <p className="text-sm text-gray-500">Office of Student Development &amp; Services</p>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Committed to providing student-centered services and development opportunities.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-3 text-base">Quick Links</h4>
                        <ul className="grid grid-cols-[auto_auto] gap-x-5 gap-y-2 w-fit text-sm text-gray-600">
                            <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                            <li><a href="/about" className="hover:text-primary transition-colors">About</a></li>
                            <li><a href="/forms" className="hover:text-primary transition-colors">Forms</a></li>
                            <li>
                                <a href="https://drive.google.com/file/d/1oeuGMLASUSyMWneUhbyFj_It8lfF3NcF/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                    Handbook
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/MSUIITPHOSDS" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                    OSDS Facebook Page
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: College Councils (Dynamic) */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-3 text-base">College Councils</h4>
                        {loading ? (
                            <p className="text-sm text-gray-400">Loading...</p>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-1 gap-y-0.25">
                                {collegeCouncils.map(item => (
                                    <a
                                        key={item.id || item.code}
                                        href={item.fbUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 py-2 text-gray-600 hover:text-primary transition-colors group"
                                        title={item.fullName}
                                    >
                                        <img
                                            src={councilLogos[item.code]}
                                            alt={item.code}
                                            className="w-7 h-7 object-contain rounded-full"
                                        />
                                        <span className="text-sm font-medium group-hover:underline">{item.code}</span>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-6 pt-4 text-center text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} MSU-IIT Office of Student Development &amp; Services. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
