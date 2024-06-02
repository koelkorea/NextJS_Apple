export default function handler(요청, 응답){
    let 날짜 = new Date()
    응답.status(200).json(날짜)
} 