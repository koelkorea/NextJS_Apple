import { connectDB } from "@/util/database";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {

    if(요청.method == 'GET'){

        console.log("parent : " + 요청.query.parent);

        let client = await connectDB;
        const db = client.db('forum');
        let 데이터 = await db.collection('nextComment').find( {parent : new ObjectId(요청.query.parent)} ).toArray();

        console.log("데이터 : " + JSON.stringify(데이터));

        응답.status(200).json(데이터);
    }
}