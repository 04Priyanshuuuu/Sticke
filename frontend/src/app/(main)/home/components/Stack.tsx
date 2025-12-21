"use client";
import React, { useEffect, useState } from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "../components/ui/draggable-card";

/** Utility: Fisher-Yates shuffle */
function shuffle<T>(arr: T[]) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Pool of position & rotation classes — tweak as you like */
const POSITIONS = [
  "absolute top-10 left-[6%] rotate-[-8deg]",
  "absolute top-8 left-[22%] rotate-[-5deg]",
  "absolute top-5 left-[40%] rotate-[8deg]",
  "absolute top-24 left-[45%] rotate-[-7deg]",
  "absolute top-32 left-[55%] rotate-[10deg]",
  "absolute top-40 left-[25%] rotate-[-7deg]",
  "absolute top-20 right-[35%] rotate-[2deg]",
  "absolute top-16 left-[30%] rotate-[4deg]",
  "absolute top-28 right-[20%] rotate-[-4deg]",
  "absolute top-6 left-[50%] rotate-[6deg]",
];

/** Default local items (used as fallback if backend has fewer images) */
const DEFAULT_ITEMS = [
  {
    title: "Tyler Durden",
    image:
      "https://images.unsplash.com/photo-1732310216648-603c0255c000?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    title: "The Narrator",
    image:
      "https://images.unsplash.com/photo-1697909623564-3dae17f6c20b?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    title: "Iceland",
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    title: "Japan",
    image:
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    title: "Norway",
    image:
      "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    title: "New Zealand",
    image:
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    title: "Canada",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

type Item = {
  title: string;
  image: string;
  className?: string;
};

export function DraggableCard() {
  // number of cards must remain constant
  const ITEM_COUNT = DEFAULT_ITEMS.length;

  // items state holds exactly ITEM_COUNT items (images may be replaced from backend)
  const [items, setItems] = useState<Item[]>(
    DEFAULT_ITEMS.map((it, i) => ({
      ...it,
      className: POSITIONS[i % POSITIONS.length],
    }))
  );

  const BACKEND_API = `${process.env.NEXT_PUBLIC_API_URL}/stickers/?limit=${ITEM_COUNT}`; // change if needed

  /** Fetch images from Django backend.
   *  Expected response: array of objects with at least { image: string, name?: string }
   */
  const fetchImagesFromBackend = async (): Promise<Item[]> => {
    try {
      const res = await fetch(BACKEND_API);
      if (!res.ok) {
        console.warn(
          "Backend fetch failed, using fallback images.",
          res.status
        );
        return [];
      }
      const data = await res.json();

      // normalize backend items: try multiple possible fields
      const normalized = (Array.isArray(data) ? data : [])
        .map((d: any) => ({
          title: d.name ?? d.title ?? d.label ?? "Sticker",
          image: d.image ?? d.url ?? d.file ?? "",
        }))
        .filter((d: any) => typeof d.image === "string" && d.image.length > 0);

      return normalized;
    } catch (e) {
      console.error("Error fetching backend images:", e);
      return [];
    }
  };

  /** Assign images (from backend if available) to fixed number of cards,
   *  and give each a random position class.
   */
  const assignImagesAndPositions = (backendItems: Item[] | null) => {
    let chosen: Item[] = [];

    if (backendItems && backendItems.length > 0) {
      // if backend has >= ITEM_COUNT, pick a random sample of ITEM_COUNT
      if (backendItems.length >= ITEM_COUNT) {
        chosen = shuffle(backendItems).slice(0, ITEM_COUNT);
      } else {
        // backend has < ITEM_COUNT: use all backend items and fill rest from defaults
        const needed = ITEM_COUNT - backendItems.length;
        const fallback = DEFAULT_ITEMS.slice(0, needed);
        chosen = [...backendItems, ...fallback];
      }
    } else {
      // no backend items -> use defaults
      chosen = DEFAULT_ITEMS.slice(0, ITEM_COUNT);
    }

    // assign random position classes (can repeat) but keep count same
    const assigned = chosen.map((it) => {
      const cls = POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
      return { title: it.title, image: it.image, className: cls };
    });

    setItems(assigned);
  };

  /** Public: randomize positions AND fetch latest images from backend */
  const randomize = async () => {
    const backendItems = await fetchImagesFromBackend();
    assignImagesAndPositions(backendItems);
  };

  // initial load: fetch from backend and assign
  useEffect(() => {
    (async () => {
      const backendItems = await fetchImagesFromBackend();
      assignImagesAndPositions(backendItems);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-[40px] font-bold m-10 ml-5 text-left border-l-4 border-blue-500 pl-4">
        Random
      </h1>

      <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
        {/* Center overlay that acts as Randomize button */}
        <button
          onClick={randomize}
          aria-label="Randomize"
          className="
                    absolute top-1/2 mx-auto -translate-y-3/4
                    px-6 py-3
                    text-xl md:text-3xl font-semibold

                    rounded-xl border border-neutral-300/30
                    bg-white/10 backdrop-blur-sm
                    text-neutral-700 dark:text-neutral-300

                    shadow-[0_4px_20px_rgba(0,0,0,0.2)]
                    transition-all duration-300

                    hover:bg-white hover:text-black
                    hover:shadow-[0_6px_25px_rgba(255,255,255,0.4)]
                    cursor-pointer select-none
                  "
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          Randomize
        </button>

        {items.map((item, idx) => (
          <DraggableCardBody
            key={`${item.title ?? "item"}-${idx}`}
            className={item.className}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${item.image}`}
              alt={item.title}
              className="pointer-events-none relative z-10 h-80 w-80 object-cover"
            />
            <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
              {item.title}
            </h3>
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>
    </div>
  );
}
