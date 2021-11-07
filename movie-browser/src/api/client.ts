export type Movie = {
    id: string,
    title: string,
    vote_average: number,
    vote_count: number,
    overview: string,
    release_date: string,
    poster_path: string
}

export type SearchResult = {
    page: number,
    results: Movie[],
    total_pages: number,
    total_results: number,
}

export const generateSearchUrl = (apiKey: string, searchTerm: string) => `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&page=1&include_adult=false`
export const generateMovieDetailsUrl = (apiKey: string, id: string) => `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
export const generatePosterUrl = (id: string) => `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${id}`