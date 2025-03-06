import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 全ユーザーの取得
  const allUsers = await prisma.user.findMany()

  // 条件付き検索
  const specificUser = await prisma.user.findUnique({
    where: { email: 'taro@example.com' },
  })

  // リレーションを含む取得
  const usersWithPosts = await prisma.user.findMany({
    include: { posts: true },
  })

  // フィルタリングと並べ替え
  const filteredPosts = await prisma.post.findMany({
    where: { title: { contains: '投稿' } },
    orderBy: { createdAt: 'desc' },
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
