import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";
import { site } from "@/content/thryve";
import { fileReply, greeting, matchTopic, type ChatTopic } from "@/content/chat";
import logo from "@/assets/logo.png";

/*
 * The site's help widget.
 *
 * ---------- how it looks, and why ----------
 *
 * The panel sits on the navy ground the site keeps for its closing moments —
 * the footer, the team section, every dark CTA. Against an ivory page a dark
 * panel reads as deliberate furniture rather than a bolted-on support widget,
 * and it is the one ground where clay carries properly.
 *
 * Two choices do the rest of the work:
 *
 * - The greeting is set in the display face, as type, not dropped into a
 *   speech bubble. It is the first thing anyone reads here, so it gets the
 *   same treatment a section opening would.
 * - Only the visitor's messages are bubbles. The assistant speaks as plain
 *   copy on the panel's own ground, the way body text does everywhere else on
 *   the site. Boxing both sides in bordered cards is what makes every other
 *   chat widget look identical.
 *
 * ---------- how it stays out of the page's way ----------
 *
 * 1. `z-30`. The header row is z-50 and the mobile menu overlay is z-40. This
 *    component mounts after <Navbar /> in the root layout, so at z-40 it would
 *    paint on top of the open mobile menu; below both, the menu simply covers
 *    it and the two never compete.
 *
 * 2. No full-screen wrapper. The launcher and the panel are two separately
 *    positioned fixed elements, so there is never an invisible overlay across
 *    the viewport swallowing clicks meant for the page.
 *
 * 3. The panel is non-modal: the page keeps scrolling behind it, so Lenis is
 *    never stopped and focus is never trapped. `setScrollLocked` is
 *    deliberately not used here — see `lib/scroll.ts` for why stopping it is
 *    something only a true overlay should do.
 */

/** Kept in step with the panel's transition duration below. */
const TRANSITION_MS = 280;

type Message = {
  from: "bot" | "user";
  lines: string[];
};

function BubbleIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6"
    >
      <path d="M20 11.5a7.5 7.5 0 0 1-10.9 6.68L4.5 19.5l1.36-4.06A7.5 7.5 0 1 1 20 11.5Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="size-5"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/**
 * One line of assistant copy, with the practice's phone number turned into a
 * `tel:` link where it appears — inline, in the run of the sentence. The
 * number is the one thing in these replies a visitor needs to act on, and on
 * a phone a plain string is not tappable.
 */
function BotLine({ text }: { text: string }) {
  const parts = text.split(site.phone);
  if (parts.length === 1) return <>{text}</>;

  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 ? (
            <a
              href={site.phoneHref}
              className="text-on-dark underline decoration-clay decoration-1 underline-offset-4 transition-colors hover:decoration-on-dark"
            >
              {site.phone}
            </a>
          ) : null}
        </span>
      ))}
    </>
  );
}

