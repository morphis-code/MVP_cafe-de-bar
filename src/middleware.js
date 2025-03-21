import { NextResponse } from "next/server";

export function middleware(req){
    const token = req.cookies.get("token")
    const {pathname} = req.nextUrl;

    if(!token &&  pathname.startsWith("/promos")){
        return NextResponse.redirect(new URL("/login", req.url))
    }

    if(token && pathname.startsWith("/login")){
        return NextResponse.redirect(new URL("/promos", req.url))
    }
}