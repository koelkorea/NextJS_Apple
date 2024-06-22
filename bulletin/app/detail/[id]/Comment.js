'use client'
import { useSession } from 'next-auth/react';
import {useState, useEffect} from 'react'

// (나중에 숙제로 작성) 글마다 좋아요 기능을 만들고 싶은데 
//  -> (조건) 유저는 같은 글에 중복해서 좋아요를 누를 수 없어야합니다. 그러려면 좋아요누른 사람의 _id같은 것도 기록해둬야하겠군요. 
//            그럼 좋아요 누른 갯수와 좋아요 누른 사람들을 DB에 어디에 어떻게 기록해야 좋을지 한번 생각해봅시다. 
export default function Comment({parent, session}) {

    let [comment, setComment] = useState('')
    let [oldComments, setOldComments] = useState([]);

    useEffect( () => {
        console.log(session);

        fetch('/api/get/comment/list?parent=' + parent, { method : 'GET'})
            .then( (result) =>  result.json() )
            .then( (result) => {
                //성공시 실행할코드
                console.log("result : " + JSON.stringify(result));
                if (Array.isArray(result)) {
                    setOldComments(result); 
                } else {
                    console.error("Fetched data is not an array");
                    setOldComments([]); // 혹시 모를 오류에 대비해 빈 배열 설정
                } 
            })
            .catch((error)=>{
                //인터넷문제 등으로 실패시 실행할코드
                console.log(error)
                alert(error);
            })
    }, []);
    
    return (
        <div>
            <div>[댓글목록]</div>
            <hr/>
            { 
                oldComments != null ?
                    oldComments.map((a,i)=>
                        <div key={i}>
                            <h4 style={{display : 'inline' , marginRight : '5px'}}> {oldComments[i].author} </h4>
                            {oldComments[i].content}
                        </div>
                    )
                    : '댓글없음'
            }
            <hr/>
            <input onChange={(e)=>{ setComment(e.target.value) }} />
            <button onClick={()=>{ 

                console.log(comment);

                fetch('/api/post/comment/write', { method : 'POST', body : JSON.stringify({comment : comment, parent : parent }) })
                    .then((result) => result.json())
                    .then((newComment) => {

                        console.log("newComment : " + JSON.stringify(newComment));
                        let copy = [...oldComments, {content : comment, author : session.user.email }];
                        console.log("copy : " + JSON.stringify(copy));

                        setOldComments(copy); 
                    })
                    .catch((error) => {
                        //인터넷문제 등으로 실패시 실행할코드
                        console.log(error)
                        alert(error)
                    })
            }}>댓글전송</button>
        </div>
    )
} 