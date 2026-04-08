import type { ProjectCategory } from "../../data/siteContent";

interface ProjectFilterProps {
  activeCategory: ProjectCategory | "All";
  onChange: (category: ProjectCategory | "All") => void;
}

const categories: Array<ProjectCategory | "All"> = [
  "All",
  "Product",
  "AI",
  "Frontend",
  "3D",
];

export function ProjectFilter({
  activeCategory,
  onChange,
}: ProjectFilterProps) {
  return (
    <div
      className="project-filter"
      role="tablist"
      aria-label="Project filters"
      data-reveal
    >
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          role="tab"
          aria-selected={activeCategory === category}
          className={activeCategory === category ? "is-active" : ""}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
