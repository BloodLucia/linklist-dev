import { NextRequest, NextResponse } from 'next/server'
import { getPlaiceholder } from 'plaiceholder'

export async function GET(request: NextRequest, params: { url: string }) {
  const url = request.nextUrl.searchParams.get('url')
  if (!url) {
    return NextResponse.json({ msg: 'require url parameter' }, { status: 402 })
  }
  const buffer = await fetch(url).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  )
  const { base64 } = await getPlaiceholder(buffer)

  return NextResponse.json({ base64 })
}
