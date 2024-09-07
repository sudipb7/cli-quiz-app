#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

const questions = [
  {
    question: "Which of the following is not a JavaScript framework?",
    options: ["React", "Angular", "Vue", "Laravel"],
    answer: "Laravel",
  },
  {
    question: "Which of the following is not a JavaScript library?",
    options: ["jQuery", "Lodash", "React", "Django"],
    answer: "Django",
  },
  {
    question: "Which of the following is not a JavaScript keyword?",
    options: ["this", "function", "then", "let"],
    answer: "then",
  },
  {
    question: "Which of the following is not a JavaScript operator?",
    options: ["typeof", "instanceof", "new", "this"],
    answer: "this",
  },
  {
    question: "Which of the following is not a JavaScript loop?",
    options: ["for", "while", "loop", "do-while"],
    answer: "loop",
  },
];

let playerName;

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  console.log(chalk.cyan("Welcome to the JavaScript Quiz!"));

  await sleep();

  console.log(`
    ${chalk.cyan("HOW TO PLAY")}
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.red("killed")}
    So get all the questions right...
  `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
  });
  playerName = answers.player_name;
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}` });
    process.exit(1);
  }
}

async function winner() {
  console.log(chalk.green("Congratulations, you're a winner!"));
  process.exit(0);
}

async function askQuestion(question, index) {
  const answers = await inquirer.prompt({
    name: "question",
    type: "list",
    message: `${index + 1}. ${question.question}`,
    choices: question.options,
  });

  return handleAnswer(answers.question === question.answer);
}

async function askQuestions() {
  for (let i = 0; i < questions.length; i++) {
    await askQuestion(questions[i], i);
  }
}

await welcome();
await askName();
await askQuestions();
winner();
