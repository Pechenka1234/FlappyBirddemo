export const generateRandomEase = (min = 80, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateBotHeight = (min = 240, max = 480) => Math.floor(Math.random() * (max - min + 1)) + min;
export const generatePipePairs = () => {
  const minHeight = 50;
  const maxHeight = 400;
  const gap = 150;
  const topHeight = Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
  const botHeight = 720 - topHeight - gap; // Оновлено до 720px
  console.log("Generated pipe heights:", [botHeight, topHeight]);
  return [botHeight, topHeight];
};

export const recordAnimationFrames = (callback) => {
  let fps = 60,
    interval = 1000 / fps,
    lastTime = new Date().getTime(),
    currentTime = 0,
    delta = 0,
    running = true,
    raf;
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };
  const start = () => {
    running = true;
    run();
  };
  const run = () => {
    raf = requestAnimationFrame(() => {
      currentTime = new Date().getTime();
      delta = currentTime - lastTime;
      if (delta > interval) {
        callback();
      }
      lastTime = currentTime - (delta % interval);
      if (running) run();
    });
  };
  start();
  return { start, stop };
};