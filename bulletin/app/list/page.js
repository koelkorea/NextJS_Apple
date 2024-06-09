import DetailLink from "./DetailLink";
import ListItem from "./ListItem";
import { connectDB } from "@/util/database";

export default async function List() {

    const db = (await connectDB).db('forum');
    let 게시물 = await db.collection('post').find().toArray();
    console.log(게시물);

    return (
        <div className="list-bg">
            <ListItem 게시물={게시물}/>
            <DetailLink/>
        </div>
    )
} 