import { NextResponse } from 'next/server'

export async function middleware(request) {

  if (request.nextUrl.pathname.startsWith('/list') ) {

    console.log(new Date().toLocaleString())
    console.log(request.headers.get('sec-ch-ua-platform'))

    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith('/write')) {

    const session = await getToken({ req : request })
    console.log('세션', session)

    if (session == null) {
      return NextResponse.redirect(new URL('/api/auth/signin', request.url));
    }

    return NextResponse.next();
  }

  // (숙제) 유저가 /register 페이지 방문시 visited=true 라는 쿠키를 생성 (있으면 암것도 하지마)
  if (request.nextUrl.pathname.startsWith('/register')) {

    const response = NextResponse.next()
    
    if(request.cookies.has('visited') == false){

      response.cookies.set({
        name: 'visited',
        value: true,
        maxAge: 3600,
        httpOnly : true
      })  

    }

    return response  //쿠키생성
  }

}