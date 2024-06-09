import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {

    try{
        console.log(요청.query);

        let client = await connectDB;
        const db = client.db('forum');
        let 데이터 = await db.collection('post').deleteOne( {_id : new ObjectId(요청.query.id) } );

        console.log(데이터);

        응답.status(200).json('삭제완료');

    }catch(error){
        응답.status(500).json('서버나 DB에 문제가 발생했나 봅니다..');
    }

}