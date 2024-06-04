import Link from "next/link";
import { connectDB } from "@/util/database";
import DetailLink from "./DetailLink";

export default async function List() {

    const db = (await connectDB).db('forum');
    let 게시물 = await db.collection('post').find().toArray();
    console.log(게시물);

    return (
        <div className="list-bg">
            {
                
                게시물.map((배열요소, 인덱스)=>{
                    return(
                        <div className="list-item" key={인덱스}>
                            <Link href={ `/detail/${게시물[인덱스]._id}` } >
                                <h4>{게시물[인덱스].title}</h4>
                            </Link>
                            <Link href={'/edit/' + 게시물[인덱스]._id} className="list-btn">✏️</Link>
                            <p>{게시물[인덱스].content}</p>
                        </div>
                    )
                })
            }
            <DetailLink/>
        </div>
    )
} 