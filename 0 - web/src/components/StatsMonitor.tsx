'use client'

import { useEffect } from 'react'
import Stats from 'stats-js'

export default function StatsMonitor() {
    useEffect(() => {
        const stats = new Stats()
        stats.showPanel(0)
        stats.dom.style.position = 'fixed'
        stats.dom.style.top = '0px'
        stats.dom.style.left = '0px'
        stats.dom.style.zIndex = '9999'
        document.body.appendChild(stats.dom)

        let animId: number
        const loop = () => {
            stats.begin()
            stats.end()
            animId = requestAnimationFrame(loop)
        }
        animId = requestAnimationFrame(loop)

        return () => {
            cancelAnimationFrame(animId)
            document.body.removeChild(stats.dom)
        }
    }, [])

    return null
}
