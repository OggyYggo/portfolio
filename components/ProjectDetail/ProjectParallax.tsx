'use client'

import Image from 'next/image'

type Props = {
  image: string
  gallery?: { src: string; caption: string }[]
}

export default function ProjectParallax({ image, gallery }: Props) {
  // Build items from gallery images, falling back to the hero image
  const images = gallery && gallery.length > 0
    ? gallery
    : [{ src: image, caption: 'Project Preview' }]

  // Double the items so the marquee stays full
  const items = [...images, ...images]

  return (
    <section className="relative my-16 overflow-hidden py-10 bg-muted/30">
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        <div
          className="flex w-max animate-scroll gap-6"
          style={{ '--animation-duration': '30s' } as React.CSSProperties}
        >
          {items.map((img, i) => (
            <div
              key={`${img.caption}-${i}`}
              className="relative h-[300px] w-[500px] shrink-0 overflow-hidden rounded-xl"
            >
              <Image
                src={img.src}
                alt={img.caption}
                fill
                className="object-cover"
                sizes="500px"
              />
              <div className="absolute inset-0 bg-background/10" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-4">
                <p className="text-sm font-semibold text-foreground">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
