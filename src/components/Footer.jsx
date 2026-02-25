import useGoogleSheet from '../hooks/useGoogleSheet'

// Helper to map titles to local image paths
const getSocialImage = (title) => {
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    const imageMap = {
        'ccs': '/images/ccs-sc.jpg',
        'cass': '/images/cass-sc.jpg',
        'ceba': '/images/ceba-sc.jpg',
        'ced': '/images/ced-sc.jpg',
        'chs': '/images/chs-sc.jpg',
        'con': '/images/chs-sc.jpg', // Map CON to CHS image
        'coe': '/images/coe-sc.jpg',
        'csm': '/images/csm-sc.jpg',
        'kasama': '/images/kasama.jpg',
        // Add more mappings as needed based on the actual titles in the sheet
    };

    // Default fallback or specific logic if needed
    return imageMap[slug] || null;
}

export default function Footer() {
    const { data, loading, error } = useGoogleSheet('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6690GqobcQRr7x9wGxxA0HQEbDwtx83so1LkbZzgYJ8sVIeRuEHK3beBkM5d4vweBC4MePCH6U_X9/pub?gid=0&single=true&output=csv')

    // Filter for footer social links
    const socialLinks = data ? data.filter(item => item.category === 'footer_social') : []

    if (loading || error || socialLinks.length === 0) {
        return null; // Or return a simple footer without dynamic links
    }

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
                                <p className="text-sm text-gray-500">Office of Student Development & Services</p>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Committed to providing student-centered services and development opportunities.
                        </p>
                    </div>

                    {/* Column 2: Quick Links or Contact */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-3 text-base">Quick Links</h4>
                        <ul className="grid grid-cols-[auto_auto] gap-x-5 gap-y-2 w-fit text-sm text-gray-600">
                            <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                            <li><a href="/about" className="hover:text-primary transition-colors">About</a></li>
                            <li><a href="/forms" className="hover:text-primary transition-colors">Forms</a></li>
                            <li><a href="/policies" className="hover:text-primary transition-colors">Policies</a></li>
                            <li><a href="https://www.facebook.com/MSUIITPHOSDS" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">OSDS Facebook Page</a></li>
                        </ul>
                    </div>

                    {/* Column 3: College Councils (Dynamic) */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-3 text-base">College Councils</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-3">
                            {socialLinks.map((item, index) => {
                                const imagePath = getSocialImage(item.title);
                                const displayTitle = item.title.toLowerCase() === 'con' ? 'CHS' : item.title;

                                return (
                                    <a
                                        key={index}
                                        href={item.downloadLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
                                        title={item.title}
                                    >
                                        {imagePath ? (
                                            <img
                                                src={imagePath}
                                                alt={item.title}
                                                className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 border border-gray-200">
                                                {item.title.substring(0, 2)}
                                            </div>
                                        )}
                                        <span className="text-sm text-gray-600 group-hover:underline group-hover:text-primary transition-colors">
                                            {displayTitle}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-6 pt-4 text-center text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} MSU-IIT Office of Student Development & Services. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
