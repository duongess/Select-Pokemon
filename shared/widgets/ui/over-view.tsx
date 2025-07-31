"use client"

import React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/shared/widgets/ui/card"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/shared/widgets/ui/carousel"

const images = [
  "/images/overview-1.png",
  "/images/overview-2.png",
  "/images/overview-3.png",
  "/images/overview-4.png",
]

export function OverView() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      className="w-full max-w-3xl mx-auto flex box-border"
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="p-2">
              <Card>
                <CardContent className="flex items-center justify-center p-4">
                  <Image
                    src={src}
                    alt={`Overview ${index + 1}`}
                    width={800}
                    height={500}
                    className="rounded-lg object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
