'use client'

import { connectDB } from "@/util/database";
import { action } from "./action";

export default async function ServerAction2() {

    //DB에서 데이터 뽑아서 보여주기 
    const db = (await connectDB).db('forum')
    let result = await db.collection('post_test').find().toArray()

    return (
        <form action={action}>
            <input type="text" name="title" />
            <button type="submit">Submit</button>
            {
                result ? 
                    result.map((a)=><p>글제목 : {a.title}</p> ) : null
            }
        </form>
    )
} 