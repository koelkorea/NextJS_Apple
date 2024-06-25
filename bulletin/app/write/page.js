import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import WriteForm from "./writeForm";

export default async function Write() {

    // (숙제) write 페이지는 로그인한 사람만 보여주려면? 
    let session = await getServerSession(authOptions); 

    console.log(session);

    if(!session){
        return <div>로그인을 먼저 하시죠?'</div>;
    }

    return <WriteForm/>;
}