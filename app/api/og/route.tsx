import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
// App router includes @vercel/og.
// No need to install it.
 
export async function GET(
  request: NextRequest,
) {
  const username = request.nextUrl.searchParams.get("username")


  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        👋 Hello {username}
      </div>
    ),
    {
      width: 600,
      height: 600,
    },
  );
}