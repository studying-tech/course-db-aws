import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 単一レコードの削除
  const deletedPost = await prisma.post.delete({
    where: { id: 1 },
  })

  // 複数レコードの一括削除
  const deletedUsers = await prisma.user.deleteMany({
    where: { email: { contains: 'test.com' } },
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
