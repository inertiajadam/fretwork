"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPractice, getQuizStats } from "@/lib/progress";
import styles from "./ProgressSummary.module.css";

const QUIZ_META = {
  "ear-trainer": { name: "Ear Trainer", href: "/tools/ear-trainer" },
  "nashville-trainer": { name: "Nashville Trainer", href: "/tools/nashville-trainer" },
};

export default function ProgressSummary() {
  const [practice, setPractice] = useState(null);
  const [quiz, setQuiz] = useState({});

  useEffect(() => {
    setPractice(getPractice());
    setQuiz(getQuizStats());
  }, []);

  if (!practice) return null;

  const quizzes = Object.entries(quiz);
  const started = practice.total > 0 || quizzes.length > 0;

  return (
    <div className={styles.wrap}>
      <div className={styles.tiles}>
        <div className={styles.tile}>
          <span className={styles.num}>{practice.current}</span>
          <span className={styles.lbl}>day streak</span>
        </div>
        <div className={styles.tile}>
          <span className={styles.num}>{practice.longest}</span>
          <span className={styles.lbl}>longest streak</span>
        </div>
        <div className={styles.tile}>
          <span className={styles.num}>{practice.total}</span>
          <span className={styles.lbl}>days practiced</span>
        </div>
      </div>

      {quizzes.length > 0 && (
        <div className={styles.quizzes}>
          {quizzes.map(([id, s]) => {
            const meta = QUIZ_META[id] || { name: id, href: "/tools" };
            return (
              <Link key={id} href={meta.href} className={styles.quiz}>
                <span className={styles.quizName}>{meta.name}</span>
                <span className={styles.quizStat}>
                  best streak {s.bestStreak}
                  {s.bestPct ? ` · best ${s.bestPct}%` : ""}
                </span>
              </Link>
            );
          })}
        </div>
      )}

      {!started && (
        <p className={styles.hint}>
          Use any tool to start your streak. Scores from the Ear Trainer and
          Nashville Trainer quizzes will show up here.
        </p>
      )}
    </div>
  );
}
