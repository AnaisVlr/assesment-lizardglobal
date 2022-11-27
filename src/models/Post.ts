import Author from "./Author";
import Category from "./Category";

export default class Post{
    id : string;
    title : string;
    publishDate : Date;
    author : Author;
    summary : string;
    categories : Category[];

    constructor(id : string, title : string, publishDate : Date, author : Author, summary : string, categories : Category[]){
        this.id = id;
        this.title = title;
        this.publishDate = publishDate;
        this.author = author;
        this.summary = summary;
        this.categories = categories;
    }
}
   