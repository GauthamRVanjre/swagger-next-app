import prisma from "@/prisma/prisma";

type requestBody = {
  body: string;
  title: string;
};
/**
 * @swagger
 * /api/blogs:
 *  get:
 *
 *   summary: Returns blogs present in posts collection
 *   tags:
 *       - blogs
 *
 *   responses:
 *     200:
 *       description: returns a blog post
 *     500:
 *       description: returns a error message
 *
 */
export const GET = async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    const blogs = await prisma.post.findMany();

    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "something went wrong!" }), {
      status: 500,
    });
  } finally {
    prisma.$disconnect();
  }
};

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog
 *     tags:
 *       - blogs
 *     requestBody:
 *       body: New todo object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: New blog created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 body:
 *                   type: string

 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
export const POST = async (req: Request, res: Response) => {
  const requestBody: requestBody = await req.json();

  try {
    await prisma.$connect();
    const createPost = await prisma.post.create({
      data: {
        title: requestBody.title,
        body: requestBody.body,
      },
    });

    return new Response(JSON.stringify(createPost), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: `${error}` }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
};
