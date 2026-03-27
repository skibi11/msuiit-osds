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

const CACHE_KEY = 'osds_portal_sheet_data';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

let memoryCache = null;
let globalFetchPromise = null;

export default function useGoogleSheet() {
    // 1. Synchronous initial cache check
    let initialData = null;

    if (memoryCache) {
        initialData = memoryCache;
    } else if (typeof window !== 'undefined') {
        try {
            const sessionDataString = sessionStorage.getItem(CACHE_KEY);
            if (sessionDataString) {
                const sessionData = JSON.parse(sessionDataString);
                // Check if the cache is still valid
                if (Date.now() - sessionData.timestamp < CACHE_EXPIRY) {
                    memoryCache = sessionData.data;
                    initialData = sessionData.data;
                }
            }
        } catch (err) {
            console.warn('Failed to parse session storage cache', err);
        }
    }

    const [formsData, setFormsData] = useState(initialData ? initialData.formsData : [])
    const [socialsData, setSocialsData] = useState(initialData ? initialData.socialsData : [])
    const [flowchartsData, setFlowchartsData] = useState(initialData ? initialData.flowchartsData : [])
    const [organizationsData, setOrganizationsData] = useState(initialData ? initialData.organizationsData : [])
    const [loading, setLoading] = useState(!initialData)
    const [error, setError] = useState(null)

    useEffect(() => {
        // If we already have data synchronously, skip fetch
        if (initialData) return;

        // If no fetch is currently happening, start one
        if (!globalFetchPromise) {
            globalFetchPromise = Promise.all([
                parseCsv(TAB_URLS.forms),
                parseCsv(TAB_URLS.socials),
                parseCsv(TAB_URLS.flowcharts),
                parseCsv(TAB_URLS.organizations).catch(() => []), // Catch individual error if GID is invalid
            ]).then(([rawForms, rawSocials, rawFlowcharts, rawOrganizations]) => {
                const data = {
                    formsData: rawForms.map(row => ({
                        id: row['id'] || '',
                        title: row['title'] || '',
                        category: row['category'] || '',
                        college: row['college'] || '',
                        description: row['description'] || '',
                        downloadLink: row['downloadLink'] || '',
                    })),
                    socialsData: rawSocials.map(row => ({
                        id: row['id'] || '',
                        code: row['title'] || '',
                        category: row['category'] || '',
                        fullName: row['description'] || '',
                        fbUrl: row['link'] || '',
                    })),
                    flowchartsData: rawFlowcharts.map(row => ({
                        id: row['id'] || '',
                        title: row['title'] || '',
                        category: row['category'] || '',
                        description: row['description'] || '',
                        flowchartLink: row['flowchartLink'] || '',
                        imageSrc: getDirectDriveLink(row['flowchartLink'] || ''),
                    })),
                    organizationsData: (rawOrganizations || []).map((row, index) => ({
                        id: row['id'] || '',
                        name: row['student organization'] || '',
                        category: row['category'] || '',
                        officialLogo: row['official logo'] || '',
                        imageSrc: getDirectDriveLink(row['official logo'] || ''),
                        adviser: row['adviser'] || '',
                        president: row['president/chair'] || '',
                        description: row['description'] || '',
                        contact: row['email / contact number'] || '',
                    }))
                };

                // Save to caches
                memoryCache = data;
                if (typeof window !== 'undefined') {
                    try {
                        sessionStorage.setItem(CACHE_KEY, JSON.stringify({
                            timestamp: Date.now(),
                            data: data
                        }));
                    } catch (err) {
                        console.warn('Failed to save to session storage', err);
                    }
                }

                return data;
            }).finally(() => {
                // Clear the promise when done so future fetches (after cache expiry) work again
                globalFetchPromise = null;
            });
        }

        // Wait for the active promise
        setLoading(true);
        globalFetchPromise
            .then(data => {
                setFormsData(data.formsData);
                setSocialsData(data.socialsData);
                setFlowchartsData(data.flowchartsData);
                setOrganizationsData(data.organizationsData);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // Run once on mount

    return { formsData, socialsData, flowchartsData, organizationsData, loading, error }
}
