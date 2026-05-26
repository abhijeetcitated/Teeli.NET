export type NavDropdownItem = {
  label: string;
  href: string;
  description?: string;
};

export const hiddenNavItems = new Set(["Projects"]);

export const hiddenDropdownHrefs: Record<string, Set<string>> = {
  Company: new Set(["/company/team", "/company/careers"]),
  Insights: new Set(["/insights/reports", "/insights/press"]),
};

/** Top-level sections on the main Header (includes Home). */
export const headerNavItems = ["Home", "Solutions", "Technology", "Projects", "Insights", "Company"] as const;

export type FloatingNavItem = {
  label: string;
  href?: string;
};

/** Top-level sections on the landing page floating navbar (no Home, no duplicate solution links). */
export const floatingNavItems: FloatingNavItem[] = [
  { label: "Solutions" },
  { label: "Technology" },
  { label: "Insights" },
  { label: "Company" },
];

export const dropdownItems: Record<string, NavDropdownItem[]> = {
  Solutions: [
    {
      label: "AI Rendering",
      href: "/solutions/ai-rendering",
      description: "Browser upload, repair, and cloud renders",
    },
    {
      label: "Cloud GPU Rendering",
      href: "/solutions/cloud-gpu",
      description: "AWS GPU render queue and workflow",
    },
    {
      label: "Cost & CO₂ Insights",
      href: "/solutions/sustainability",
      description: "Per-job cost and emissions estimates",
    },
  ],
  Technology: [
    {
      label: "Rendering Engine",
      href: "/technology/rendering-engine",
      description: "Blender Cycles pipeline",
    },
  ],
  Projects: [
    { label: "Case Studies", href: "/projects/case-studies", description: "Client success stories" },
    { label: "Showreel / Gallery", href: "/projects/showreel", description: "Portfolio gallery" },
    { label: "Interactive Viewer", href: "/projects/viewer", description: "3D model explorer" },
  ],
  Insights: [
    { label: "Blog", href: "/blog", description: "Articles and tutorials" },
    { label: "Industry Reports", href: "/insights/reports", description: "Research and analysis" },
    { label: "Press & News", href: "/insights/press", description: "Media coverage" },
  ],
  Company: [
    { label: "About Us", href: "/company/about", description: "Mission and product story" },
    { label: "Team / Culture", href: "/company/team", description: "Meet the team" },
    { label: "Careers", href: "/company/careers", description: "Open roles" },
    { label: "Contact", href: "/contact", description: "Get in touch" },
  ],
};

export const getVisibleDropdownItems = (section: string) =>
  dropdownItems[section]?.filter((sub) => !hiddenDropdownHrefs[section]?.has(sub.href)) ?? [];

export const getNavLink = (item: string) => (item === "Home" ? "/" : "#");
