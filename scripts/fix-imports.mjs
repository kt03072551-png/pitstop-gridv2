import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace default import of Link
    content = content.replace(/import Link from ["']next\/link["'];?/g, 'import { Link } from "@/i18n/routing";');

    // Handle next/navigation imports (useRouter, usePathname, redirect)
    // We can't just blindly replace next/navigation because it might import other things (e.g., useSearchParams, notFound)
    // We should be careful. Let's just find and replace the specific imports if we can, or modify the line.
    
    let hasChanges = false;
    
    // Quick regex to extract from next/navigation
    const navImportRegex = /import\s+{([^}]+)}\s+from\s+["']next\/navigation["'];?/g;
    content = content.replace(navImportRegex, (match, importsStr) => {
        let imports = importsStr.split(',').map(s => s.trim());
        let routingImports = [];
        let nextImports = [];
        
        for (let imp of imports) {
            if (['useRouter', 'usePathname', 'redirect'].includes(imp)) {
                routingImports.push(imp);
            } else if (imp) {
                nextImports.push(imp);
            }
        }
        
        let result = '';
        if (routingImports.length > 0) {
            result += `import { ${routingImports.join(', ')} } from "@/i18n/routing";\n`;
        }
        if (nextImports.length > 0) {
            result += `import { ${nextImports.join(', ')} } from "next/navigation";`;
        }
        return result.trim();
    });

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed', filePath);
    }
  }
});
