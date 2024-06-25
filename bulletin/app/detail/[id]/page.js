import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database.js"
import Comment from "./Comment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { notFound } from "next/navigation";

export default async function Detail(props) {
    
    let db = (await connectDB).db('forum')
    let result = await db.collection('post').findOne({_id : new ObjectId(props.params.id)});
    let session = await getServerSession(authOptions);

    console.log("result : " + JSON.stringify(result));

    if (result == null) {

        return notFound()

    } else {

        return (
            <div>
                <h4>상세페이지임</h4>
                <h4>{result.title}</h4>
                <p>{result.content}</p>
                {result.imageURL? 
                    <img src={result.imageURL} /> : null}
                <Comment parent = {props.params.id} session = {session} />
            </div>
        )
    }


}