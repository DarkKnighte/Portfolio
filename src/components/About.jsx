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
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque nobis dolores laborum facere magnam. Impedit, iste voluptate aspernatur tenetur odio cupiditate. Rem tempore quasi totam nisi reprehenderit. Ipsam, fugit.</p>
        </div>
        <DrawerClose asChild>
          <Button variant="outline" className="m-4" style={{ border: '1px solid black' }}>Fermer</Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  )
}

export default About;
