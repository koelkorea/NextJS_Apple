import { connectDB } from "@/util/database";
import { revalidatePath } from "next/cache" //페이지 상단에 추가

export default async function ServerAction1() {

    //DB에서 데이터 뽑아서 보여주기 
    const db = (await connectDB).db('forum')
    let result = await db.collection('post_test').find().toArray()

    async function action(formData) {

        'use server';

        const db = (await connectDB).db('forum')
        await db.collection('post_test').insertOne({title : formData.get('title')})
        revalidatePath('/serveraction1')
    }

    return (
        <form action={action}>
            <input type="text" name="title" />
            <button type="submit">Submit</button>
            {
                result ? 
                    result.map((a)=><p>글제목 : {a.title}</p> ) : null
            }
        </form>
    )
} 