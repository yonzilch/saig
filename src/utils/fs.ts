import fs from "node:fs";
import path from "node:path";

const README_CANDIDATES = ["README.md", "readme.md", "Readme.md", "README.MD"];

export function findReadme(dirPath: string): string | null {
  for (const candidate of README_CANDIDATES) {
    const filePath = path.join(dirPath, candidate);
    try {
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        return filePath;
      }
    } catch (e) {
      continue;
    }
  }
  return null;
}

export interface DirectoryItem {
  name: string;
  isDir: boolean;
  href: string;
}

export function getDirectoryItems(
  dirPath: string,
  baseHref: string = "",
): DirectoryItem[] {
  try {
    return fs
      .readdirSync(dirPath)
      .map((item) => {
        const itemFullPath = path.join(dirPath, item);
        let isDir = false;
        try {
          isDir = fs.statSync(itemFullPath).isDirectory();
        } catch (e) {
          return null;
        }
        const href = baseHref ? `${baseHref}/${item}` : `/${item}`;
        return { name: item, isDir, href };
      })
      .filter((item): item is DirectoryItem => item !== null)
      .sort((a, b) => {
        if (a.isDir && !b.isDir) return -1;
        if (!a.isDir && b.isDir) return 1;
        return a.name.localeCompare(b.name, "zh-CN");
      });
  } catch (e) {
    console.error(`Error reading directory ${dirPath}:`, e);
    return [];
  }
}

export function getAllDirs(srcPath: string): string[] {
  const dirs: string[] = [];
  try {
    const items = fs.readdirSync(srcPath, { withFileTypes: true });
    for (const item of items) {
      if (item.isDirectory()) {
        const fullPath = path.join(srcPath, item.name);
        dirs.push(fullPath);
        dirs.push(...getAllDirs(fullPath));
      }
    }
  } catch (e) {
    console.error(`Error scanning directory ${srcPath}:`, e);
  }
  return dirs;
}

export function pathExists(targetPath: string): boolean {
  return fs.existsSync(targetPath);
}

export function readFile(
  filePath: string,
  encoding: BufferEncoding = "utf-8",
): string {
  return fs.readFileSync(filePath, encoding);
}

export function findCaseInsensitivePath(targetPath: string): string | null {
  const parts = targetPath.split(path.sep).filter((p) => p.length > 0);
  if (parts.length === 0) return targetPath;

  let currentPath = "";

  for (const part of parts) {
    const parentDir = currentPath || ".";
    try {
      const items = fs.readdirSync(parentDir);
      const match = items.find(
        (item) => item.toLowerCase() === part.toLowerCase(),
      );
      if (match) {
        currentPath = path.join(currentPath, match);
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }

  return currentPath;
}

export function getCaseVariants(dirPath: string): string[] {
  const variants = new Set<string>();
  variants.add(dirPath);
  variants.add(dirPath.toLowerCase());
  variants.add(dirPath.toUpperCase());
  return Array.from(variants);
}
