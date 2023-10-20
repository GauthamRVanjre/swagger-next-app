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
