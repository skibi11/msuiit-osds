
import { useState, useEffect } from 'react'
import Papa from 'papaparse'

export default function useGoogleSheet(url) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        Papa.parse(url, {
            download: true,
            header: true,
            complete: (results) => {
                setData(results.data)
                setLoading(false)
            },
            error: (err) => {
                setError(err)
                setLoading(false)
            }
        })
    }, [url])

    return { data, loading, error }
}
