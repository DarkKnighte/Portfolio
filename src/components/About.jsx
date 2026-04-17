import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

export function About({ open, onOpenChange }) {
  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-card border-l border-border shadow-2xl">
        <DrawerHeader>
          <DrawerTitle>À propos</DrawerTitle>
          <DrawerDescription>Qui suis-je ?</DrawerDescription>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto px-4">
          {/* <p>Développeur web en devenir, d’origine corse,
            <br/>je suis passionné par la musique et les jeux vidéo.
            <br/>C’est en explorant les coulisses de ces univers que j’ai découvert le développement,
            <br/>devenu aujourd’hui un véritable projet professionnel. Curieus et motivé, je conçois des projets web en mettant l’accent sur la logique, la créativité et l’expérience utilisateur.
          </p> */}

          <p>Développeur front-end spécialisé en React et SCSS, je conçois des interfaces modernes, dynamiques et responsive.
             <br/><br/>J'utilise les technologies fondamentales du web (HTML, CSS, JavaScript) ainsi que des outils modernes comme Vite.
             <br/><br/>Je m'inscris également dans une démarche d'évolution vers une stack MERN (MongoDB, Express, React, Node.js) afin d'élargir mes compétences vers le développement full-stack.
             <br/><br/>Je suis aujourd'hui à la recherche d'un poste pour mettre mes compétences en pratique et continuer à progresser.
          </p>

        </div>
        <DrawerClose asChild>
          <Button variant="outline" className="m-4" style={{ border: '1px solid black' }}>Fermer</Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  )
}

export default About;
