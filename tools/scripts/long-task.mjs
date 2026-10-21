// Simulates a long-running task. Usage: node long-task.mjs <name> [durationSeconds]
// Without an explicit duration, picks a random duration between LONG_TASK_MIN_SECONDS and LONG_TASK_MAX_SECONDS (default 4-6 minutes).
const name = process.argv[2] ?? 'task';
const minSeconds = Number(process.env.LONG_TASK_MIN_SECONDS ?? 240);
const maxSeconds = Number(process.env.LONG_TASK_MAX_SECONDS ?? 360);
const explicitSeconds = process.argv[3] ?? process.env.LONG_TASK_SECONDS;
const durationSeconds =
  explicitSeconds !== undefined
    ? Number(explicitSeconds)
    : Math.round(minSeconds + Math.random() * (maxSeconds - minSeconds));
const intervalSeconds = 30;

const start = Date.now();
console.log(`[${name}] starting, will run for ${durationSeconds}s`);

const timer = setInterval(() => {
  const elapsed = Math.round((Date.now() - start) / 1000);
  console.log(`[${name}] ${elapsed}s / ${durationSeconds}s elapsed`);
}, intervalSeconds * 1000);

setTimeout(() => {
  clearInterval(timer);
  console.log(
    `[${name}] done after ${Math.round((Date.now() - start) / 1000)}s`,
  );
}, durationSeconds * 1000);
