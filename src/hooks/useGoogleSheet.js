import { useState, useEffect } from 'react'
import Papa from 'papaparse'

const BASE_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6690GqobcQRr7x9wGxxA0HQEbDwtx83so1LkbZzgYJ8sVIeRuEHK3beBkM5d4vweBC4MePCH6U_X9/pub'

const TAB_URLS = {
    forms: `${BASE_URL}?gid=0&single=true&output=csv`,
    flowcharts: `${BASE_URL}?gid=390124480&single=true&output=csv`,
    socials: `${BASE_URL}?gid=1742116035&single=true&output=csv`,
    organizations: `${BASE_URL}?gid=1534935566&single=true&output=csv`,
}

function parseCsv(url) {
    return new Promise((resolve, reject) => {
        Papa.parse(url, {
            download: true,
            header: true,
            transformHeader: (h) => h.trim(), // This removes accidental spaces in "Description "
            skipEmptyLines: true,
            complete: (results) => resolve(results.data),
            error: (err) => reject(err),
        })
    })
}

// Convert a Google Drive share/view URL to a reliable binary image URL
function getDirectDriveLink(url) {
    if (!url || typeof url !== 'string') return '';
    // Extract the Google Drive file ID
    const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
    const id = idMatch ? idMatch[1] : '';

    // If it's a valid ID, use the thumbnail endpoint (uc?export=view is blocked by Google Drive CORS policies on modern browsers)
    if (id) {
        return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
    }

    // If it's just a raw direct image link (imgur, etc)
    if (url.startsWith('http')) {
        return url;
    }

    // Return empty so the frontend fallback (the first letter) correctly triggers
    return '';
}

export default function useGoogleSheet() {
    const [formsData, setFormsData] = useState([])
    const [socialsData, setSocialsData] = useState([])
    const [flowchartsData, setFlowchartsData] = useState([])
    const [organizationsData, setOrganizationsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        Promise.all([
            parseCsv(TAB_URLS.forms),
            parseCsv(TAB_URLS.socials),
            parseCsv(TAB_URLS.flowcharts),
            parseCsv(TAB_URLS.organizations).catch(() => []), // Catch individual error if GID is invalid
        ])
            .then(([rawForms, rawSocials, rawFlowcharts, rawOrganizations]) => {
                // Map: Forms — (id, title, category, college, description, downloadLink)
                setFormsData(
                    rawForms.map(row => ({
                        id: row['id'] || '',
                        title: row['title'] || '',
                        category: row['category'] || '',
                        college: row['college'] || '',
                        description: row['description'] || '',
                        downloadLink: row['downloadLink'] || '',
                    }))
                )

                // Map: Socials — (id, code←title, category, fullName←description, fbUrl←link)
                setSocialsData(
                    rawSocials.map(row => ({
                        id: row['id'] || '',
                        code: row['title'] || '',
                        category: row['category'] || '',
                        fullName: row['description'] || '',
                        fbUrl: row['link'] || '',
                    }))
                )

                // Map: Flowcharts — (id, title, category, description, flowchartLink, imageSrc)
                setFlowchartsData(
                    rawFlowcharts.map(row => ({
                        id: row['id'] || '',
                        title: row['title'] || '',
                        category: row['category'] || '',
                        description: row['description'] || '',
                        flowchartLink: row['flowchartLink'] || '',
                        imageSrc: getDirectDriveLink(row['flowchartLink'] || ''),
                    }))
                )

                // Map: Organizations
                setOrganizationsData(
                    (rawOrganizations || []).map((row, index) => ({
                        id: index,
                        name: row['O&P Name'] || '',
                        category: row['Category'] || '',
                        // REVISION: Wrap the logo in the transformation function
                        officialLogo: row['Official Logo'] || '',
                        imageSrc: getDirectDriveLink(row['Official Logo'] || ''),
                        adviser: row['Adviser'] || '',
                        president: row['President/Chair'] || '',
                        // Ensure this matches the header 'Description' in your CSV exactly
                        description: row['Description'] || '',
                        contact: row['Email/Contact Number'] || '',
                    }))
                )

                setLoading(false)
            })
            .catch(err => {
                setError(err)
                setLoading(false)
            })
    }, [])

    return { formsData, socialsData, flowchartsData, organizationsData, loading, error }
}
