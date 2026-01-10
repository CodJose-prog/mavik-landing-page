export function formatBRPhone(input: string) {
  const digits = input.replace(/\D/g, "").slice(0, 11);

  const ddd = digits.slice(0, 2);
  const n1 = digits.slice(2, 3);
  const n2 = digits.slice(3, 7);
  const n3 = digits.slice(7, 11);

  if (digits.length <= 2) return digits ? `(${ddd}` : "";
  if (digits.length <= 3) return `(${ddd}) ${n1}`;
  if (digits.length <= 7) return `(${ddd}) ${n1} ${n2}`;
  return `(${ddd}) ${n1} ${n2}-${n3}`;
}
