// Vercel Edge Middleware: Markdown Content Negotiation & Agent-Friendly 404s
// Conforms to is-agentic and acceptmarkdown.com standards

export default function middleware(request) {
  const url = new URL(request.url);
  const acceptHeader = request.headers.get('accept') || '';

  // Content negotiation: return structured markdown when Accept: text/markdown is requested
  if (acceptHeader.includes('text/markdown')) {
    // Check if the agent is probing for 404 or a nonexistent route
    if (url.pathname.startsWith('/__ora-404-probe') || url.pathname.startsWith('/404')) {
      const notFoundBody = `# 404 - Resource Not Found

The requested path \`${url.pathname}\` does not exist on Nth Dimension Academy.

Please refer to:
- Official Website: https://nthdimensionacademy.com/
- Machine Guidance: https://nthdimensionacademy.com/llms.txt
- Comprehensive Spec: https://nthdimensionacademy.com/llms-full.txt
- XML Sitemap: https://nthdimensionacademy.com/sitemap.xml
`;
      return new Response(notFoundBody, {
        status: 404,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Vary': 'Accept',
          'Cache-Control': 'no-cache'
        }
      });
    }

    // Homepage markdown response
    if (url.pathname === '/' || url.pathname === '') {
      const markdownHomepage = `# Nth Dimension Academy

> Master the Data Multiverse. Microsoft Fabric & Azure Databricks certification training and enterprise enablement led by Microsoft Certified Trainer (MCT) Navakanth Reddy Dumpa.

## Core Specializations & Learning Atlases
- **DP-600**: Implementing Analytics Solutions Using Microsoft Fabric — https://nthdimensionacademy.com/dp600-atlas/
- **DP-700**: Implementing Data Engineering Solutions Using Microsoft Fabric — https://nthdimensionacademy.com/dp700-atlas/
- **DP-750**: Implementing Data Engineering Solutions Using Microsoft Azure Databricks — https://nthdimensionacademy.com/dp750-atlas/
- **DP-800**: Implementing a Microsoft Fabric Data Warehouse — https://nthdimensionacademy.com/dp800-atlas/
- **AI-103**: Azure AI Foundry & Generative AI Solutions — https://nthdimensionacademy.com/ai103-atlas/

## Machine-Readable Specifications
- Agent Instructions: https://nthdimensionacademy.com/llms.txt
- Comprehensive Curriculum Spec: https://nthdimensionacademy.com/llms-full.txt
- Sitemaps: https://nthdimensionacademy.com/sitemap.xml

## Trust & Verification
- About: https://nthdimensionacademy.com/about/
- Contact: https://nthdimensionacademy.com/contact/
- Privacy: https://nthdimensionacademy.com/privacy/
- Terms: https://nthdimensionacademy.com/terms/
- Lead Instructor: Navakanth Reddy Dumpa, MCT
- Location: Hyderabad, Telangana, India
- Email: mct@nthdimensionacademy.com
- Telephone: +91 6304980314
`;

      return new Response(markdownHomepage, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Vary': 'Accept',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }
  }

  // Pass-through for standard browser requests
}

export const config = {
  matcher: ['/', '/__ora-404-probe:path*']
};
