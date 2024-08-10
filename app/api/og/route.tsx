import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
// App router includes @vercel/og.
// No need to install it.
 
export async function GET(
  request: NextRequest,
) {
  const username = request.nextUrl.searchParams.get("username") || '';
  const bio = request.nextUrl.searchParams.get("bio") || '';
  const img = request.nextUrl.searchParams.get("img") || '';  

  console.log('username', username);
  console.log('bio', bio);
  console.log('img', img);


  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 6,

        }}
      >
        <img
          src={img}
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            marginRight: 'auto',
            marginLeft: 'auto',
          }}
        />
        <span>{username}</span>
        <span style={{
          fontSize: 20,
          textAlign: 'center',
        }}>{bio}</span>

      </div>
    ),
    {
      width: 600,
      height: 600,
    },
  );
}