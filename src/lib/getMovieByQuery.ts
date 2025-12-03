export const getMovieByQuery = async (query: string) => {
    const response = await fetch(`/api/search?query=${query}`);
    const jsonResponse = await response.json();
    return jsonResponse;
}