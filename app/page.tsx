"use client";
import React, { FormEvent, useRef } from "react";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Home() {
  const [captcha, setCaptcha] = useState<String | null>("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const onSubmitWithReCAPTCHA = async (event: FormEvent) => {
    event.preventDefault();
    const token = await recaptchaRef.current?.executeAsync();

    // Pass to Next.js API Route
    // const res = await fetch("/api/subscribe", {
    //   method: "POST",
    //   body: JSON.stringify({  captcha }),
    //   headers: { "Content-type": "application/json" },
    // });

    console.log("token", token);
    // apply to form data
  };
  return (
    <>
      <section>
        <h1 className="text-center text-3xl mb-8">Are you a robot?</h1>
        <form
          onSubmit={onSubmitWithReCAPTCHA}
          className="flex flex-col justify-center w-80 mx-auto gap-4"
        >
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

          {/* <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={setCaptcha}
          /> */}
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={setCaptcha}
          />

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
