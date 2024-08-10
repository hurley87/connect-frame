import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { Resvg } from '@resvg/resvg-js';
import { NextRequest, NextResponse } from 'next/server';
import { ReactNode } from 'react';
import satori from 'satori';
import { html } from "satori-html";

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

    console.log('username', username);

    const bio = randomUser?.profile.bio;
    console.log('bio', bio);

    const image = randomUser?.pfp_url; 
    
    // use satori to create an image with the username and pfp_url as their avatar
    const markup = html`<html>
      <body style="margin: 0; padding: 0">
        <div style="display: flex; align-items: center; justify-content: center; height: 100vh; width: 100vw; overflow: hidden; position: relative; color: white;">
          ${bio}
        </div>
      </body>
    </html>` as ReactNode

    // Minimum twitter OG image size
    const svg = await satori(markup, {
      width: 1200,
      height: 675,
      fonts: [
        {
          name: 'Arial',
          data: await fetch('https://example.com/arial.ttf').then(res => res.arrayBuffer()),
          weight: 400,
          style: 'normal',
        },
      ],
    });
    

    const pngBuffer = new Resvg(svg, { background: "#000" }).render().asPng();
    const base64Image = `data:image/png;base64,${pngBuffer.toString('base64')}`;


  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
            label: `Kiss ${username}`,
        },
        {
          label: `Slap ${username}`,
        },
      ],
      image: {
        src: base64Image,
      },
      postUrl: `https://connect-frame.vercel.app/api/connect`,
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
