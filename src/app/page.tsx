"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

export default function Home() {
  const { toast } = useToast();
  const [noButtonStyle, setNoButtonStyle] = React.useState({});
  const [isWiggling, setIsWiggling] = React.useState(false);
  const noButtonRef = React.useRef<HTMLButtonElement>(null);

  const showConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.6 },
      disableForReducedMotion: true,
    });
  }

  const handleYesClick = () => {
    showConfetti();
    toast({
      title: "Accepted!",
      description: "Thank you! Ewa is delighted!",
    });
    
  };

  const moveButton = () => {
    if (!noButtonRef.current) return;

    setIsWiggling(true); // Start wiggling animation

    const button = noButtonRef.current;
    const buttonRect = button.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();

    // Calculate max movement boundaries (within viewport, minus button size)
    const maxX = bodyRect.width - buttonRect.width - 20; // 20px buffer
    const maxY = bodyRect.height - buttonRect.height - 20; // 20px buffer

    // Generate random positions ensuring they stay within bounds
    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;

    // Basic collision avoidance with edges (keep button somewhat centered)
    newX = Math.max(20, Math.min(newX, maxX));
    newY = Math.max(20, Math.min(newY, maxY));

    setNoButtonStyle({
      position: 'absolute',
      left: `${newX}px`,
      top: `${newY}px`,
      transition: 'left 0.1s ease-out, top 0.1s ease-out', // Faster transition
    });

     // Stop wiggling after a short delay
     setTimeout(() => setIsWiggling(false), 150);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="text-center z-10 p-8 bg-card rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-foreground">
          Accept Ewa to the Expert Circle?
        </h1>
        <div className="flex justify-center gap-6">
          <Button
            onClick={handleYesClick}
            className="px-8 py-3 text-lg transition-transform transform hover:scale-105 focus:scale-105"
            variant="default" // Uses --primary (magenta)
          >
            Yes
          </Button>
          <Button
            ref={noButtonRef}
            onMouseEnter={moveButton}
            onClick={moveButton} // Also move on click attempt
            style={noButtonStyle}
            className={cn(
              "px-8 py-3 text-lg transition-transform transform hover:scale-105 focus:scale-105",
              isWiggling && "animate-wiggle-fast" // Apply wiggle animation when moving
            )}
            variant="secondary" // Uses --secondary (grey)
          >
            No
          </Button>
        </div>
      </div>
    </main>
  );
}
