import "./style.css";
import { Application, TextureSource } from "pixi.js";
import { GAME_WIDTH, GAME_HEIGHT, BACKGROUND_COLOR } from "./config";
import { GameScene } from "./scenes/GameScene";

// 픽셀아트: 모든 텍스처를 기본적으로 nearest(블러 없음) 필터로
TextureSource.defaultOptions.scaleMode = "nearest";

async function boot() {
  const app = new Application();
  await app.init({
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    background: BACKGROUND_COLOR,
    antialias: false,
    roundPixels: true,
    resolution: 1,
  });

  document.getElementById("app")!.appendChild(app.canvas);

  // 창 크기에 맞춰 캔버스를 정수배로 확대 (픽셀이 깨지지 않도록)
  const fit = () => {
    const scale = Math.max(1, Math.floor(Math.min(window.innerWidth / GAME_WIDTH, window.innerHeight / GAME_HEIGHT)));
    app.canvas.style.width = `${GAME_WIDTH * scale}px`;
    app.canvas.style.height = `${GAME_HEIGHT * scale}px`;
  };
  window.addEventListener("resize", fit);
  fit();

  const scene = new GameScene(app.renderer);
  app.stage.addChild(scene);
  app.ticker.add((ticker) => scene.update(ticker));
}

boot();
