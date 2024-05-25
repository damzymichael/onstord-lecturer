import {NextRequest} from 'next/server';

const awaitable = (time: number) => {
  return new Promise(resolve => setTimeout(resolve, time));
};
export async function middleware(req: NextRequest) {
  // console.log(req.cookies);
  // console.log('middleware runnung');
  // console.log('middleware ran');
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};
