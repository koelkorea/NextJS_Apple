export default async function Practice() {
    return (
        <div className="p-20">
            <form action="/api/post/practice" method="POST">
                <input name="id" placeholder="유저 아이디"/>
                <input name="password" placeholder="비밀번호"/>
                <button type="submit">전송</button>
            </form>
        </div>
    )
} 