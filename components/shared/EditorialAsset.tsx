import Image, { type StaticImageData } from "next/image"
import { cn } from "../../lib/cn"

type EditorialAssetProps = {
  asset: StaticImageData
  alt: string
  sizes: string
  priority?: boolean
  quality?: number
  className?: string
  imageClassName?: string
  baseOverlayClassName?: string
  overlayClassName?: string
  children?: React.ReactNode
}

export default function EditorialAsset({
  asset,
  alt,
  sizes,
  priority = false,
  quality,
  className,
  imageClassName,
  baseOverlayClassName,
  overlayClassName,
  children,
}: EditorialAssetProps) {
  return (
    <div className={cn("panel-strong relative isolate overflow-hidden rounded-[32px]", className)}>
      <Image
        src={asset}
        alt={alt}
        fill
        priority={priority}
        placeholder="blur"
        quality={quality}
        sizes={sizes}
        className={cn("object-cover", imageClassName)}
      />
      <div
        className={cn(
          "absolute inset-0 bg-[linear-gradient(180deg,rgba(4,5,12,0.16)_0%,rgba(4,5,12,0.3)_38%,rgba(4,5,12,0.84)_100%)]",
          baseOverlayClassName
        )}
        aria-hidden
      />
      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(123,103,255,0.24),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(8,10,20,0.08),rgba(4,5,12,0.52)_72%)]",
          overlayClassName
        )}
        aria-hidden
      />
      <div className="hairline absolute inset-x-8 top-0 h-px" aria-hidden />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10" aria-hidden />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
