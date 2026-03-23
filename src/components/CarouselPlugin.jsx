import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import kasaImg from "../assets/kasa.webp"
import bookiImg from "../assets/booki.webp"

// ─── Données des projets ──────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: "Projet 1",
    image: bookiImg,
    alt: "Aperçu du projet 1 'Booki'",
  },
  {
    id: 2,
    title: "Projet 2",
    image: kasaImg,
    alt: "Aperçu du projet 2 'Kasa'",
  },
  {
    id: 3,
    title: "Projet 3",
    image: "https://placehold.co/800x450?text=Projet+3",
    alt: "Aperçu du projet 3",
  },
]

// ─── Composant ────────────────────────────────────────────────────────────────
export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  return (
    <div className="carousel-wrapper">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {PROJECTS.map((project) => (
            <CarouselItem key={project.id}>
              <div className="project-card">
                <img
                  src={project.image}
                  alt={project.alt}
                  className="project-card__image"
                />
                <p className="project-card__title">{project.title}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default CarouselPlugin
