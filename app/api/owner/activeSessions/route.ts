import { Role } from "@/app/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/requireRole";
import { NextResponse } from "next/server";


export  async function GET() {

    try {
    
        const gaurd = await requireRole(Role.OWNER);
        if (gaurd.error) return gaurd.error;
        const account = gaurd.account;

        const lot = await prisma.parkingLot.findUnique({
            where:{
                ownerId: account.id
            }
        })

        const lotId = lot?.id;

        const sessions = await prisma.parkingSession.findMany({
            where:{
                parkingLotId: lotId,
                endTime: null
            },
            include: {
                user: true
            }
            
        })

        console.log(sessions)

        return NextResponse.json(sessions, {status:200})
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {message:"Internal server error"},
            {status:500}
        )
    }

}