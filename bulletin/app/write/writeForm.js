'use client'

import { useState } from "react";

export default async function WriteForm() {

    let [src, setSrc] = useState('')
    
    return (
        <div className="p-20">
            <form action="/api/post/write" method="POST">
                <input name="title" placeholder="글제목" />
                <input name="content" placeholder="글내용" />
                <input name="image" type="hidden" value={src} />
                <input type="file" accept="image/*" onChange={
                    async (e) => {
                        let file = e.target.files[0];
                        let filename = encodeURIComponent(file.name);
                        let res = await fetch('/api/post/image?file=' + filename);
                        res = await res.json();

                        // S3 업로드
                        const formData = new FormData();

                        Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
                            formData.append(key, value);
                        });
                        
                        let 업로드결과 = await fetch(res.url, {
                            method: 'POST',
                            body: formData,
                        });

                        if (업로드결과.ok) {
                            const newSrc = res.url + '/' + filename;
                            setSrc(newSrc);
                            document.querySelector('.p-20 form [type="hidden"]').value = newSrc;
                        } else {
                            console.log('실패');
                        }
                    }
                } />
                <button type="submit">전송</button>
                <img src={src} />
            </form>
        </div>
    )

}