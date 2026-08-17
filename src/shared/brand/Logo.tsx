interface LogoProps {
  showSubtitle?: boolean;
}

export function Logo({ showSubtitle = false }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500">
        <span className="text-lg font-black text-zinc-950">Y</span>
      </div>

      <div className="leading-none">
        <div className="text-xl font-black tracking-tight text-white">YANG</div>

        {showSubtitle && (
          <div className="mt-1 text-[9px] font-semibold tracking-[0.25em] text-zinc-500">
            MOVIES
          </div>
        )}
      </div>
    </div>
  );
}
