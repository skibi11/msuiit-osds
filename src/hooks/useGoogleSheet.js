import { useState, useEffect } from 'react'
import Papa from 'papaparse'

const BASE_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6690GqobcQRr7x9wGxxA0HQEbDwtx83so1LkbZzgYJ8sVIeRuEHK3beBkM5d4vweBC4MePCH6U_X9/pub'

const TAB_URLS = {
    forms: `${BASE_URL}?gid=0&single=true&output=csv`,
    flowcharts: `${BASE_URL}?gid=390124480&single=true&output=csv`,
    socials: `${BASE_URL}?gid=1742116035&single=true&output=csv`,
}

function parseCsv(url) {
    return new Promise((resolve, reject) => {
        Papa.parse(url, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: (results) => resolve(results.data),
            error: (err) => reject(err),
        })
    })
}

// Convert a Google Drive share/view URL to a reliable thumbnail image URL
function driveToDirectLink(url) {
    if (!url) return ''
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
    return match ? `https://drive.google.com/thumbnail?id=${match[1]}&sz=w16383` : url
}

export default function useGoogleSheet() {
    const [formsData, setFormsData] = useState([])
    const [socialsData, setSocialsData] = useState([])
    const [flowchartsData, setFlowchartsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        Promise.all([
            parseCsv(TAB_URLS.forms),
            parseCsv(TAB_URLS.socials),
            parseCsv(TAB_URLS.flowcharts),
        ])
            .then(([rawForms, rawSocials, rawFlowcharts]) => {
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
                        imageSrc: driveToDirectLink(row['flowchartLink'] || ''),
                    }))
                )

                setLoading(false)
            })
            .catch(err => {
                setError(err)
                setLoading(false)
            })
    }, [])

    return { formsData, socialsData, flowchartsData, loading, error }
}
