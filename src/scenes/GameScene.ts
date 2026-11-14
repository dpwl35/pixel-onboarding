import { Container, Graphics, Sprite, Texture, type Renderer, type Ticker } from "pixi.js";
import { GAME_WIDTH, GAME_HEIGHT } from "../config";
import { isDown } from "../core/input";

const PLAYER_SPEED = 80; // 픽셀/초

export class GameScene extends Container {
  private player: Sprite;

  constructor(renderer: Renderer) {
    super();

    // 임시 플레이어: 8x8 픽셀 텍스처를 코드로 생성 (나중에 스프라이트 이미지로 교체)
    const g = new Graphics()
      .rect(0, 0, 8, 8).fill(0x41a6f6)
      .rect(2, 2, 1, 2).fill(0xffffff)
      .rect(5, 2, 1, 2).fill(0xffffff);
    const texture: Texture = renderer.generateTexture(g);
    texture.source.scaleMode = "nearest";

    this.player = new Sprite(texture);
    this.player.anchor.set(0.5);
    this.player.position.set(GAME_WIDTH / 2, GAME_HEIGHT / 2);
    this.addChild(this.player);
  }

  update(ticker: Ticker) {
    const dt = ticker.deltaMS / 1000;
    let dx = 0;
    let dy = 0;
    if (isDown("ArrowLeft", "KeyA")) dx -= 1;
    if (isDown("ArrowRight", "KeyD")) dx += 1;
    if (isDown("ArrowUp", "KeyW")) dy -= 1;
    if (isDown("ArrowDown", "KeyS")) dy += 1;
    if (dx && dy) {
      dx *= Math.SQRT1_2;
      dy *= Math.SQRT1_2;
    }

    const half = this.player.width / 2;
    this.player.x = clamp(this.player.x + dx * PLAYER_SPEED * dt, half, GAME_WIDTH - half);
    this.player.y = clamp(this.player.y + dy * PLAYER_SPEED * dt, half, GAME_HEIGHT - half);
  }
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
