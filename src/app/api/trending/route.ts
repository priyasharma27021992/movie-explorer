import { NextRequest } from "next/server";

let cachedData = null;
let cachedEtag = null;

export async function GET(req:NextRequest) {
    if(cachedData && cachedEtag){
        const ifNoneMatch = req.headers.get("if-none-match");
        if(ifNoneMatch === cachedEtag){
            return new Response(null, {status: 304})
        }
    }

    const tmdbRes = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_KEY}`);
    const data = await tmdbRes.json();

    cachedData = data;
    cachedEtag = `"tmdb-trending-${Date.now()}`;

    return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "max-age=30, must-revalidate",
            "ETag": cachedEtag,
            "Vary": "Accept-Language"
        }
    })
}