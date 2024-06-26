import { ProfileInterface } from "./profile.interface";

export interface ArticleInterface {
    body: string,
    createdAt: string,
    description: string,
    favorited: boolean,
    favoritesCount: number,
    tagList: string[],
    slug: string,
    title: string,
    updatedAt: string,
    author: ProfileInterface
}