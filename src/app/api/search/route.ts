import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const query = searchParams.get("query");

    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${query}`);
    const data = await res.json();

    return Response.json({results: data.results});
}