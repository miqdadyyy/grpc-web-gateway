setInterval(() => {
  const usage = process.memoryUsage();
  const stats = Object.keys(usage).map(
    key => `${key}: ${roundToMb(usage[key])}`,
  );
  console.log(`[memory-usage] ${stats.join(', ')}`);
}, 1000);

function roundToMb(bytes) {
  return Math.round((bytes / 1024 / 1024) * 100) / 100;
}
