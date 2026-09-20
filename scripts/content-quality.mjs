import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const roots = ["content", "app", "components"];
const files = [];

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    else if (/\.(ts|tsx)$/.test(entry.name)) files.push(path);
  }
}

for (const root of roots) await collect(root);

const rules = [
  ["apertura vacía", /\b(en (la )?(era|mundo|época) (digital|actual|moderna?))\b/giu],
  ["contraste binario", /\bno (se trata|es) (solo|sólo|únicamente|solamente)\b/giu],
  ["paralelismo no solo/sino", /\bno s[oó]lo\b[^.?!\n]{1,100}\bsino\b/giu],
  ["metadiscurso", /\b(cabe destacar|es importante destacar|conviene señalar|la clave está en|como podemos ver)\b/giu],
  ["grandilocuencia", /\b(revoluciona(?:r|rio|ria)?|sin precedentes|punto de inflexión|cambio de paradigma|de vanguardia)\b/giu],
  ["claim absoluto", /\b(garantiza(?:mos|r)?|elimina por completo|cero errores|siempre funciona)\b/giu],
  ["atribución vaga", /\b(los expertos coinciden|los estudios demuestran|según diversos estudios)\b/giu],
  ["cierre genérico", /\b(en conclusión|en definitiva|en resumen)\b/giu],
  ["promesa intercambiable", /\b(transformamos tu negocio|lleva tu negocio al siguiente nivel|soluciones innovadoras|potenciamos tu futuro|desbloquea todo el potencial)\b/giu],
];

const findings = [];
for (const file of files) {
  const source = await readFile(file, "utf8");
  for (const [name, pattern] of rules) {
    for (const match of source.matchAll(pattern)) {
      const line = source.slice(0, match.index).split("\n").length;
      findings.push(`${file}:${line} [${name}] ${match[0]}`);
    }
  }
}

if (findings.length) {
  console.error("El control editorial encontró patrones que requieren revisión:\n" + findings.join("\n"));
  process.exit(1);
}

console.log(`Control editorial superado en ${files.length} archivos.`);
