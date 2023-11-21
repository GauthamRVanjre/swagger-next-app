export default function Home() {
  return (
    <>
      <section>
        <h1 className="text-center text-3xl mb-8">Are you a robot?</h1>
        <form className="flex flex-col justify-center w-80 mx-auto gap-4">
          <input
            placeholder="first name"
            className="border rounded-xl border-blue-500 px-2 text-xl"
            type="text"
          />
          <input
            placeholder="last name"
            className="border rounded-xl border-blue-500 px-2 text-xl"
            type="text"
          />
          <input
            placeholder="email"
            className="border rounded-xl border-blue-500 px-2 text-xl"
            type="text"
          />

          {/* captcha stuff */}
          <input
            type="submit"
            className="border rounded-xl border-blue-500"
            value="submit"
          />
        </form>
      </section>
    </>
  );
}
