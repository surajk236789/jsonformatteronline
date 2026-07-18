const fs = require('fs');

const path = 'd:\\Project\\jsonformatteronline\\AGENTIC_GUIDE.md';
let content = fs.readFileSync(path, 'utf8');

// Replace Utilities block
const utilitiesRegex = /\*\*.*? Utilities\*\*\n\| Label \| Route \| Component \|\n\|---\|---\|---\|\n\| Cron Parser \| `\/tools\/cron-parser` \| CronParser\.tsx \|\n\| Password Generator \| `\/tools\/password-generator` \| PasswordGenerator\.tsx \|\n\| Git Command Generator \| `\/tools\/git-command-generator` \| GitCommandGenerator\.tsx \|\n\| HTTP Status Codes \| `\/tools\/http-status-codes` \| HttpStatusCodes\.tsx \|/m;

const replacement = `**📈 SEO Tools**
| Label | Route | Component |
|---|---|---|
| SEO Checker | \`/tools/seo-checker\` | SeoChecker.tsx |
| Meta Tag Generator | \`/tools/meta-tag-generator\` | MetaTagGenerator.tsx |
| Robots.txt Generator | \`/tools/robots-txt-generator\` | RobotsTxtGenerator.tsx |
| XML Sitemap Generator | \`/tools/sitemap-generator\` | SitemapGenerator.tsx |

**🛠️ Utilities**
| Label | Route | Component |
|---|---|---|
| Cron Parser | \`/tools/cron-parser\` | CronParser.tsx |
| Password Generator | \`/tools/password-generator\` | PasswordGenerator.tsx |
| Git Command Generator | \`/tools/git-command-generator\` | GitCommandGenerator.tsx |
| HTTP Status Codes | \`/tools/http-status-codes\` | HttpStatusCodes.tsx |
| Unix Timestamp Converter | \`/tools/unix-timestamp-converter\` | UnixTimestampConverter.tsx |
| Timezone Converter | \`/tools/timezone-converter\` | TimezoneConverter.tsx |`;

content = content.replace(utilitiesRegex, replacement);

// Replace styling rule
const stylingRegex = /### 3\. Styling\n\* Tailwind CSS v4\. Strict utility classes only\. Always include `dark:` variants\./m;
const stylingReplacement = `### 3. Styling & Components
* Tailwind CSS v4. Strict utility classes only. Always include \`dark:\` variants.
* **Standard Button**: NEVER use native \`<button>\`. Always import and use \`<Button variant="..." size="...">\` from \`app/components/ui/Button.tsx\`. Defaults to \`variant="primary"\` and \`size="md"\`.`;

content = content.replace(stylingRegex, stylingReplacement);

fs.writeFileSync(path, content, 'utf8');
console.log('AGENTIC_GUIDE.md updated successfully.');
