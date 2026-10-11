
"use client";
import { useEffect, useState } from "react";

const formatToday = () =>
  new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

export default function TodayDate() {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(formatToday());
    const id = setInterval(() => setText(formatToday()), 60_000);
    return () => clearInterval(id);
  }, []);

  return <>{text}</>;
}