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
          <p>Ton texte de présentation ici...</p>
        </div>
        <DrawerClose asChild>
          <Button variant="outline" className="m-4">Fermer</Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  )
}

export default About;
