import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { imageRatio, type ImageKey } from "../../content/images";
import { cn } from "../../lib/cn";
import { prefersReducedMotion } from "../../lib/motion";
import { Img } from "./Img";

export interface FocusPoint {
  label: string;
  /** Fractions (0–1) of the image to centre on. */
  x: number;
  y: number;
  zoom: number;
}

export interface ViewerTab {
  id: string;
  label: string;
  image: ImageKey;
  focusPoints?: readonly FocusPoint[];
}

interface View {
  scale: number;
  x: number;
  y: number;
}

const MAX_SCALE = 4;
const REST: View = { scale: 1, x: 0, y: 0 };

/**
 * Inspect technical drawings up close. Zoom with the buttons, +/- keys, ctrl/⌘ + wheel,
 * trackpad pinch or double-click; pan by dragging or with the arrow keys.
 */
export function ZoomViewer({ tabs }: { tabs: readonly ViewerTab[] }) {
  const [tabId, setTabId] = useState(tabs[0].id);
  const [view, setView] = useState<View>(REST);
  const [dragging, setDragging] = useState(false);
  const port = useRef<HTMLDivElement>(null);
  const drag = useRef<{ px: number; py: number; x: number; y: number } | null>(null);
  const tab = tabs.find((t) => t.id === tabId) ?? tabs[0];

  const clampView = (scale: number, x: number, y: number): View => {
    const { width, height } = port.current?.getBoundingClientRect() ?? { width: 0, height: 0 };
    const s = Math.min(MAX_SCALE, Math.max(1, scale));
    return {
      scale: s,
      x: Math.min(0, Math.max(width - width * s, x)),
      y: Math.min(0, Math.max(height - height * s, y)),
    };
  };

  /** Zoom to `next`, keeping the point (cx, cy) fixed under the cursor/centre. */
  const zoomAt = (next: number, cx: number, cy: number) =>
    setView((v) => {
      const s = Math.min(MAX_SCALE, Math.max(1, next));
      const k = s / v.scale;
      return clampView(s, cx - (cx - v.x) * k, cy - (cy - v.y) * k);
    });

  const zoomCentre = (factor: number) => {
    const rect = port.current?.getBoundingClientRect();
    if (rect) zoomAt(view.scale * factor, rect.width / 2, rect.height / 2);
  };

  const focusOn = (p: FocusPoint) => {
    const rect = port.current?.getBoundingClientRect();
    if (!rect) return;
    // Bring the drawing fully on screen first so the zoom isn't hidden under the sticky nav.
    port.current?.scrollIntoView({ block: "center", behavior: prefersReducedMotion() ? "auto" : "smooth" });
    setView(clampView(p.zoom, rect.width / 2 - p.x * rect.width * p.zoom, rect.height / 2 - p.y * rect.height * p.zoom));
  };

  // Native wheel listener: React's onWheel is passive, so it can't stop the page zooming/scrolling.
  useEffect(() => {
    const el = port.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      const rect = el.getBoundingClientRect();
      setView((v) => {
        const s = Math.min(MAX_SCALE, Math.max(1, v.scale * (event.deltaY < 0 ? 1.18 : 1 / 1.18)));
        const k = s / v.scale;
        const cx = event.clientX - rect.left;
        const cy = event.clientY - rect.top;
        return clampView(s, cx - (cx - v.x) * k, cy - (cy - v.y) * k);
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (view.scale <= 1) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { px: event.clientX, py: event.clientY, x: view.x, y: view.y };
    setDragging(true);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (d) setView((v) => clampView(v.scale, d.x + event.clientX - d.px, d.y + event.clientY - d.py));
  };
  const endDrag = () => {
    drag.current = null;
    setDragging(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = 70;
    const pan = (dx: number, dy: number) => setView((v) => clampView(v.scale, v.x + dx, v.y + dy));
    switch (event.key) {
      case "+":
      case "=":
        return zoomCentre(1.4);
      case "-":
        return zoomCentre(1 / 1.4);
      case "0":
        return setView(REST);
      case "ArrowLeft":
        return view.scale > 1 ? (event.preventDefault(), pan(step, 0)) : undefined;
      case "ArrowRight":
        return view.scale > 1 ? (event.preventDefault(), pan(-step, 0)) : undefined;
      case "ArrowUp":
        return view.scale > 1 ? (event.preventDefault(), pan(0, step)) : undefined;
      case "ArrowDown":
        return view.scale > 1 ? (event.preventDefault(), pan(0, -step)) : undefined;
    }
  };

  const selectTab = (id: string) => {
    setTabId(id);
    setView(REST);
  };

  const controlClass =
    "grid size-10 place-items-center rounded-full border border-current/30 transition-colors hover:bg-charcoal hover:text-ivory disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit";

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a technical sheet">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={t.id === tab.id}
              onClick={() => selectTab(t.id)}
              className={cn(
                "label rounded-full border px-5 py-2.5 transition-colors",
                t.id === tab.id ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/30 hover:border-charcoal",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2" role="group" aria-label="Zoom controls">
          <button type="button" className={controlClass} onClick={() => zoomCentre(1 / 1.4)} disabled={view.scale <= 1} aria-label="Zoom out">
            <Minus size={16} aria-hidden="true" />
          </button>
          <span className="label w-14 text-center tabular-nums" aria-live="polite">
            {Math.round(view.scale * 100)}%
          </span>
          <button type="button" className={controlClass} onClick={() => zoomCentre(1.4)} disabled={view.scale >= MAX_SCALE} aria-label="Zoom in">
            <Plus size={16} aria-hidden="true" />
          </button>
          <button type="button" className={controlClass} onClick={() => setView(REST)} disabled={view.scale === 1} aria-label="Reset zoom">
            <RotateCcw size={15} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={port}
        role="group"
        tabIndex={0}
        aria-label={`${tab.label}, zoomable. Press plus or minus to zoom, arrow keys to pan, zero to reset.`}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          if (view.scale > 1) setView(REST);
          else zoomAt(2.6, event.clientX - rect.left, event.clientY - rect.top);
        }}
        className={cn(
          "relative w-full overflow-hidden border border-charcoal/15 bg-white select-none",
          view.scale > 1 ? (dragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in",
        )}
        style={{ aspectRatio: imageRatio(tab.image), touchAction: view.scale > 1 ? "none" : "pan-y" }}
      >
        <div
          className={cn("h-full w-full origin-top-left will-change-transform", !dragging && "transition-transform duration-500 ease-out")}
          style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}
        >
          <Img
            key={tab.image}
            name={tab.image}
            draggable={false}
            sizes={view.scale > 1.4 ? "400vw" : "(min-width: 1024px) 66vw, 100vw"}
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <p className="label mt-3 text-ash">Double-click, pinch or use +/− to zoom · drag to pan</p>

      {tab.focusPoints?.length ? (
        <div className="mt-5 flex flex-wrap items-center gap-2" role="group" aria-label="Jump to a construction detail">
          <span className="label mr-2 text-ash">Inspect</span>
          {tab.focusPoints.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => focusOn(p)}
              className="label rounded-full border border-charcoal/30 px-4 py-2 transition-colors hover:border-charcoal hover:bg-blush"
            >
              {p.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
