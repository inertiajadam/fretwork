"use client";

import { useEffect } from "react";
import { recordPractice } from "@/lib/progress";

/* Mounted on tool pages: records that you practiced today (once per day). */
export default function PracticeTracker() {
  useEffect(() => {
    recordPractice();
  }, []);
  return null;
}
