import prisma from "@/prisma/prisma";

type requestBody = {
  body: string;
  title: string;
};

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Returns blogs present in posts collection
 *     tags:
 *       - blogs
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list of blog posts
 *       401:
 *         description: Unauthorized - Bearer token missing or incorrect
 *       500:
 *         description: Internal Server Error - Something went wrong
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *     description: Enter a Bearer token in the format 'Bearer <token>'
 */

export const GET = async (req: Request, res: Response) => {
  try {
    const token = req.headers.get("Authorization");
    console.log(token);
    if (!token || !token.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

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
 *     security:
 *       - BearerAuth: []
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
 *       401:
 *         description: Unauthorized - Bearer token missing or incorrect

 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *     description: Enter a Bearer token in the format 'Bearer <token>'
 */

export const POST = async (req: Request, res: Response) => {
  const requestBody: requestBody = await req.json();

  try {
    const token = req.headers.get("Authorization");
    console.log(token);
    if (!token || !token.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

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
