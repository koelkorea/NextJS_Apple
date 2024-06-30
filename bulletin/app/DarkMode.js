'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function DarkMode({cookie}){

    // let 쿠키값 = ('; ' + document.cookie).split(`; mode=`).pop().split(';')[0]
    let [쿠키값, 쿠키값변경] = useState(cookie);
    let router = useRouter();

    useEffect(()=>{
        
        if (쿠키값 == '') {
            document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400)
        }
    },[])

    return (
        <span onClick={()=>{  

            if (쿠키값 == 'light') {
                document.cookie = 'mode=dark; max-age=' + (3600 * 24 * 400)
                쿠키값변경('dark');

                // 쿠키값이라는 state객체 요소가 변해도, layout.js의 class속성의 변화에 따른 css속성의 변화까지는 해당사항이 아니라 rerendering 대상이 아니기에.. 
                //  -> 수동적으로 페이지 리로드를 VDOM식으로 하라는 router 객체의 메서드가 필요
                router.refresh()
            } else {
                document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400)
                쿠키값변경('light');

                
                // 쿠키값이라는 state객체 요소가 변해도, layout.js의 class속성의 변화에 따른 css속성의 변화까지는 해당사항이 아니라 rerendering 대상이 아니기에.. 
                //  -> 수동적으로 페이지 리로드를 VDOM식으로 하라는 router 객체의 메서드가 필요
                router.refresh()
            }
        
        }}> { (쿠키값 == 'light') ? '☀️' : '🌙' }</span> 
    )
} 