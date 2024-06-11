'use client'

import Link from "next/link";

export default function ListItem(props) {

    const 게시물 = props.게시물;

    return (
        <div className="list-bg">
            {
                
                게시물.map((배열요소, 인덱스)=>{
                    return(
                        <div className="list-item" key={인덱스}>
                            <Link href={ `/detail/${게시물[인덱스]._id}` } >
                                <h4>{게시물[인덱스].title}</h4>
                            </Link>
                            <p>{게시물[인덱스].content}</p>

                            {/* 수정버튼 */}
                            <Link href={'/edit/' + 게시물[인덱스]._id} className="list-btn">✏️</Link>

                            {/* 삭제버튼 
                                (숙제) 관리자 권한을 가진 유저는 모든 글을 삭제가능하게 서버기능을 업그레이드 */}
                            <button onClick={(e)=>{
                                fetch('/api/post/delete', { 
                                    method : 'DELETE', 
                                    body : 배열요소._id
                                })
                                .then( (result) => {
                                    if(result.status == 200) {
                                        return result.json()
                                    } else {
                                        //서버가 에러코드전송시 실행할코드
                                        throw new Error("API요청 중 문제 발생! : " + result.json());
                                    }
                                })
                                .then( (result) => {
                                    //성공시 실행할코드
                                    console.log(result);
                                    e.target.parentNode.style.opacity = 0;
                                    setTimeout(() => {
                                        e.target.parentNode.style.display = 'none';
                                        alert(result);
                                    }, 1000);                       
                                })
                                .catch((error)=>{
                                    //인터넷문제 등으로 실패시 실행할코드
                                    console.log(error)
                                    alert(error);
                                })
                            }}>🗑️</button>

                            {/* queryString 버전 삭제 */}
                            <button onClick={(e)=>{
                                fetch('/api/extra/querystring?id=' + 배열요소._id)
                                .then( (result, reject) => {
                                    if(result.status == 200) {
                                        return result.json()
                                    } else {
                                        //서버가 에러코드전송시 실행할코드
                                        throw new Error("API요청 중 문제 발생! : " + result.json());
                                    }
                                })
                                .then( (result) => {
                                    //성공시 실행할코드
                                    console.log(result);
                                    e.target.parentNode.style.opacity = 0;
                                    setTimeout(() => {
                                        e.target.parentNode.style.display = 'none';
                                        alert(result);
                                    }, 1000);                       
                                })
                                .catch((error)=>{
                                    //인터넷문제 등으로 실패시 실행할코드
                                    console.log(error)
                                    alert(error);
                                })
                            }}>🗑️</button>

                            {/* URL parameter 버전 삭제 */}
                            <button onClick={(e)=>{
                                fetch('/api/extra/' + 배열요소._id)
                                .then( (result, reject) => {
                                    if(result.status == 200) {
                                        return result.json()
                                    } else {
                                        //서버가 에러코드전송시 실행할코드
                                        throw new Error("API요청 중 문제 발생! : " + result.json());
                                    }
                                })
                                .then( (result) => {
                                    //성공시 실행할코드
                                    console.log(result);
                                    e.target.parentNode.style.opacity = 0;
                                    setTimeout(() => {
                                        e.target.parentNode.style.display = 'none';
                                        alert(result);
                                    }, 1000);                       
                                })
                                .catch((error)=>{
                                    //인터넷문제 등으로 실패시 실행할코드
                                    console.log(error)
                                    alert(error);
                                })
                            }}>🗑️</button>
                        </div>
                    )
                })
            }
        </div>
    )
} 