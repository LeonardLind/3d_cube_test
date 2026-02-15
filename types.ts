export interface MenuItem {
  id: number;
  label: string;
  description: string;
  vertexPosition: [number, number, number]; // x, y, z coordinates
}

export interface UIProps {
  items: MenuItem[];
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
}

export interface CubeProps {
  items: MenuItem[];
  hoveredId: number | null;
}