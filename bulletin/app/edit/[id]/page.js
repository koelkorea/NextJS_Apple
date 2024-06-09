import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";

export default async function Edit(props) {

    const db = (await connectDB).db('forum');
    let 게시물 = await db.collection('post').findOne({_id : new ObjectId(props.params.id)});
    console.log(게시물);

    return (
      <div className="p-20">
        <h4>수정페이지</h4>
        <form action="/api/post/edit" method="POST">
          제목) <input name="title" defaultValue={게시물.title}  />
          내용) <input name="content" defaultValue={게시물.content} />
          <button type="submit">전송</button>
          <input name="id" defaultValue={게시물._id} style={ {"visibility" : "hidden" } } />
        </form>
      </div>
    )
} 