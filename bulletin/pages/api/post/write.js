import { connectDB } from "@/util/database";

export default async function handler(요청, 응답) {

    if (요청.method == 'POST'){

        if (요청.body.title == '') {
            return 응답.status(500).json('제목써라')
        }

        try{
            let client = await connectDB;
            const db = client.db('forum');
            // let 데이터 = await db.collection('post').insertOne( 요청.body );
            let 데이터 = await db.collection('post').insertOne( {title : 요청.body.title, content : 요청.body.content} );

            응답.redirect(302, '/list')
        }catch(error){
            응답.status(500).json('서버나 DB에 문제가 발생했나 봅니다..');
        }
    }
}