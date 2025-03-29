"use client";
import { useEffect } from "react";

export default function ScrollReset() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}
// This component will reset the scroll position to the top of the page whenever it is mounted.
// You can place this component at the top of your page or layout component to ensure that the scroll position is reset when navigating to that page.