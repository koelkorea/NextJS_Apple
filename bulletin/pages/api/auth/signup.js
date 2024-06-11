import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(요청, 응답) {

    if (요청.method === "POST") {

        
        try{

            // (숙제) 회원가입 시켜주기 전에 이름, 이메일, 비번란에 빈칸을 보내는 경우 가입을 거절해봅시다.
            if(요청.body.email == '' || 요청.body.email == null ) {
                return 응답.status(400).json('이메일 빈칸인데 허용 불가')
            }

            if(/\W@a-z/.test(요청.body.email) == true){
                return 응답.status(400).json('이메일은 알파벳과 숫자 그리고 _만 id 부분에 허용')
            }

            if( (요청.body.email).length > 50 ){
                return 응답.status(400).json('이메일 50자 이내로.. ')
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


            // (숙제2) 회원가입 시켜주기 전에 같은 이메일이 이미 DB에 있는지 조회부터 해보고 같은 이메일이 이미 DB에 있으면 가입을 거절해봅시다.
            let db = (await connectDB).db('forum');
            let userCheck = await db.collection('user_credential').findOne( { email : 요청.body.email } );

            if(userCheck) {
                return 응답.status(400).json('이미 가입된 ID임 다른거 사용 ㄱㄱ')
            }

            // 유저가 보낸 데이터 hashing 처리하여 안 털리게 저장
            const hash = await bcrypt.hash(요청.body.password, 10);
            요청.body.password = hash;
            요청.body.power = 'normal';

            await db.collection('user_credential').insertOne(요청.body);
            응답.redirect(302, '/list')

        }catch(error){
            응답.status(500).json('서버나 DB에 문제가 발생했나 봅니다..');
        }
    }
}; 