import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
// App router includes @vercel/og.
// No need to install it.
 
export async function GET(
  request: NextRequest,
) {
  const { searchParams } = new URL(request.url);
  const username = decodeURIComponent(searchParams.get('username') || '');
  const bio = decodeURIComponent(searchParams.get('bio') || '');
  const img = decodeURIComponent(searchParams.get('img') || '');


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
          paddingRight: '20px',
          paddingLeft: '20px',
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