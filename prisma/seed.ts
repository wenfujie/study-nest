/*
 * @Date: 2023-11
 * @LastEditors: wfj
 * @LastEditTime: 2023-11
 * @Description:
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const posts = [
  {
    title: '文章1',
    author: '张三',
    content: 'We are excited to share that',
  },
  {
    title: '文章2',
    author: '李四',
    content: '666',
  },
];

async function main() {
  // const [post1, post2] = posts;
  // await prisma.post.upsert({
  //   where: { title: post1.title },
  //   update: {},
  //   create: post1,
  // });
  // await prisma.post.upsert({
  //   where: { title: post2.title },
  //   update: {},
  //   create: post2,
  // });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
