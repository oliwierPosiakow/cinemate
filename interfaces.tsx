export interface Movie {
    poster?: string,
    poster_path?: string,
    id?: number,
    title?: string,
    popularity?: number,
    count?: number,
    vote_average?: number,
    runtime?: number,
    overview?: string,
    production_countries?: {
        iso_3166_1?: string,
        name?: string
    }[],
    genres?: {
        id?: number,
        name?: string,
    }[]
}