import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ROOT_DIR = process.cwd();
const BACKUP_BASE_DIR = path.join(ROOT_DIR, '.backups');

const PROTECTED_TARGETS = ['src', 'public', 'index.html', 'vite.config.js', 'package.json', '.antigravityrules'];
const IGNORE_PATTERNS = ['node_modules', '.git', 'dist', '.backups'];

function getTimestamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const mins = pad(now.getMinutes());
  const secs = pad(now.getSeconds());
  return `backup_${year}-${month}-${day}_${hours}-${mins}-${secs}`;
}

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    if (IGNORE_PATTERNS.includes(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function checkProjectHealth() {
  try {
    execSync('npm run build', { stdio: 'pipe', timeout: 20000 });
    return 'HEALTHY';
  } catch (err) {
    return 'BROKEN';
  }
}

export function createBackup(reason = "Snapshot automatico pre-operacao") {
  const timestampId = getTimestamp();
  const backupFolder = path.join(BACKUP_BASE_DIR, timestampId);
  fs.mkdirSync(backupFolder, { recursive: true });

  const healthStatus = checkProjectHealth();

  const manifest = {
    id: timestampId,
    timestamp: new Date().toISOString(),
    formattedDate: new Date().toLocaleString('pt-BR'),
    status: healthStatus,
    reason,
    backedUpFiles: []
  };

  for (const target of PROTECTED_TARGETS) {
    const fullSource = path.join(ROOT_DIR, target);
    if (!fs.existsSync(fullSource)) continue;

    const fullDest = path.join(backupFolder, target);
    const stat = fs.statSync(fullSource);

    if (stat.isDirectory()) {
      copyDirRecursive(fullSource, fullDest);
    } else {
      fs.copyFileSync(fullSource, fullDest);
    }
    manifest.backedUpFiles.push(target);
  }

  fs.writeFileSync(
    path.join(backupFolder, 'manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf-8'
  );

  try {
    const allBackups = fs.readdirSync(BACKUP_BASE_DIR)
      .filter(name => name.startsWith('backup_'))
      .sort()
      .reverse();

    if (allBackups.length > 50) {
      allBackups.slice(50).forEach(oldDir => {
        fs.rmSync(path.join(BACKUP_BASE_DIR, oldDir), { recursive: true, force: true });
      });
    }
  } catch (_) {}

  console.log(`\n======================================================`);
  console.log(`[GUARDIAN] BACKUP TEMPORAL SALVO COM SUCESSO!`);
  console.log(`ID do Save:    ${timestampId}`);
  console.log(`Data e Hora:   ${manifest.formattedDate}`);
  console.log(`Status Saude:  ${manifest.status === 'HEALTHY' ? 'SAUDAVEL (COMPILANDO 100%)' : 'ATENCAO: BROKEN (COM ERRO)'}`);
  console.log(`Destino:       ${backupFolder}`);
  console.log(`======================================================\n`);

  return backupFolder;
}

if (process.argv[1]?.endsWith('guardian-backup.mjs')) {
  createBackup(process.argv[2] || "Snapshot automatico pre-operacao");
}
