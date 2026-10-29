import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// POST /revalidate: atualiza a home imediatamente.
// Chamado pelos hooks do Payload após qualquer save no admin.
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret')
  if (secret !== (process.env.REVALIDATE_SECRET || 'revalidate-cerejabloom')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  revalidatePath('/', 'layout')
  return NextResponse.json({ revalidated: true, now: Date.now() })
}
