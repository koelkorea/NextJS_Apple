'use client'

export default function Error({error, reset}){
    return (
        <div>
            <h4>최상위 error 페이지(CSR방식으로 동작) : {error} </h4>
            <button onClick={()=>{ reset() }}>다시시도</button>
        </div>
    )
}