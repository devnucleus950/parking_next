"use client"

import { cn } from "@/lib/utils"
import axios from "axios"
import { useEffect, useState } from "react"

type lotStats = {
    lotCapacity: number
    occupiedSpots: number
    availableSpots: number
    todayRevenue: number
}

export const LotStats= () => {

    const [ lotStats, setLotsStats ] = useState<lotStats | null>(null);
    
    

    useEffect(() => {
        const fetchLotStats = async () => {
            const res = await axios.get("/api/owner/lotStats");
            setLotsStats(res.data);
            console.log(res.data);
        }
        fetchLotStats()
    },[])

    if(!lotStats) return <div className="animate-pulse px-6 max-w-7xl flex justify-center py-6 font-medium text-xl">
        Loading Stats...
    </div>
    const params = [
        {name:"Total Capacity",value:lotStats.lotCapacity},
        {name:"Occupied Spots",value:lotStats.occupiedSpots},
        {name:"Available Spots",value:lotStats.availableSpots},
        {name:"Today's Revenue",value:`₹${lotStats.todayRevenue}`}
    ]

    return <div className="p-6 max-w-7xl mx-auto">
        <div className="flex grid grid-cols-2 md:grid-cols-4 gap-4">
            {params.map((param) => (
                <div className=" bg-white p-4 rounded-lg space-y-1" key={param.name}>
                    <p className="font-medium text-stone-600">{param.name}</p>
                    <h1 className={cn("text-3xl font-bold text-primary", (param.name === "Occupied Spots") && "text-tertiary")}>{param.value}</h1>
                </div>
            ))}
        </div>
    </div>
}