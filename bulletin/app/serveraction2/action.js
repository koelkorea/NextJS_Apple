'use server'

export async function action(formData) {

    const db = (await connectDB).db('forum')
    await db.collection('post_test').insertOne({title : formData.get('title')})
}