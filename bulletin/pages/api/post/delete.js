import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(요청, 응답) {

    if (요청.method == 'DELETE'){

        try{

            let session = await getServerSession(요청, 응답, authOptions); 
            console.log(!session);

            if(!session){
                return 응답.status(500).json('로그인이나 먼저해라');
            }

            // (숙제) 관리자 권한을 가진 유저는 모든 글을 삭제가능하게 서버기능을 업그레이드
            let client = await connectDB;
            const db = client.db('forum');

            let 관리자여부 = await db.collection('user_credential').findOne( { email : session.user.email } );
            console.log(관리자여부.power);

            if( 관리자여부.power != 'almightyMAN'){

                console.log(요청.body);

                if(session.user.email != 요청.body.author){
                    return 응답.status(500).json('본인이 쓴 글만 지울 수 있음');
                }
                
            }

            let 데이터 = await db.collection('post').deleteOne( {_id : new ObjectId(요청.body) } );

            console.log(데이터);

            return 응답.status(200).json('삭제완료');

        }catch(error){
            응답.status(500).json('서버나 DB에 문제가 발생했나 봅니다..');
        }
    }
}