export function AmbientBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-pearl"
    >
      <div className="animate-drift absolute -left-[22%] -top-[28%] h-[70vw] max-h-[920px] w-[70vw] max-w-[920px] rounded-full bg-[radial-gradient(circle_at_center,rgba(10,28,180,0.22),rgba(10,28,180,0)_66%)] blur-[30px] dark:opacity-35" />
      <div className="animate-drift absolute -right-[18%] top-[2%] h-[58vw] max-h-[780px] w-[58vw] max-w-[780px] rounded-full bg-[radial-gradient(circle_at_center,rgba(243,14,120,0.17),rgba(243,14,120,0)_66%)] blur-[30px] [animation-delay:-9s] dark:opacity-35" />
      <div className="animate-drift absolute -bottom-[24%] left-[18%] h-[62vw] max-h-[820px] w-[62vw] max-w-[820px] rounded-full bg-[radial-gradient(circle_at_center,rgba(64,84,220,0.16),rgba(64,84,220,0)_68%)] blur-[30px] [animation-delay:-16s] dark:opacity-40" />
      <div className="animate-drift absolute -bottom-[10%] right-[2%] h-[38vw] max-h-[520px] w-[38vw] max-w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,196,222,0.4),rgba(255,196,222,0)_68%)] blur-[30px] [animation-delay:-22s] dark:opacity-20" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_24%,rgba(255,255,255,0.18)_100%)] dark:bg-[linear-gradient(180deg,rgba(7,10,24,0.6)_0%,rgba(7,10,24,0)_24%,rgba(7,10,24,0.35)_100%)]" />
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(11,16,38,0.032)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,16,38,0.032)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)] dark:opacity-40 dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
    </div>
  );
}
