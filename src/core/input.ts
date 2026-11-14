// 키보드 입력 상태를 추적하는 간단한 헬퍼
const pressed = new Set<string>();

window.addEventListener("keydown", (e) => {
  pressed.add(e.code);
  if (e.code.startsWith("Arrow") || e.code === "Space") e.preventDefault();
});
window.addEventListener("keyup", (e) => pressed.delete(e.code));
window.addEventListener("blur", () => pressed.clear());

export function isDown(...codes: string[]): boolean {
  return codes.some((c) => pressed.has(c));
}
