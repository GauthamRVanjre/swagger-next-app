import prisma from "@/prisma/prisma";

type requestBody = {
  body: string;
  title: string;
};

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
