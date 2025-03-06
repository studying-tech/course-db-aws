import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 単一レコードの更新
  const updatedUser = await prisma.user.update({
    where: { email: 'taro@example.com' },
    data: { name: '山田太郎（更新済み）' },
  })

  // 複数レコードの一括更新
  const updatedPosts = await prisma.post.updateMany({
    where: { authorId: 1 },
    data: { content: '管理者によって更新されました' },
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