export function ChatWidget() {
  /* `open` is the intent; `mounted` and `shown` drive the transition. */
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);

  const [messages, setMessages] = useState<Message[]>([{ from: "bot", lines: greeting }]);
  const [draft, setDraft] = useState("");

  const panelId = useId();
  const launcher = useRef<HTMLButtonElement>(null);
  const transcript = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  /*
   * Opening mounts the panel, then flips it visible on the next frame so the
   * browser has a painted "from" state to transition out of. Closing reverses
   * it and unmounts only once the transition has run, which is what a plain
   * conditional render cannot do — it would vanish instantly on close.
   */
  useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }

    setShown(false);
    const timer = setTimeout(() => setMounted(false), prefersReducedMotion() ? 0 : TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [open]);

  /* Escape closes, wherever focus happens to be. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /*
   * Focus moves into the panel on open and back to the launcher on close —
   * but not on mount. Without the guard the closed branch runs on first
   * render and pulls focus to the launcher on every page load, which both
   * steals the tab position and can scroll the page to the corner.
   */
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (open) input.current?.focus();
    else launcher.current?.focus({ preventScroll: true });
  }, [open]);

  /*
   * New messages scroll the transcript, never the page: this element's own
   * scroll position only. `scrollIntoView` would move the document behind the
   * panel. Smooth, so a reply glides into view instead of snapping.
   */
  useEffect(() => {
    const el = transcript.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, [messages, mounted]);

  const answer = (asked: string, topic: ChatTopic) => {
    setMessages((prev) => [
      ...prev,
      { from: "user", lines: [asked] },
      { from: "bot", lines: topic.reply },
    ]);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const asked = draft.trim();
    if (!asked) return;
    setDraft("");
    answer(asked, matchTopic(asked));
  };

  /*
   * The file is named in the transcript and then dropped. It is never read,
   * never uploaded, and never leaves the browser — see `fileReply`.
   */
  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    answer(`Attached: ${file.name}`, fileReply);
  };

  return (
    <>
      {/* ---------- launcher ---------- */}
      <button
        ref={launcher}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close the help assistant" : "Open the help assistant"}
        className="fixed bottom-5 right-5 z-30 flex size-14 items-center justify-center rounded-full bg-clay text-on-dark shadow-[0_12px_34px_-10px_color-mix(in_oklab,var(--clay)_70%,transparent)] transition-[background-color,transform] duration-500 ease-cinematic hover:bg-navy-deep motion-safe:hover:scale-105 md:bottom-6 md:right-6 print:hidden"
      >
        {/* Both glyphs stay mounted and cross-fade, so the toggle has no flicker. */}
        <span className="relative flex size-6 items-center justify-center">
          <span
            className={cn(
              "absolute transition-[opacity,transform] duration-300 ease-cinematic",
              open ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
            )}
          >
            <BubbleIcon />
          </span>
          <span
            className={cn(
              "absolute transition-[opacity,transform] duration-300 ease-cinematic",
              open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
            )}
          >
            <CloseIcon />
          </span>
        </span>
      </button>

      {/* ---------- panel ---------- */}
      {mounted ? (
        <div
          id={panelId}
          role="dialog"
          aria-label={`${site.name} help assistant`}
          className={cn(
            /*
              Inset-based on small screens rather than a fixed width: `body`
              has `overflow-x: hidden`, which would quietly mask a panel wider
              than the viewport instead of showing it as a scrollbar.
            */
            "dark-section fixed inset-x-3 bottom-24 z-30 flex flex-col overflow-hidden rounded-xl border border-line-dark",
            /*
              Height is budgeted from the space that actually exists, not a
              flat cap. The panel sits at z-30 under the z-50 header, so any
              height that reaches the top of the viewport slides beneath it —
              the header's own "Book now" then floats over the conversation
              and the panel's title is hidden behind it.
              The subtracted total is the 6rem bottom offset plus clearance
              for the header at its TALLEST (unscrolled: h-24 mobile, h-32 at
              md), so it clears whether or not the page has been scrolled.
              `dvh`, not `vh`: mobile browser chrome makes `vh` overshoot.
            */
            "max-h-[min(calc(100dvh-12.5rem),34rem)] md:max-h-[min(calc(100dvh-14.5rem),36rem)]",
            "shadow-[0_30px_70px_-28px_color-mix(in_oklab,var(--ink)_75%,transparent)]",
            "sm:inset-x-auto sm:right-6 sm:w-[392px]",
            "origin-bottom-right transition-[opacity,transform] duration-[280ms] ease-cinematic motion-reduce:transition-none",
            shown
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-4 scale-[0.97] opacity-0",
          )}
        >
          {/* One warm wash at the top, so the navy has some depth behind the
              display type rather than reading as a flat block. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(120%_100%_at_85%_0%,color-mix(in_oklab,var(--clay)_26%,transparent),transparent_70%)]"
          />

          <header className="relative flex shrink-0 items-center justify-between gap-4 border-b border-line-dark px-5 py-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="" width={512} height={512} className="h-9 w-auto shrink-0" />
              <div>
                <p className="font-display text-[15px] font-medium tracking-[-0.01em] text-on-dark">
                  {site.name}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-on-dark-soft">
                  <span aria-hidden className="size-1.5 rounded-full bg-clay-soft" />
                  Here to help — not a clinician
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close the help assistant"
              className="-mr-2 flex size-9 shrink-0 items-center justify-center rounded-full text-on-dark-soft transition-colors duration-300 hover:bg-white/10 hover:text-on-dark"
            >
              <CloseIcon />
            </button>
          </header>

          <div
            ref={transcript}
            aria-live="polite"
            className="scrollbar-subtle relative flex-1 space-y-3 overflow-y-auto overscroll-contain px-5 py-5"
          >
            {messages.map((m, i) => {
              const user = m.from === "user";

              return (
                <div key={i} className={cn("flex", user ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[86%] px-4 py-3",
                      /*
                        The squared-off corner points at whoever is speaking —
                        the only tail either bubble gets, which reads more
                        cleanly at this size than a drawn pointer.
                      */
                      user
                        ? "rounded-xl rounded-br-sm bg-clay text-on-dark"
                        : "rounded-xl rounded-bl-sm border border-line-dark bg-white/8 text-on-dark",
                    )}
                  >
                    {m.lines.map((line, j) => (
                      <p
                        key={j}
                        className={cn(
                          "whitespace-pre-line",
                          /*
                            The welcome's opening line is the panel's headline,
                            so it keeps the display face even inside the
                            bubble. Everything else is body copy.
                          */
                          i === 0 && j === 0
                            ? "font-display text-[1.05rem] leading-snug tracking-[-0.015em]"
                            : "text-[14px] leading-relaxed",
                          !user && j > 0 && "text-on-dark-soft",
                          j > 0 && "mt-2.5",
                        )}
                      >
                        {user ? line : <BotLine text={line} />}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <form
            onSubmit={onSubmit}
            className="relative flex shrink-0 items-center gap-2 border-t border-line-dark px-4 py-3.5"
          >
            <label htmlFor={`${panelId}-input`} className="sr-only">
              Type your message
            </label>

            {/* Attach: a label driving a visually hidden input, so the control
                is a real file input for assistive tech and the keyboard. */}
            <input
              id={`${panelId}-file`}
              type="file"
              accept="image/*,.pdf"
              onChange={onFile}
              className="sr-only"
            />
            <label
              htmlFor={`${panelId}-file`}
              title="Attach a file"
              className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-on-dark-soft transition-colors duration-300 hover:bg-white/10 hover:text-on-dark"
            >
              <span className="sr-only">Attach a file</span>
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-[19px]"
              >
                <path d="M21.44 11.05l-8.49 8.49a5.5 5.5 0 01-7.78-7.78l8.49-8.49a3.5 3.5 0 014.95 4.95l-8.49 8.49a1.5 1.5 0 01-2.12-2.12l7.78-7.78" />
              </svg>
            </label>

            <input
              ref={input}
              id={`${panelId}-input`}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type your message…"
              autoComplete="off"
              className="min-h-11 w-full rounded-full border border-line-dark bg-white/6 px-4 text-[14px] text-on-dark outline-none transition-colors placeholder:text-on-dark-soft/70 focus:border-clay focus:bg-white/10"
            />

            <button
              type="submit"
              disabled={!draft.trim()}
              aria-label="Send message"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-clay text-on-dark transition-colors duration-300 hover:bg-on-dark hover:text-ink disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-clay disabled:hover:text-on-dark"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-[18px]"
              >
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
