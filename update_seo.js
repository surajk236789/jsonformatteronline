const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'app', '(tools)', 'tools');
const dirs = fs.readdirSync(toolsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name !== '[slug]' && dirent.name !== 'cron-parser')
  .map(dirent => dirent.name);

dirs.forEach(dir => {
  const pagePath = path.join(toolsDir, dir, 'page.tsx');
  if (!fs.existsSync(pagePath)) return;
  
  let content = fs.readFileSync(pagePath, 'utf8');
  
  // 1. Extract and update metadata
  const metadataRegex = /export const metadata: Metadata = \{([\s\S]*?)\};/;
  const match = content.match(metadataRegex);
  
  if (match) {
    const metaBody = match[1];
    
    // Extract title
    const titleMatch = metaBody.match(/title:\s*"(.*?)"/);
    let newTitle = titleMatch ? titleMatch[1] : '';
    
    // Clean up title (remove | Developer Tools or — Free Tool etc)
    newTitle = newTitle.replace(/\s*(\|.*|—.*Online|—.*Tool)/, '');
    if (!newTitle.toLowerCase().includes('online')) {
       newTitle = `Online ${newTitle}`;
    }
    
    // Extract description
    const descMatch = metaBody.match(/description:\s*"(.*?)"/);
    const desc = descMatch ? descMatch[1] : '';
    
    const keywordsMatch = metaBody.match(/keywords:\s*(\[.*?\])/s);
    const keywords = keywordsMatch ? keywordsMatch[1] : '[]';
    
    const canonicalMatch = metaBody.match(/canonical:\s*"(.*?)"/);
    const canonicalUrl = canonicalMatch ? canonicalMatch[1] : `https://www.allformatter.com/tools/${dir}`;
    
    const newMetadata = `export const metadata: Metadata = {
  title: "${newTitle}",
  description: "${desc}",
  keywords: ${keywords},
  alternates: { canonical: "${canonicalUrl}" },
  openGraph: {
    title: "${newTitle}",
    description: "${desc}",
    url: "${canonicalUrl}",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "${newTitle}",
    description: "${desc}",
  },
  robots: {
    index: true,
    follow: true,
  }
};`;

    content = content.replace(metadataRegex, newMetadata);
  }
  
  // 2. Inject JSON-LD
  const funcRegex = /export default function (\w+)\(\) \{/;
  const funcMatch = content.match(funcRegex);
  
  if (funcMatch && !content.includes('application/ld+json')) {
    const titleMatch2 = content.match(/title:\s*"(.*?)"/);
    let newTitle2 = titleMatch2 ? titleMatch2[1] : 'Tool';
    const nameStr = newTitle2.replace('Online ', '').replace(' &', ' and');
    
    const descMatch2 = content.match(/description:\s*"(.*?)"/);
    const desc2 = descMatch2 ? descMatch2[1] : '';
    const canonicalUrl2 = `https://www.allformatter.com/tools/${dir}`;
    
    const jsonLdCode = `
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "${nameStr}",
        "url": "${canonicalUrl2}",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "${desc2}",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq: any) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };
`;
    
    content = content.replace(funcRegex, `export default function ${funcMatch[1]}() {${jsonLdCode}`);
    
    // 3. Insert <script> into return
    const returnRegex = /return \(\s*<>/;
    const scriptTag = `
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />`;
    
    content = content.replace(returnRegex, `return (\n    <>${scriptTag}`);
  }
  
  fs.writeFileSync(pagePath, content, 'utf8');
  console.log(`Updated ${dir}`);
});
