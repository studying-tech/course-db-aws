import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ここに処理を書きます
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
