'use client'
import { Eye } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function VisitorCount() {
    const [count, setCount] = useState(null)

    useEffect(() => {
        const api = process.env.NEXT_PUBLIC_API_URL
        axios.post(`${api}/api/v1/visitors`);
        axios.get(`${api}/api/v1/visitors`)
        .then(r => setCount(r.data.count));
    }, []);

    return (
        <div style={{ position: 'fixed', bottom: '28px', right: '88px' }}>
            <div className="visit-bubble">
                <Eye size={22} color="#0a0a0f" />
                <span style={{ color: "#0a0a0f", fontWeight: "bold" }}>{count ?? '...'}</span>
            </div>
        </div>
    )
}