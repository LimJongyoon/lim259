export const skills = {
  /* ================= Programming Languages ================= */
  Python:        { color: "#3572A5", category: "language" },
  "C/C++":       { color: "#00599C", category: "language" },
  "C#":          { color: "#512BD4", category: "language" },
  Swift:         { color: "#FA7343", category: "language" },
  JavaScript:    { color: "#ffe100", category: "language" },
  TypeScript:    { color: "#3178C6", category: "language" },
  Shading:       { color: "#DC2626", category: "language" },

  /* ================= Frameworks & Libraries ================= */
  React:         { color: "#61DAFB", category: "framework" },
  Flutter:       { color: "#02569B", category: "framework" },
  Unity:         { color: "#000000", category: "framework" },
  NextJS:        { color: "#111827", category: "framework" },
  NodeJS:        { color: "#3C873A", category: "framework" },

  /* ================= Platforms ================= */
  Web:           { color: "#4B5563", category: "framework" },
  "Web App":     { color: "#374151", category: "framework" },
  iOS:           { color: "#111827", category: "framework" },
  Android:       { color: "#3DDC84", category: "framework" },
  "Mobile App":  { color: "#1F2937", category: "framework" },

  /* ================= XR / HCI ================= */
  VR:            { color: "#7C3AED", category: "xr" },
  AR:            { color: "#8B5CF6", category: "xr" },
  MR:            { color: "#A855F7", category: "xr" },
  HCI:           { color: "#6366F1", category: "hci" },
  Haptics:       { color: "#0EA5E9", category: "hci" },

  /* ================= AI / Vision ================= */
  AI:                 { color: "#4F46E5", category: "ai" },
  LLM:                { color: "#6E40C9", category: "ai" },
  "Image Recognition":{ color: "#10B981", category: "ai" },
  "Machine Learning": { color: "#22C55E", category: "ai" },

  /* ================= Hardware / Embedded ================= */
  "Embedded Systems":  { color: "#0F766E", category: "hardware" },
  "Circuit Design":    { color: "#14532D", category: "hardware" },
  Prototyping:         { color: "#065F46", category: "hardware" },
  "Mechanical Design": { color: "#374151", category: "hardware" },
  "3D Printing":       { color: "#6B7280", category: "hardware" },
  "Laser Cutting":     { color: "#4B5563", category: "hardware" },

  /* ================= Spatial / Tracking ================= */
  "Hand Tracking":     { color: "#2563EB", category: "tracking" },
  "Spatial Computing": { color: "#1D4ED8", category: "tracking" },
  "Position Tracking": { color: "#1E40AF", category: "tracking" },
  BLE:                 { color: "#0082FC", category: "tracking" },

  /* ================= Tools ================= */
  Figma:               { color: "#A259FF", category: "tool" },
  Blender:             { color: "#F5792A", category: "tool" },
  MATLAB:              { color: "#E16737", category: "tool" },
  SPSS:                { color: "#DC2626", category: "tool" },
  "Final Cut Pro":     { color: "#111827", category: "tool" },
  "DaVinci Resolve":   { color: "#1F2937", category: "tool" },
  "OrCAD PSpice":      { color: "#334155", category: "tool" },
  Git:                 { color: "#F05032", category: "tool" },

  /* ================= Research / Professional ================= */
  "UX Research":           { color: "#9333EA", category: "research" },
  "UX Design":           { color: "#f700ff", category: "research" },
  "Interaction Design":   { color: "#7C3AED", category: "research" },
  "Project Management":   { color: "#475569", category: "research" },
  "Industry Collaboration": { color: "#64748B", category: "research" },

  /* ================= Languages ================= */
  Korean:              { color: "#2a0030ff", category: "language-skill" },
  English:             { color: "#3B82F6", category: "language-skill" },
  Japanese:            { color: "#DC2626", category: "language-skill" },
} as const;

export type SkillKey = keyof typeof skills;
export type SkillCategory =
  | "language"
  | "framework"
  | "xr"
  | "hci"
  | "ai"
  | "hardware"
  | "tracking"
  | "tool"
  | "research"
  | "language-skill";