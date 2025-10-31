import { Movie } from "@/types";
import { NextRequest } from "next/server";

let cachedData: Array<Movie> = [];
let cachedEtag: string = '';

export async function GET(req:NextRequest) {
    if(cachedData && cachedEtag){
        const ifNoneMatch = req.headers.get("if-none-match");
        if(ifNoneMatch === cachedEtag){
            return new Response(null, {status: 304})
        }
    }

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || '1';
    let fetchUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_KEY}`;
    if(page){
        fetchUrl = fetchUrl + `&page=${page}`;
    }
    const tmdbRes = await fetch(fetchUrl);


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