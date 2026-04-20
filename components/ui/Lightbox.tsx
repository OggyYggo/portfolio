'use client'

import YARLightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import 'yet-another-react-lightbox/plugins/captions.css'

export type LightboxSlide = {
  src: string
  alt?: string
  title?: string        // shown as caption title
  description?: string  // shown as caption subtitle
}

type Props = {
  slides: LightboxSlide[]
  open: boolean
  index: number
  onClose: () => void
}

export default function Lightbox({ slides, open, index, onClose }: Props) {
  return (
    <YARLightbox
      open={open}
      close={onClose}
      index={index}
      slides={slides.map((s) => ({
        src: s.src,
        alt: s.alt ?? '',
        title: s.title,
        description: s.description,
      }))}
      plugins={[Zoom, Thumbnails, Captions]}
      zoom={{
        maxZoomPixelRatio: 4,       // how far they can zoom in
        zoomInMultiplier: 2,
        doubleTapDelay: 300,
        doubleClickDelay: 300,
        scrollToZoom: true,         // scroll wheel zooms
      }}
      thumbnails={{
        position: 'bottom',
        width: 80,
        height: 60,
        border: 2,
        borderRadius: 6,
        padding: 4,
        gap: 8,
      }}
      captions={{
        showToggle: true,
        descriptionTextAlign: 'center',
      }}
      carousel={{
        finite: false,              // loops around
        preload: 2,
      }}
      animation={{
        fade: 250,
        swipe: 300,
      }}
      styles={{
        container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
        root: {
          '--yarl__color_backdrop': 'rgba(0,0,0,0.95)',
          cursor: 'default',
          zIndex: 2147483646,
        },
      }}
    />
  )
}
