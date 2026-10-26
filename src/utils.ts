export function cn(...classes: string[]) {
  return classes.filter((c) => c.length > 0).join(" ");
}