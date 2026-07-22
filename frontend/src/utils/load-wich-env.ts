import path from "path";
import fs from "fs";
import { config } from "dotenv";

/**
 * Esse arquivo carrega o arquivo env dinamicamente
 *
 * Prioridades de uso:
 *    1. Se na raiz do projeto existir .env.local vai usar -> .env.local
 *    2. Se não existir .env.local vai usar ->  /dotenv/.env.development
 *    3. Se não existir .env.development vai usar ->  /dotenv/.env.stage
 *    4. Se não existir .env.stage vai usar ->  /dotenv/.env
 */
const loadWichEnv = () => {
  const envLocal = path.resolve(process.cwd(), "dotenv/.env.local");
  const envProduction = path.resolve(process.cwd(), "dotenv/.env");
  const envDevelop = path.resolve(process.cwd(), "dotenv/.env.development");
  const envStage = path.resolve(process.cwd(), "dotenv/.env.stage");

  // Verificando se ao menos 1 arquivo existe
  if (
    !fs.existsSync(envLocal) &&
    !fs.existsSync(envProduction) &&
    !fs.existsSync(envDevelop) &&
    !fs.existsSync(envStage)
  ) {
    throw new Error("Nenhum arquivo .env não encontrado");
  }

  // Use a .env existente no projeto baseado na prioridade configurada
  const envPath = fs.existsSync(envLocal)
    ? envLocal
    : fs.existsSync(envDevelop)
      ? envDevelop
      : fs.existsSync(envStage)
        ? envStage
        : fs.existsSync(envProduction)
          ? envProduction
          : "";

  config({ path: envPath });
};

export default loadWichEnv;

/**
 * O override nesse caso certifica de que se o prieiro caminho for encontrado,
 * os demais não sobresqueverão ele.
 */
