"use client";
import { useEffect, useRef, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, firebaseConfigured } from "@/lib/firebase";

export function useCatalogCollection<T extends { id: string; active?: boolean }>(name: string, fallback: T[]) {
  const fallbackRef = useRef(fallback);
  fallbackRef.current = fallback;
  const [items, setItems] = useState<T[]>(fallback);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!firebaseConfigured || !db) {
      setItems(fallbackRef.current);
      setLive(false);
      return;
    }
    // Match the public Firestore rules explicitly: only active documents are queried.
    // Sorting client-side avoids requiring a composite Firestore index.
    const q = query(collection(db, name), where("active", "==", true));
    return onSnapshot(q, (snap) => {
      if (snap.empty) {
        setItems(fallbackRef.current);
        setLive(false);
        return;
      }
      const next = snap.docs
        .map((d) => ({ id: d.id, ...d.data() } as T))
        .filter((item) => item.active !== false)
        .sort((a, b) => Number((a as T & { sortOrder?: number }).sortOrder ?? 0) - Number((b as T & { sortOrder?: number }).sortOrder ?? 0));
      setItems(next);
      setLive(true);
    }, () => {
      setItems(fallbackRef.current);
      setLive(false);
    });
  }, [name]);

  return { items, live };
}
