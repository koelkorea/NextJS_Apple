'use client'

import { useRouter } from "next/navigation"

export default function DetailLink(){
    let router = useRouter();
    return(
        <div>
            <button onClick={()=> { router.back() } }>뒤로가기</button>
            <button onClick={()=> { router.forward() } }>앞으로가기</button>
            <button onClick={()=> { router.refresh() } }>react식 새로고침</button>
            <button onClick={()=> { router.push('/write') } }>글쓰기</button>
            <button onClick={()=> { router.prefetch('/practice') } }>임시 회원가입</button>
        </div>
    )
}