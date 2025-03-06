import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ユーザーの作成
  const user = await prisma.user.create({
    data: { name: '山田太郎', email: 'taro@example.com' },
  })

  // リレーションを含むデータ作成
  const userWithPosts = await prisma.user.create({
    data: {
      name: '鈴木花子',
      email: 'hanako@example.com',
      posts: {
        create: [
          { title: '初めての投稿', content: 'こんにちは！' },
          { title: '2つ目の投稿', content: '今日はいい天気です。' },
        ],
      },
    },
    include: { posts: true },
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
