import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const result = await prisma.$transaction(async (tx) => {
    // ユーザー作成
    const user = await tx.user.create({
      data: { name: '佐藤次郎', email: 'jiro@example.com' },
    })

    // 投稿作成
    const post = await tx.post.create({
      data: {
        title: 'トランザクションの投稿',
        content: 'これはトランザクション内で作成された投稿です',
        authorId: user.id,
      },
    })

    return { user, post }
  })
}

// エラーが発生した場合は、エラーを出力してプログラムを終了する
// クリーンアップ処理として、Prisma クライアントを切断する
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
