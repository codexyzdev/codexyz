export type ProjectItem = {
  name: string
  src: string
  href?: string
}

export const projects: ProjectItem[] = [
  {
    name: "Los Tiburones",
    src: "/los-tiburones.png",
  },
  {
    name: "Financiamientos",
    src: "/financiamientos.png",
  },
  {
    name: "Chess Clock",
    src: "/chess-clock.png",
    href: "https://chess-clock-by-codexyzdev.vercel.app/",
  },
]