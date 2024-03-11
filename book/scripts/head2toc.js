const fs = require('fs').promises;
const path = require('path');

const basePath = __dirname;

const configPath = path.join(basePath, '../vivliostyle.config.js');
const { entryContext, entry } = require(configPath);

const skipFiles = new Set(["cover.md", "toc.md", "colophon.md"]);

// 特殊文字のリスト
const specialCharsToRemove = /[？]/g;

const transformTitleForURL = (title) => {
    // 空白を'-'に変換、特殊文字を削除
    return title.toLowerCase().replace(/\s+/g, '-').replace(specialCharsToRemove, '');
};

const extractHeadingsFromFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const cleanedData = data.replace(/```[\s\S]*?```/gm, '');
        const headings = cleanedData.match(/^#{1,2} .+/gm);
        const fileNameWithoutExt = path.basename(filePath, '.md');
        
        let toc = [];
        
        if (headings) {
            headings.forEach((heading) => {
                const level = (heading.match(/#/g) || []).length;
                const title = heading.replace(/#+ /, '');

                let link;
                if (level === 1) {
                    link = fileNameWithoutExt + '.html';
                } else {
                    const transformedTitle = transformTitleForURL(title);
                    link = `${fileNameWithoutExt}.html#${transformedTitle}`;
                }
                
                const tocItem = `${'    '.repeat(level - 1)}1.  [${title}](${link})`;
                toc.push(tocItem);
            });
        }
        return toc;
    } catch (err) {
        console.error(`読み込みエラー: ${err}`);
        return [];
    }
};

const main = async () => {
    let fullToc = ['<nav id="toc" role="doc-toc">', '', '## 目次', ''];
    
    for (const entryFile of entry) {
        if (!skipFiles.has(entryFile)) {
            const fullPath = path.join(basePath, '../', entryContext, entryFile);
            const toc = await extractHeadingsFromFile(fullPath);
            fullToc = fullToc.concat(toc);
        }
    }

    fullToc.push('', '</nav>');
    
    await fs.writeFile(path.join(basePath, '../', entryContext, 'toc.md'), fullToc.join('\n'));
};

main();
