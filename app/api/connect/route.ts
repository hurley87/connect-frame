import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
const api_key = process.env.NEYNAR_API_KEY as string;
const api_url = 'https://api.neynar.com/v2/farcaster/channel/followers';


async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }

  const channel = 'enjoy';
  const fetchUsers: any = async (url: string, users: any[] = []) => {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        api_key,
      },
    });
    const json = await response.json();

    if (json?.users) users.push(...json?.users);

    const cursor = json?.next?.cursor;

    if (cursor) {
      const nextUrl = `${api_url}?id=${channel}&limit=1000&cursor=${cursor}`;
      return fetchUsers(nextUrl, users);
    }

    return users;
  };

  const initialUrl = `${api_url}?id=${channel}&limit=1000`;
  const allUsers = await fetchUsers(initialUrl);

  console.log('allUsers', allUsers);

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: 'link',
          label: 'OnchainKit',
          target: 'https://onchainkit.xyz',
        },
        {
          action: 'post_redirect',
          label: 'Dog pictures',
        },
      ],
      image: {
        src: `https://connect-frame.vercel.app/park-1.png`,
      },
      postUrl: `https://connect-frame.vercel.app/api/frame`,
      state: {
        time: new Date().toISOString(),
      },
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
