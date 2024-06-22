import { connectDB } from "@/util/database";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {

    if (요청.method == 'POST'){

        try{
            let session = await getServerSession(요청, 응답, authOptions); 

            console.log('session : ' + JSON.stringify(session));
            console.log('덧글 body 전송 확인 : ' + 요청.body);

            요청.body = JSON.parse(요청.body);

            let 저장할거 = {
                content : 요청.body.comment,
                parent : new ObjectId(요청.body.parent),
                author : session.user.email
            }

            console.log("저장할거 : " + 저장할거);

            let client = await connectDB;
            const db = client.db('forum');
            let 데이터 = await db.collection('nextComment').insertOne( 저장할거 );

            console.log(데이터);

            return 응답.status(200).json('덧글 추가 완료');

        }catch(error){
            응답.status(500).json('서버나 DB에 문제가 발생했나 봅니다..');
        }
    }
}