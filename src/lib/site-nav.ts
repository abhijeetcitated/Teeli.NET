export type NavDropdownItem = {
  label: string;
  href: string;
  description?: string;
};

export const hiddenNavItems = new Set<string>();

export const hiddenDropdownHrefs: Record<string, Set<string>> = {};

/** Top-level sections on the main Header (includes Home). */
export const headerNavItems = ["Home", "Tools", "Glossary", "Compare", "Blog", "Pipeline"] as const;

export type FloatingNavItem = {
  label: string;
  href?: string;
};

/** Top-level sections on the landing page floating navbar. */
export const floatingNavItems: FloatingNavItem[] = [
  { label: "Tools", href: "/tools" },
  { label: "Glossary", href: "/glossary" },
  { label: "Compare", href: "/compare" },
  { label: "Blog", href: "/blog" },
  { label: "Pipeline" },
];

export const dropdownItems: Record<string, NavDropdownItem[]> = {
  Pipeline: [
    {
      label: "Automated Mesh Repair",
      href: "/solutions/ai-rendering",
      description: "Watertight 2-manifold geometry healing",
    },
    {
      label: "Blender Cycles Cloud",
      href: "/technology/rendering-engine",
      description: "Headless GPU render farm & WebGPU preview",
    },
    {
      label: "Cloud Storage & Deliver",
      href: "/solutions/cloud-gpu",
      description: "Certified print-ready exports & 4K renders",
    },
    {
      label: "Per-Job Cost & Sustainability",
      href: "/solutions/sustainability",
      description: "Cost calculation & carbon footprint",
    },
  ],
};

export const getVisibleDropdownItems = (section: string) =>
  dropdownItems[section] || [];

export const getNavLink = (item: string) => {
  switch (item) {
    case "Home":
      return "/";
    case "Tools":
      return "/tools";
    case "Glossary":
      return "/glossary";
    case "Compare":
      return "/compare";
    case "Blog":
      return "/blog";
    default:
      return "#";
  }
};
