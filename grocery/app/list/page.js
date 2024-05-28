'use client';
import { useState } from 'react'

export default function List() {

    let 상품 = ['Tomatoes', 'Pasta', 'Coconut'];
    let 가격 = [];
    let [수량, 수량변경] = useState([0, 0, 0]);

    for(var i = 0; i < 상품.length; i++){
      가격[i] = 상품[i].length * 10;
    }

    return (
        <div> 
            <h4 className="title">상품목록</h4>
            { 
                상품.map((개별상품, 인덱스)=>{
                    return ( 
                        <div className="food" key={인덱스}> 
                            {/* <img src={'./food' + {인덱스} + '.png'} className="food-img"></img> */}
                            <img src={`./food${인덱스}.png`} className="food-img"></img>
                            <h4>{ 상품[인덱스] } $ { 가격[인덱스] }</h4>
                            <button onClick = { () => { 
                                let copy = [...수량];
                                copy[인덱스]--;
                                copy[인덱스] < 0 ? null : 수량변경(copy) } }>-</button>
                            <span> {수량[인덱스]} </span>
                            <button onClick = { () => { 
                                let copy = [...수량];
                                copy[인덱스]++;
                                수량변경(copy) } }>+</button>
                        </div>
                    )
                })
            }
        </div>
    );
}