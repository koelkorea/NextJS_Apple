import { connectDB } from "@/util/database";

export default async function handler(요청, 응답) {

    if (요청.method == 'POST'){

        try{
        
            let client = await connectDB;
            const db = client.db('forum');
            const userCheck = await db.collection('practice').findOne({id : 요청.body.id});

            console.log(userCheck);

            if(userCheck) {
                return 응답.status(400).json('이미 가입된 ID임 다른거 사용 ㄱㄱ')
            }


            if(요청.body.id == '' || 요청.body.id == null ) {
                return 응답.status(400).json('ID가 빈칸인데 허용 불가')
            }

            if(/\W/.test(요청.body.id) == true){
                return 응답.status(400).json('ID는 알파벳과 숫자 그리고 _만 허용')
            }

            if( (요청.body.id).length > 15 ){
                return 응답.status(400).json('ID는 15자 이내로.. ')
            }


            if (요청.body.password == '' || 요청.body.password == null ) {
                return 응답.status(400).json('PW가 빈칸인데 허용 불가')
            }

            if(/\W/.test(요청.body.password) == true){
                return 응답.status(400).json('PW는 알파벳과 숫자 그리고 _만 허용')
            }

            if( (요청.body.password).length > 15 ){
                return 응답.status(400).json('PW는 15자 이내로.. ')
            }

            let 데이터 = await db.collection('practice').insertOne( 요청.body );

            // 응답.json(userCheck);
            응답.redirect(302, '/list');

        }catch(error){
            응답.status(500).json('서버나 DB에 문제가 발생했나 봅니다..');
        }
    }
}