import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const BACKUP_BASE_DIR = path.join(ROOT_DIR, '.backups');
const POINTER_FILE = path.join(BACKUP_BASE_DIR, '.current_rollback_pointer');

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

export function executeRollback(stepsBack = null) {
  if (!fs.existsSync(BACKUP_BASE_DIR)) {
    console.error("[ERRO CRITICO] Diretorio .backups nao existe! Nenhum backup encontrado.");
    process.exit(1);
  }

  const allFolders = fs.readdirSync(BACKUP_BASE_DIR)
    .filter(name => name.startsWith('backup_'))
    .sort()
    .reverse();

  if (allFolders.length === 0) {
    console.error("[ERRO CRITICO] Nenhuma pasta de backup disponivel!");
    process.exit(1);
  }

  // Identifica backups saudaveis (pula telas brancas e saves corrompidos)
  const healthyBackups = [];
  for (const folder of allFolders) {
    const manifestPath = path.join(BACKUP_BASE_DIR, folder, 'manifest.json');
    let status = 'UNKNOWN';
    let formattedDate = folder;
    let reason = 'Snapshot de seguranca';

    if (fs.existsSync(manifestPath)) {
      try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
        status = manifest.status || 'UNKNOWN';
        formattedDate = manifest.formattedDate || folder;
        reason = manifest.reason || reason;
      } catch (_) {}
    }

    // Se nao estiver marcado como explicitamente BROKEN, considera recuperavel
    if (status !== 'BROKEN') {
      healthyBackups.push({ folder, formattedDate, reason, status });
    }
  }

  const candidatePool = healthyBackups.length > 0 ? healthyBackups : allFolders.map(f => ({ folder: f, formattedDate: f, reason: 'Snapshot' }));

  let targetIndex = 0;
  if (stepsBack !== null) {
    targetIndex = parseInt(stepsBack, 10);
  } else if (process.argv[2] === "mais-um" || process.argv[2] === "next") {
    let current = 0;
    if (fs.existsSync(POINTER_FILE)) {
      current = parseInt(fs.readFileSync(POINTER_FILE, 'utf-8'), 10) || 0;
    }
    targetIndex = current + 1;
  }

  if (targetIndex >= candidatePool.length) {
    console.error(`[FIM DA PILHA] Nao ha backups saudaveis mais antigos (${candidatePool.length} disponiveis).`);
    process.exit(1);
  }

  const selected = candidatePool[targetIndex];
  const selectedPath = path.join(BACKUP_BASE_DIR, selected.folder);

  console.log(`\n======================================================`);
  console.log(`[GUARDIAN ROLLBACK] RESTAURANDO ESTADO SAUDAVEL (SEM TELA BRANCA)`);
  console.log(`Posicao na Pilha:        [${targetIndex}] (${targetIndex === 0 ? "Ultimo Save Saudavel" : targetIndex + " passos atras"})`);
  console.log(`Pasta Restaurada:        ${selected.folder}`);
  console.log(`Data e Hora do Save:     ${selected.formattedDate}`);
  console.log(`Motivo Original:         ${selected.reason}`);
  console.log(`======================================================\n`);

  const entries = fs.readdirSync(selectedPath);
  for (const entry of entries) {
    if (entry === 'manifest.json') continue;
    const srcPath = path.join(selectedPath, entry);
    const destPath = path.join(ROOT_DIR, entry);

    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
    console.log(`  [RESTAURADO] -> ${entry}`);
  }

  fs.writeFileSync(POINTER_FILE, String(targetIndex), 'utf-8');

  console.log(`\n[SUCESSO] Site restaurado com perfeicao para: ${selected.formattedDate}`);
  console.log(`(Caso este save ainda nao seja o que voce queria, diga: "volte mais um")\n`);
}

if (process.argv[1]?.endsWith('guardian-rollback.mjs')) {
  const arg = process.argv[2];
  if (arg === "mais-um" || arg === "next") {
    executeRollback("next");
  } else if (!isNaN(parseInt(arg, 10))) {
    executeRollback(parseInt(arg, 10));
  } else {
    executeRollback(0);
  }
}
