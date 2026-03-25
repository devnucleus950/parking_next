import { Role } from "@/app/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/requireRole";
import { NextResponse } from "next/server";


export async function GET () {
    const gaurd = await requireRole(Role.OWNER);
    if (gaurd.error) return gaurd.error;

    const account = gaurd.account;

    const subs = await prisma.subscription.findMany({
        where:{
            ownerId: account.id,
        },
        include:{
            user: true
        }
    });

    const formattedSubs = subs.map((sub) => ({
        id: sub.id,
        subscribedAt: sub.subscribedAt,
        user: {
            id: sub.user.id,
            name: sub.user.name,
            email: sub.user.email
        }
    }))

    return NextResponse.json(formattedSubs, {status: 200})

}