import React from 'react';

const quotes = [
  "The best way to predict the future is to invent it. - Alan Kay",
  "Programs must be written for people to read, and only incidentally for machines to execute. - Harold Abelson",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
  "Give a man a program, frustrate him for a day. Teach a man to program, frustrate him for a lifetime. - Muhammad Waseem",
  "If debugging is the process of removing software bugs, then programming must be the process of putting them in. - Edsger Dijkstra",
  "Talk is cheap. Show me the code. - Linus Torvalds",
  "Learning to write programs stretches your mind, and helps you think better, creates a way of thinking about things that I think is helpful in all domains. - Bill Gates",
  "The computer was born to solve problems that did not exist before. - Bill Gates",
  "The most disastrous thing that you can ever learn is your first programming language. - Alan Kay",
  "Code never lies, comments sometimes do. - Ron Jeffries"
];

const DeveloperQuotes = () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const [quote, author] = randomQuote.split(' - ');

  return (
    <div className=' w-full h-auto bg-slate-900 text-blue-300 font-bold p-12 rounded-lg flex flex-col gap-5'>
      <h2 className='text-white'>✍️ Developer Quote</h2>
      <p>
        <span className="quote-text">&ldquo;{quote}&rdquo;</span>
        <span className="author-text"> - <span className="text-yellow-400">{author}</span></span>
      </p>
    </div>
  );
};

export default DeveloperQuotes;
