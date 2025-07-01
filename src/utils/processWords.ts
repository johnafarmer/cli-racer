import fs from 'fs';
import path from 'path';

// Read the words from the markdown file
const wordsFile = fs.readFileSync(path.join(process.cwd(), 'words-1151.md'), 'utf-8');
const allWords = wordsFile.trim().split('\n').filter(word => word.length > 0);

// Categorize words by difficulty
const easy: string[] = [];
const medium: string[] = [];
const hard: string[] = [];
const programming: string[] = [];

// Programming/tech keywords
const techKeywords = [
  'api', 'backend', 'frontend', 'javascript', 'php', 'mysql', 'css', 'html',
  'webhook', 'cdn', 'seo', 'analytics', 'cache', 'ssl', 'mcp', 'llm',
  'deployment', 'versioning', 'backup', 'rollback', 'cron', 'hook', 'filter',
  'template', 'loop', 'query', 'taxonomy', 'slug', 'permalink', 'wordpress',
  'woocommerce', 'marketo', 'hubspot', 'salesforce', 'wpengine', 'dev',
  'staging', 'production', 'ecommerce', 'theme', 'plugin', 'acf', 'crm',
  'mql', 'sql', 'integrations', 'tracking', 'gtm', 'tag', 'schema',
  'multisite', 'migration', 'sitemap', 'robots', 'indexing', 'crawl',
  'cro', 'ui', 'ux', 'responsive', 'accessibility', 'viewport', 'pixel',
  'rem', 'media', 'solidworks', 'solidcam', '3dexperience', 'driveworks',
  'camworks', 'cad', 'cam', 'plm', 'additive', '3dprinting', 'subtractive',
  'elearning', 'lms', 'subscription', 'checkout', 'cart', 'merchant',
  'sku', 'order', 'billing', 'customer', 'license', 'support', 'ticket',
  'inquiry', 'quote', 'sales', 'marketing', 'ops', 'integration',
  'abm', 'persona', 'nurture', 'lifecycle', 'drip', 'segmentation',
  'enrichment', 'lead', 'account', 'contact', 'opportunity', 'pipeline',
  'deal', 'custom', 'object', 'form', 'event', 'pixel', 'conversion',
  'revenue', 'webform', 'claude', 'openai', 'anthropic', 'chatgpt',
  'solidprofessor', 'racer', 'gems', 'a3d', 'hawk', 'ridge', 'systems'
];

allWords.forEach(word => {
  const lowerWord = word.toLowerCase();
  
  // Check if it's a tech/programming word
  if (techKeywords.some(tech => lowerWord.includes(tech))) {
    programming.push(word);
  }
  // Easy: 1-4 letters
  else if (word.length <= 4) {
    easy.push(word);
  }
  // Medium: 5-7 letters
  else if (word.length <= 7) {
    medium.push(word);
  }
  // Hard: 8+ letters
  else {
    hard.push(word);
  }
});

// Create the new words.json structure
const wordsData = {
  easy: easy.sort(() => Math.random() - 0.5),
  medium: medium.sort(() => Math.random() - 0.5),
  hard: hard.sort(() => Math.random() - 0.5),
  programming: programming.sort(() => Math.random() - 0.5)
};

// Write to assets/words.json
fs.writeFileSync(
  path.join(process.cwd(), 'assets/words.json'),
  JSON.stringify(wordsData, null, 2)
);

console.log(`Processed ${allWords.length} words:`);
console.log(`- Easy (1-4 letters): ${easy.length} words`);
console.log(`- Medium (5-7 letters): ${medium.length} words`);
console.log(`- Hard (8+ letters): ${hard.length} words`);
console.log(`- Programming/Tech: ${programming.length} words`);