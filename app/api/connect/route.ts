import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { kiss, slap } from '../../../utils/game';

const api_key = process.env.NEYNAR_API_KEY as string;
const api_url = 'https://api.neynar.com/v2/farcaster/channel/followers';



async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }

  const userAddress = message?.interactor?.verified_addresses?.eth_addresses?.[0] as `0x${string}`;

  const channel = 'base';
  const fetchUsers: any = async (url: string, users: any[] = []) => {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        api_key,
      },
    });
    const json = await response.json();

    if (json?.users) users.push(...json?.users);

    // const cursor = json?.next?.cursor;

    // if (cursor) {
    //   const nextUrl = `${api_url}?id=${channel}&limit=1000&cursor=${cursor}`;
    //   return fetchUsers(nextUrl, users);
    // }

    return users;
  };

  const initialUrl = `${api_url}?id=${channel}&limit=1000`;
  const allUsers = await fetchUsers(initialUrl);


    // pick a random user
    const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
    console.log('randomUser', randomUser);

    const username = randomUser?.username;
    const bio = randomUser?.profile.bio.text;
    const image = randomUser?.pfp_url; 
    const randomUserAddress = randomUser?.verified_addresses.eth_addresses[0];

    if (message?.button === 1) {
      console.log('Kiss');
      console.log('userAddress', userAddress);
      console.log('randomUserAddress', randomUserAddress);
      await kiss(userAddress, randomUserAddress);
    }

    if(message?.button === 2) {
      console.log('Slap');
      await slap(userAddress, randomUserAddress);
    }
    
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `😘 Kiss`,
        },
        {
          label: `🫲 Slap`,
        },
        {
          action: 'link',
          target: 'http://localhost:3000/',
          label: `🏆 Rank`,
        },
      ],
      image: {
        src: `https://kissorslap.vercel.app/api/og?username=${encodeURIComponent(username)}&bio=${encodeURIComponent(bio)}&img=${encodeURIComponent(image)}`,
        aspectRatio: '1:1',
      },
      postUrl: `https://kissorslap.vercel.app/api/connect`,
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
