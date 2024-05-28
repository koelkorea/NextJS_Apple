import {age, name} from './data.js'
import Homework from './homework.js';

export default function Cart() {

    let 장바구니 = ['Tomatoes', 'Pasta']

    return (
        <div>
            <Homework/>
            <h4 className="title">Cart</h4>
            <CartItem 상품={장바구니[0]}/>
            <CartItem 상품={장바구니[1]}/>
            <Banner content='현대카드'/>
            <Banner content='롯데카드'/>
            <ColorButton color='red'/>
            <ColorButton color='blue'/>
        </div>
    )
} 

function CartItem(props) {
    return (
        <div className="cart-item">
            <p>{props.상품}</p>
            <p>$40</p>
            <p>1개</p>
        </div>
    )
} 

function Banner(props){
    return (
        <h5>{props.content} 결제 행사중</h5>
    )
} 

// 숙제
function ColorButton(props){
    return (
        <button style={{ backgroundColor : props.color }} >{props.color} 버튼</button>
    )
} 