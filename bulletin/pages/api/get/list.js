import { connectDB } from "@/util/database";

export default async function handler(요청, 응답) {
    
    if(요청.method == 'GET'){
        let client = await connectDB;
        const db = client.db('forum');
        let 데이터 = await db.collection('post').find().toArray();

        응답.status(200).json(데이터);
    }
}