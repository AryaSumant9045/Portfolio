type Props = { src: string | null };

/**
 * The portrait slot in the About section. Renders the real image when
 * `public/portrait.*` exists, otherwise a deliberate monogram placeholder.
 */
export default function Portrait({ src }: Props) {
  return (
    <div className="portrait-frame aspect-[4/5] w-[230px] shrink-0">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt="Portrait of Sumant Saini"
          width={440}
          height={550}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2.5 px-4 text-center">
          <span className="font-display text-[44px] font-bold leading-none tracking-[-0.04em] text-ink/90">
            SS
          </span>
          <span className="h-px w-10 bg-gradient-to-r from-transparent via-aqua/70 to-transparent" />
          <span className="font-display text-[10px] uppercase tracking-[0.24em] text-faint">
            Portrait
          </span>
        </div>
      )}
    </div>
  );
}
