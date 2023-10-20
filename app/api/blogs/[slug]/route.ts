import prisma from "@/prisma/prisma";

interface requestBody {
  id: string;
  title: string;
  body: string;
}

// Get blog by Id
export const GET = async (
  request: Request,
  { params }: { params: { slug: string } }
) => {
  try {
    await prisma.$connect();
    const findBlog = await prisma.post.findUnique({
      where: {
        id: params.slug,
      },
    });

    return new Response(JSON.stringify(findBlog), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
};

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update a blog by id
 *     tags:
 *       - blogs
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog to delete
 *         schema:
 *           type: string
 *     requestBody:
 *      description: Blog post data to update.
 *      content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the blog post.
 *               body:
 *                 type: string
 *                 description: The updated body of the blog post.
 *     responses:
 *       200:
 *         description: blog updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: blog not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
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
export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const body: requestBody = JSON.parse(await request.text());
  try {
    await prisma.$connect();

    const postUpdate = await prisma.post.update({
      where: {
        id: params.slug,
      },
      data: {
        title: body.title,
        body: body.body,
      },
    });

    return new Response(JSON.stringify(postUpdate), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog by id
 *     tags:
 *       - blogs
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: blog deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: blog not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
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
export const DELETE = async (
  request: Request,
  { params }: { params: { slug: string } }
) => {
  try {
    await prisma.$connect();
    const blog = await prisma.post.delete({
      where: {
        id: params.slug,
      },
    });
    return new Response(JSON.stringify({ message: "blog deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify("something went wrong"), {
      status: 500,
    });
  }
};
