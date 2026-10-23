
import { useState } from "react";
import {
  Code2,
  Trophy,
  X,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";
import "./RobotMascot.css";

const challenges = [
  {
    topic: "Java Basics",
    question: "Which keyword is used to inherit a class in Java?",
    code: null,
    options: ["implements", "extends", "inherits", "instanceof"],
    answer: 1,
    explanation:
      "The 'extends' keyword allows a Java class to inherit from another class.",
  },
  {
    topic: "Java Output",
    question: "What will this code print?",
    code: 'System.out.println(5 + 3 * 2);',
    options: ["16", "13", "11", "10"],
    answer: 2,
    explanation:
      "Multiplication happens before addition, so 5 + (3 × 2) = 11.",
  },
  {
    topic: "Java Strings",
    question: 'What is the result of "Java".length()?',
    code: null,
    options: ["3", "4", "5", "An error"],
    answer: 1,
    explanation:
      'The string "Java" contains four characters, so length() returns 4.',
  },
  {
    topic: "Java Loops",
    question: "How many times will this loop run?",
    code: "for (int i = 0; i < 3; i++)",
    options: ["2 times", "3 times", "4 times", "Infinite times"],
    answer: 1,
    explanation:
      "The loop runs for i = 0, 1, and 2. When i becomes 3, the condition is false.",
  },
  {
    topic: "Java Collections",
    question: "Which collection does not allow duplicate elements?",
    code: null,
    options: ["ArrayList", "LinkedList", "HashSet", "Vector"],
    answer: 2,
    explanation:
      "A HashSet stores unique elements and does not allow duplicates.",
  },
  {
    topic: "Java Data Types",
    question: "Which type stores true or false values in Java?",
    code: null,
    options: ["int", "String", "char", "boolean"],
    answer: 3,
    explanation:
      "The primitive boolean type stores either true or false.",
  },
  {
    topic: "Java Arrays",
    question: "What is the first index of a Java array?",
    code: null,
    options: ["0", "1", "-1", "It depends on the array"],
    answer: 0,
    explanation:
      "Java arrays use zero-based indexing, so the first element is at index 0.",
  },
];

function getTodayIndex() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const day = Math.floor((now - start) / 86400000);
  return day % challenges.length;
}

export default function RobotMascot() {
  const [isOpen, setIsOpen] = useState(false);
  const [challengeIndex, setChallengeIndex] = useState(getTodayIndex);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);

  const challenge = challenges[challengeIndex];
  const isCorrect = selected === challenge.answer;

  function chooseAnswer(index) {
    if (!checked) setSelected(index);
  }

  function checkAnswer() {
    if (selected !== null) setChecked(true);
  }

  function nextChallenge() {
    setChallengeIndex((current) => (current + 1) % challenges.length);
    setSelected(null);
    setChecked(false);
  }

  function openChallenge() {
    setIsOpen((current) => !current);
  }

  return (
    <div className="robot-challenge-wrap">
      <button
        type="button"
        className="robot-image-button"
        onClick={openChallenge}
        aria-expanded={isOpen}
        aria-label="Open the daily coding challenge"
        title="Try today's coding challenge!"
      >
        <img
          className="modern-robot-image"
          src="/images/dkoder-robot.png"
          alt="DKoder coding robot"
        />
        <span className="robot-challenge-badge">
          <Sparkles size={14} /> {isOpen ? "Let's code!" : "Tap to play"}
        </span>
      </button>

      {isOpen && (
        <section className="daily-challenge-panel" aria-label="Daily coding challenge">
          <div className="challenge-header">
            <div className="challenge-heading-icon">
              <Trophy size={21} />
            </div>

            <div className="challenge-heading-text">
              <span className="challenge-eyebrow">DKODER DAILY</span>
              <h3>Code Challenge</h3>
            </div>

            <button
              type="button"
              className="challenge-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close challenge"
            >
              <X size={19} />
            </button>
          </div>

          <div className="challenge-topic">{challenge.topic}</div>
          <p className="challenge-question">{challenge.question}</p>

          {challenge.code && (
            <pre className="challenge-code">
              <code>{challenge.code}</code>
            </pre>
          )}

          <div className="challenge-options">
            {challenge.options.map((option, index) => {
              let className = "challenge-option";

              if (selected === index) className += " selected";

              if (checked && index === challenge.answer) {
                className += " correct";
              } else if (checked && selected === index) {
                className += " incorrect";
              }

              return (
                <button
                  key={option}
                  type="button"
                  className={className}
                  onClick={() => chooseAnswer(index)}
                  disabled={checked}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>

                  {checked && index === challenge.answer && (
                    <CheckCircle2 size={17} />
                  )}

                  {checked && selected === index && !isCorrect && (
                    <XCircle size={17} />
                  )}
                </button>
              );
            })}
          </div>

          {checked && (
            <div
              className={`challenge-feedback ${
                isCorrect ? "feedback-correct" : "feedback-incorrect"
              }`}
              role="status"
            >
              <strong>
                {isCorrect ? "Correct! Great job! 🎉" : "Not quite! Keep learning."}
              </strong>
              <p>{challenge.explanation}</p>
            </div>
          )}

          {!checked ? (
            <button
              type="button"
              className="challenge-submit"
              onClick={checkAnswer}
              disabled={selected === null}
            >
              Check Answer <Code2 size={17} />
            </button>
          ) : (
            <button
              type="button"
              className="challenge-submit"
              onClick={nextChallenge}
            >
              <RotateCcw size={16} /> Try Another Challenge
            </button>
          )}

          <p className="challenge-footer">
            Choose an answer and test your skills.
          </p>
        </section>
      )}
    </div>
  );
}
