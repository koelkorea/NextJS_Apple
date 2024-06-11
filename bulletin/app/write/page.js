import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Write() {

    // (숙제) write 페이지는 로그인한 사람만 보여주려면? 
    let session = await getServerSession(authOptions); 

    console.log(session);

    if(!session){
        return <div>로그인을 먼저 하시죠?'</div>;
    }

    return (
        <div className="p-20">
            <form action="/api/post/write" method="POST">
                <input name="title" placeholder="글제목"/>
                <input name="content" placeholder="글내용"/>
                <button type="submit">전송</button>
            </form>
        </div>
    )
} 