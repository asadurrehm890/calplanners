// app/data/caseStudies.ts
export interface CaseStudy {
  id: number;
  title: string;
  client: string;
  slug: string;
  excerpt: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  date: string;
  results: string[];
  challenges: string[];
  solution: string[];
  technologies: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Live Selling App with Real-Time Chat",
    client: "burdauea.com",
    slug: "burdauea-live-selling-app",
    excerpt: "Custom live selling Shopify app with real-time chat, product selection, and seamless checkout integration that boosted conversion rates by 35%.",
    description: "burdauea.com is a fast-growing e-commerce brand looking to leverage live selling to increase engagement and sales. They needed a custom Shopify app that would allow them to host live streams directly from their store with real-time interaction and seamless purchasing.",
    image: "/images/case-studies/live-selling.jpg",
    category: "Shopify App Development",
    tags: ["Live Selling", "Real-Time Chat", "E-commerce", "Shopify"],
    date: "March 15, 2026",
    results: [
      "35% increase in conversion rates during live streams",
      "45% higher average order value compared to regular shopping",
      "Reduced cart abandonment by 28%",
      "Over 10,000 unique viewers in the first month"
    ],
    challenges: [
      "Integrating real-time chat with Shopify's existing infrastructure",
      "Ensuring seamless product selection and checkout within the stream",
      "Handling high traffic during live events without performance issues",
      "Creating an intuitive admin interface for stream management"
    ],
    solution: [
      "Built a custom Shopify app with React for the frontend and Node.js for the backend",
      "Implemented WebSocket for real-time chat functionality",
      "Created a dedicated admin page for stream management with product selection",
      "Integrated with Shopify's API for seamless add-to-cart and checkout",
      "Optimized for performance to handle concurrent users during live streams"
    ],
    technologies: ["React", "Node.js", "WebSocket", "Shopify API", "GraphQL", "Redis"],
    testimonial: {
      quote: "The live selling app has completely transformed our e-commerce strategy. We've seen incredible engagement and sales during our live streams. The real-time chat feature has been a game-changer for customer interaction.",
      author: "Sarah Johnson",
      position: "CEO, burdauea.com"
    }
  },
  {
    id: 2,
    title: "Bulk Product Importer with Full Media Support",
    client: "parts4gsm.com",
    slug: "parts4gsm-bulk-product-importer",
    excerpt: "Custom product importer that overcomes Shopify's limitations by importing complex product data including images, videos, variants, metafields, and metaobjects.",
    description: "parts4gsm.com needed to migrate thousands of products from their Lighthouse CMS to Shopify. Shopify's native import tool couldn't handle their complex product data including media files, multiple variants, metafields, and metaobjects.",
    image: "/images/case-studies/bulk-import.jpg",
    category: "Shopify Integration",
    tags: ["Bulk Import", "Data Migration", "API Integration", "Shopify"],
    date: "February 28, 2026",
    results: [
      "Imported 15,000+ products in under 2 hours",
      "100% data accuracy with all fields preserved",
      "Saved 200+ hours of manual data entry",
      "Automated weekly product updates from Lighthouse CMS"
    ],
    challenges: [
      "Handling complex product data including nested variants and metaobjects",
      "Processing and optimizing images and videos during import",
      "Maintaining data integrity across multiple systems",
      "Creating a robust error handling system"
    ],
    solution: [
      "Developed a custom Shopify app with a dedicated import dashboard",
      "Built a mapping system to translate Lighthouse CMS fields to Shopify",
      "Implemented image and video processing pipeline with optimization",
      "Created comprehensive error handling with detailed reporting",
      "Added support for scheduled automated imports"
    ],
    technologies: ["Node.js", "Shopify API", "GraphQL", "AWS S3", "Image Processing", "Redis"],
    testimonial: {
      quote: "This custom importer saved us months of manual work. The ability to import all our product data, including images and variants, with complete accuracy has been invaluable.",
      author: "Michael Chen",
      position: "CTO, parts4gsm.com"
    }
  },
  {
    id: 3,
    title: "Virtual 3D Try-On Glasses Viewer",
    client: "bylaylasaleh.com",
    slug: "bylaylasaleh-3d-try-on",
    excerpt: "Virtual 3D glasses viewer using webcam technology that allows customers to try on glasses in real-time, reducing return rates and increasing customer confidence.",
    description: "bylaylasaleh.com is an online eyewear retailer looking to reduce return rates and improve customer confidence when purchasing glasses online. They needed a virtual try-on solution that would allow customers to see how glasses look on them before buying.",
    image: "/images/case-studies/3d-try-on.jpg",
    category: "3D Technology",
    tags: ["3D Technology", "Virtual Try-On", "WebRTC", "Three.js", "Shopify"],
    date: "January 20, 2026",
    results: [
      "Reduced return rates by 42%",
      "Increased customer satisfaction by 38%",
      "Improved conversion rates by 25%",
      "Over 5,000 successful virtual try-ons in the first month"
    ],
    challenges: [
      "Real-time face tracking and overlay placement",
      "Seamless integration with Shopify product pages",
      "Optimizing performance across different devices",
      "Creating an intuitive and engaging user experience"
    ],
    solution: [
      "Developed a custom Shopify app using WebRTC for camera access",
      "Used Three.js for 3D rendering and overlay positioning",
      "Created a dedicated try-on page with guided user experience",
      "Optimized for mobile and desktop performance",
      "Integrated with Shopify's product API for dynamic product loading"
    ],
    technologies: ["WebRTC", "Three.js", "Shopify API", "TensorFlow.js", "React", "Node.js"],
    testimonial: {
      quote: "The virtual try-on feature has dramatically reduced our return rates and increased customer confidence. Customers love being able to see how glasses look on them before purchasing.",
      author: "Aisha Patel",
      position: "Founder, bylaylasaleh.com"
    }
  },
  {
    id: 4,
    title: "Custom Warranty Registration & Claims Management",
    client: "Mobitel UK",
    slug: "mobitel-warranty-management",
    excerpt: "Complete warranty registration and claims management system with admin dashboard, email automation, and file management capabilities.",
    description: "Mobitel UK needed a comprehensive warranty management system that would streamline the warranty registration and claims process. The system needed to handle product registrations, claims submission, email management, and file uploads.",
    image: "/images/case-studies/warranty-management.jpg",
    category: "Shopify App Development",
    tags: ["Warranty Management", "Claims System", "Email Automation", "Shopify"],
    date: "December 10, 2025",
    results: [
      "Reduced warranty processing time by 60%",
      "Automated 90% of email communications",
      "Improved customer satisfaction by 45%",
      "Centralized warranty data management"
    ],
    challenges: [
      "Creating a user-friendly warranty registration form",
      "Building a comprehensive claims management system",
      "Automating email notifications and status updates",
      "Implementing secure file upload and management"
    ],
    solution: [
      "Built a custom Shopify app with separate admin and customer interfaces",
      "Created a warranty registration form with product verification",
      "Developed a claims management dashboard with status tracking",
      "Implemented automated email workflows for notifications",
      "Added secure file upload and storage system"
    ],
    technologies: ["React", "Node.js", "Shopify API", "MongoDB", "AWS S3", "SendGrid"],
    testimonial: {
      quote: "The warranty management system has streamlined our entire process. We can now handle claims much faster and keep our customers informed every step of the way.",
      author: "David Thompson",
      position: "Operations Manager, Mobitel UK"
    }
  }
];

// Helper function to get a case study by slug
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find(study => study.slug === slug);
}

// Helper function to get related case studies
export function getRelatedCaseStudies(currentId: number, limit: number = 3): CaseStudy[] {
  return caseStudies
    .filter(study => study.id !== currentId)
    .slice(0, limit);
}