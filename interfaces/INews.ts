export interface INews {
    status: string,
    totalResults: number,
    articles: IArticles[]
}

export interface IArticles {
    source: ISource,
    author: string | null,
    title: string,
    description: string,
    url: string,
    urlToImage: string | null,
    publishedAt: Date,
    content: string,
}

export interface ISource {
    id: string | null,
    name: string
}