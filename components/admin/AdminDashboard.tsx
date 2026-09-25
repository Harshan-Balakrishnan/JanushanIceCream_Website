"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";

import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import {
  auth,
  db,
  firebaseConfigured,
  storage,
} from "@/lib/firebase";

import {
  defaultFlavours,
  defaultGallery,
  defaultProducts,
  defaultStoreSettings,
  type Flavour,
  type GalleryItem,
  type LocationItem,
  type Product,
  type Promotion,
  type StoreSettings,
} from "@/lib/catalog";

/* =========================================================
   TYPES
========================================================= */

type Tab =
  | "products"
  | "flavours"
  | "gallery"
  | "promotions"
  | "locations"
  | "store";

type GenericItem =
  | Product
  | Flavour
  | GalleryItem
  | Promotion
  | LocationItem
  | StoreSettings;

type AdminValue =
  | string
  | number
  | boolean
  | undefined;

type AdminItem = Record<string, AdminValue>;

type FieldOption = {
  value: string;
  label: string;
};

type FieldSchema = {
  key: string;
  label: string;
  type?: string;
  options?: FieldOption[];
};

type TabSchema = {
  label: string;
  collection: string;
  fields: FieldSchema[];
};

/* =========================================================
   ADMIN SCHEMAS
========================================================= */

const schemas: Record<Tab, TabSchema> = {
  products: {
    label: "Products",
    collection: "products",
    fields: [
      {
        key: "name",
        label: "Product name",
      },
      {
        key: "price",
        label: "Price (Rs.)",
        type: "number",
      },
      {
        key: "image",
        label: "Image URL",
      },
      {
        key: "eyebrow",
        label: "Eyebrow",
      },
      {
        key: "blurb",
        label: "Description",
      },
      {
        key: "glow",
        label: "Glow colour",
      },
      {
        key: "availability",
        label: "Stock status",
        options: [
          { value: "in-stock", label: "Available today" },
          { value: "low-stock", label: "Limited today" },
          { value: "sold-out", label: "Sold out" },
        ],
      },
      {
        key: "sortOrder",
        label: "Sort order",
        type: "number",
      },
    ],
  },

  flavours: {
    label: "Flavours",
    collection: "flavours",
    fields: [
      {
        key: "name",
        label: "Flavour name",
      },
      {
        key: "image",
        label: "Image URL",
      },
      {
        key: "accent",
        label: "Accent colour",
      },
      {
        key: "description",
        label: "Description",
      },
      {
        key: "sortOrder",
        label: "Sort order",
        type: "number",
      },
    ],
  },

  gallery: {
    label: "Gallery",
    collection: "gallery",
    fields: [
      {
        key: "title",
        label: "Title",
      },
      {
        key: "tag",
        label: "Caption",
      },
      {
        key: "image",
        label: "Image URL",
      },
      {
        key: "sortOrder",
        label: "Sort order",
        type: "number",
      },
    ],
  },

  promotions: {
    label: "Promotions",
    collection: "promotions",
    fields: [
      {
        key: "title",
        label: "Title",
      },
      {
        key: "description",
        label: "Description",
      },
      {
        key: "cta",
        label: "Button text",
      },
      {
        key: "promoCode",
        label: "Promo code (optional)",
      },
      {
        key: "ctaUrl",
        label: "Button link (optional)",
      },
      {
        key: "badge",
        label: "Badge (optional)",
      },
      {
        key: "offerText",
        label: "Offer / discount text (optional)",
      },
      {
        key: "startDate",
        label: "Start date & time (optional)",
        type: "datetime-local",
      },
      {
        key: "endDate",
        label: "End date & time (optional)",
        type: "datetime-local",
      },
      {
        key: "terms",
        label: "Terms & conditions (optional)",
      },
      {
        key: "sortOrder",
        label: "Sort order",
        type: "number",
      },
    ],
  },

  locations: {
    label: "Locations",
    collection: "locations",
    fields: [
      {
        key: "name",
        label: "Location name",
      },
      {
        key: "address",
        label: "Address",
      },
      {
        key: "phone",
        label: "Phone",
      },
      {
        key: "whatsapp",
        label: "WhatsApp",
      },
      {
        key: "mapUrl",
        label: "Map URL",
      },
      {
        key: "sortOrder",
        label: "Sort order",
        type: "number",
      },
    ],
  },

  store: {
    label: "Store status",
    collection: "storeSettings",
    fields: [
      {
        key: "status",
        label: "Current status",
        options: [
          { value: "open", label: "Open and serving" },
          { value: "limited", label: "Limited availability" },
          { value: "closed", label: "Temporarily closed" },
        ],
      },
      {
        key: "message",
        label: "Customer message",
      },
      {
        key: "hours",
        label: "Hours / availability note",
      },
      {
        key: "whatsapp",
        label: "WhatsApp number",
      },
      {
        key: "sortOrder",
        label: "Sort order",
        type: "number",
      },
    ],
  },
};

/* =========================================================
   STARTER DATA
========================================================= */

const seedData: Partial<Record<Tab, GenericItem[]>> = {
  products: defaultProducts,
  flavours: defaultFlavours,
  gallery: defaultGallery,
  store: defaultStoreSettings,
};

/* =========================================================
   CREATE EMPTY ITEM
========================================================= */

function emptyItem(tab: Tab): AdminItem {
  const base: AdminItem = {
    id: "",
    active: true,
    sortOrder: 1,
  };

  schemas[tab].fields.forEach((field) => {
    if (!(field.key in base)) {
      base[field.key] =
        field.type === "number"
          ? 0
          : field.options?.[0]?.value ?? "";
    }
  });

  if (tab === "products") {
    base.featured = true;
  }

  if (tab === "store") {
    base.orderEnabled = true;
  }

  return base;
}

/* =========================================================
   DISPLAY HELPERS
========================================================= */

function getDisplayName(
  item: AdminItem
): string {
  const name = item.name;
  const title = item.title;
  const id = item.id;

  if (
    typeof name === "string" &&
    name
  ) {
    return name;
  }

  if (
    typeof title === "string" &&
    title
  ) {
    return title;
  }

  if (
    typeof id === "string" &&
    id
  ) {
    return id;
  }

  return "Untitled";
}

function getSecondaryText(
  item: AdminItem
): string {
  const price = item.price;
  const address = item.address;
  const description = item.description;
  const tag = item.tag;

  if (
    typeof price === "number" &&
    price
  ) {
    return `Rs. ${price}`;
  }

  if (
    typeof price === "string" &&
    price
  ) {
    return `Rs. ${price}`;
  }

  if (
    typeof address === "string" &&
    address
  ) {
    return address;
  }

  if (
    typeof description === "string" &&
    description
  ) {
    return description;
  }

  if (
    typeof tag === "string" &&
    tag
  ) {
    return tag;
  }

  return "";
}

/* =========================================================
   ADMIN DASHBOARD
========================================================= */

export default function AdminDashboard() {
  const [user, setUser] =
    useState<User | null>(null);

  const [authorized, setAuthorized] =
    useState(false);

  const [loadingAuth, setLoadingAuth] =
    useState(true);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [authError, setAuthError] =
    useState("");

  const [tab, setTab] =
    useState<Tab>("products");

  const [items, setItems] =
    useState<AdminItem[]>([]);

  const [editing, setEditing] =
    useState<AdminItem>(
      emptyItem("products")
    );

  const [status, setStatus] =
    useState("");

  const [busy, setBusy] =
    useState(false);

  const schema = schemas[tab];

  /* =======================================================
     FIREBASE AUTH LISTENER
  ======================================================= */

  useEffect(() => {
    if (
      !firebaseConfigured ||
      !auth ||
      !db
    ) {
      setLoadingAuth(false);
      return;
    }

    return onAuthStateChanged(
      auth,
      async (next) => {
        setUser(next);

        if (!next) {
          setAuthorized(false);
          setLoadingAuth(false);
          return;
        }

        try {
          const admin = await getDoc(
            doc(
              db!,
              "admins",
              next.uid
            )
          );

          setAuthorized(
            admin.exists()
          );
        } catch {
          setAuthorized(false);
        }

        setLoadingAuth(false);
      }
    );
  }, []);

  /* =======================================================
     LOAD FIRESTORE ITEMS
  ======================================================= */

  const loadItems = useCallback(
    async (which: Tab = tab) => {
      if (!db) {
        return;
      }

      try {
        const snap = await getDocs(
          query(
            collection(
              db,
              schemas[which].collection
            ),
            orderBy(
              "sortOrder",
              "asc"
            )
          )
        );

        const loadedItems: AdminItem[] =
          snap.docs.map(
            (itemDoc) => ({
              id: itemDoc.id,
              ...itemDoc.data(),
            })
          ) as AdminItem[];

        setItems(loadedItems);
      } catch {
        setStatus(
          `Could not load ${schemas[
            which
          ].label.toLowerCase()}. Check Firestore indexes/rules.`
        );
      }
    },
    [tab]
  );

  /* =======================================================
     TAB CHANGE
  ======================================================= */

  useEffect(() => {
    setEditing(
      emptyItem(tab)
    );

    if (authorized) {
      void loadItems(tab);
    }
  }, [
    tab,
    authorized,
    loadItems,
  ]);

  /* =======================================================
     LOGIN
  ======================================================= */

  async function login(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setAuthError("");

    if (!auth) {
      return;
    }

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
    } catch {
      setAuthError(
        "Sign-in failed. Check email/password and Firebase Authentication setup."
      );
    }
  }

  /* =======================================================
     SAVE ITEM
  ======================================================= */

  async function saveItem(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!db) {
      return;
    }

    const rawId = String(
      editing.id ||
        editing.name ||
        editing.title ||
        Date.now()
    );

    const id =
      rawId
        .toLowerCase()
        .trim()
        .replace(
          /[^a-z0-9]+/g,
          "-"
        )
        .replace(
          /^-|-$/g,
          ""
        ) ||
      String(Date.now());

    const payload: AdminItem = {
      ...editing,
    };

    delete payload.id;

    for (const field of schema.fields) {
      if (
        field.type === "number"
      ) {
        const value =
          payload[field.key];

        payload[field.key] =
          typeof value === "number"
            ? value
            : Number(value || 0);
      }
    }

    setBusy(true);
    setStatus("Saving…");

    try {
      await setDoc(
        doc(
          db,
          schema.collection,
          id
        ),
        payload,
        {
          merge: true,
        }
      );

      setStatus(
        "Saved. Public website updates from Firestore automatically."
      );

      setEditing(
        emptyItem(tab)
      );

      await loadItems();
    } catch {
      setStatus(
        "Save failed. Confirm this account exists in Firestore /admins/{uid}."
      );
    } finally {
      setBusy(false);
    }
  }

  /* =======================================================
     DELETE ITEM
  ======================================================= */

  async function remove(
    id: string
  ) {
    if (
      !db ||
      !confirm(
        "Delete this item? This cannot be undone."
      )
    ) {
      return;
    }

    setBusy(true);

    try {
      await deleteDoc(
        doc(
          db,
          schema.collection,
          id
        )
      );

      await loadItems();

      setStatus("Deleted.");
    } catch {
      setStatus(
        "Delete failed."
      );
    } finally {
      setBusy(false);
    }
  }

  /* =======================================================
     SEED STARTER DATA
  ======================================================= */

  async function seed() {
    if (
      !db ||
      !seedData[tab]
    ) {
      return;
    }

    if (
      !confirm(
        `Seed the supplied Janushan ${schema.label.toLowerCase()} into Firestore? Existing matching IDs will be updated.`
      )
    ) {
      return;
    }

    setBusy(true);

    try {
      for (
        const item of
        seedData[tab] ?? []
      ) {
        const itemRecord =
          item as unknown as AdminItem;

        const id = String(
          itemRecord.id ?? ""
        );

        if (!id) {
          continue;
        }

        const payload: AdminItem = {
          ...itemRecord,
        };

        delete payload.id;

        await setDoc(
          doc(
            db,
            schema.collection,
            id
          ),
          payload,
          {
            merge: true,
          }
        );
      }

      await loadItems();

      setStatus(
        "Starter data seeded successfully."
      );
    } catch {
      setStatus(
        "Seeding failed. Check admin permissions."
      );
    } finally {
      setBusy(false);
    }
  }

  /* =======================================================
     IMAGE UPLOAD
  ======================================================= */

  async function uploadImage(
    file?: File
  ) {
    if (
      !file ||
      !storage
    ) {
      return;
    }

    setBusy(true);
    setStatus(
      "Uploading image…"
    );

    try {
      const safe =
        file.name
          .toLowerCase()
          .replace(
            /[^a-z0-9.]+/g,
            "-"
          );

      const target = ref(
        storage,
        `website/${schema.collection}/${Date.now()}-${safe}`
      );

      await uploadBytes(
        target,
        file,
        {
          contentType:
            file.type,
        }
      );

      const url =
        await getDownloadURL(
          target
        );

      setEditing(
        (current) => ({
          ...current,
          image: url,
        })
      );

      setStatus(
        "Image uploaded. Save the item to publish it."
      );
    } catch {
      setStatus(
        "Image upload failed. Check Storage rules and admin access."
      );
    } finally {
      setBusy(false);
    }
  }

  /* =======================================================
     IMAGE FIELD CHECK
  ======================================================= */

  const hasImage =
    useMemo(
      () =>
        schema.fields.some(
          (field) =>
            field.key ===
            "image"
        ),
      [schema]
    );

  /* =======================================================
     FIREBASE NOT CONFIGURED
  ======================================================= */

  if (
    !firebaseConfigured
  ) {
    return (
      <AdminShell>
        <div className="admin-empty">
          <h1>
            Firebase setup required
          </h1>

          <p>
            Copy{" "}
            <code>
              .env.example
            </code>{" "}
            to{" "}
            <code>
              .env.local
            </code>{" "}
            and add your Firebase Web App
            values. The public website still
            works with its built-in Janushan
            fallback content until Firebase is
            connected.
          </p>

          <Link href="/">
            ← Back to website
          </Link>
        </div>
      </AdminShell>
    );
  }

  /* =======================================================
     AUTH LOADING
  ======================================================= */

  if (loadingAuth) {
    return (
      <AdminShell>
        <div className="admin-empty">
          <p>
            Checking secure admin access…
          </p>
        </div>
      </AdminShell>
    );
  }

  /* =======================================================
     LOGIN SCREEN
  ======================================================= */

  if (!user) {
    return (
      <AdminShell>
        <form
          className="admin-login"
          onSubmit={login}
        >
          <Image
            src="/brand/janushan-logo.png"
            alt="Janushan Ice Cream"
            width={86}
            height={86}
          />

          <p>
            JANUSHAN CONTROL ROOM
          </p>

          <h1>
            Admin sign in
          </h1>

          <label>
            Email

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              required
            />
          </label>

          <label>
            Password

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              required
            />
          </label>

          {authError && (
            <div className="admin-error">
              {authError}
            </div>
          )}

          <button
            className="admin-primary"
            type="submit"
          >
            Sign in
          </button>

          <Link href="/">
            ← Back to website
          </Link>
        </form>
      </AdminShell>
    );
  }

  /* =======================================================
     USER IS NOT ADMIN
  ======================================================= */

  if (!authorized) {
    return (
      <AdminShell>
        <div className="admin-empty">
          <h1>
            Signed in, but not an admin
          </h1>

          <p>
            Add a Firestore document at{" "}
            <code>
              admins/{user.uid}
            </code>{" "}
            to authorize this Firebase account.
            This prevents normal customers from
            changing website content.
          </p>

          <button
            className="admin-primary"
            onClick={() => {
              if (auth) {
                void signOut(
                  auth
                );
              }
            }}
          >
            Sign out
          </button>
        </div>
      </AdminShell>
    );
  }

  /* =======================================================
     MAIN ADMIN DASHBOARD
  ======================================================= */

  return (
    <AdminShell>
      <header className="admin-top">
        <div>
          <small>
            JANUSHAN ICE CREAM
          </small>

          <h1>
            Control Room
          </h1>
        </div>

        <div className="admin-top-actions">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
          >
            View website ↗
          </a>

          <button
            onClick={() => {
              if (auth) {
                void signOut(
                  auth
                );
              }
            }}
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="admin-layout">

        {/* =================================================
            TABS
        ================================================= */}

        <nav
          className="admin-tabs"
          aria-label="Admin sections"
        >
          {(
            Object.keys(
              schemas
            ) as Tab[]
          ).map((key) => (
            <button
              key={key}
              className={
                tab === key
                  ? "active"
                  : ""
              }
              onClick={() =>
                setTab(key)
              }
            >
              {
                schemas[key]
                  .label
              }
            </button>
          ))}
        </nav>

        {/* =================================================
            WORKSPACE
        ================================================= */}

        <section className="admin-workspace">

          {/* HEADER */}

          <div className="admin-section-head">
            <div>
              <small>
                LIVE CONTENT
              </small>

              <h2>
                {schema.label}
              </h2>

              <p>
                Changes here can feed the public
                website without editing code.
              </p>
            </div>

            {seedData[tab] && (
              <button
                className="admin-secondary"
                onClick={seed}
                disabled={busy}
              >
                Seed starter data
              </button>
            )}
          </div>

          {/* STATUS */}

          {status && (
            <div className="admin-status">
              {status}
            </div>
          )}

          <div className="admin-columns">

            {/* ===========================================
                ITEM LIST
            =========================================== */}

            <div className="admin-list">

              <div className="admin-list-head">
                <strong>
                  {items.length} items
                </strong>

                <button
                  onClick={() =>
                    setEditing(
                      emptyItem(tab)
                    )
                  }
                >
                  + New
                </button>
              </div>

              {items.length === 0 ? (
                <p className="admin-muted">
                  No Firestore items yet.
                  Seed starter data or create
                  one.
                </p>
              ) : (
                items.map(
                  (item) => (
                    <article
                      key={String(
                        item.id
                      )}
                      className="admin-item"
                    >

                      {/* THUMBNAIL */}

                      {typeof item.image ===
                        "string" &&
                        item.image && (
                          <span className="admin-thumb">
                            <Image
                              src={
                                item.image
                              }
                              alt=""
                              fill
                              sizes="56px"
                              unoptimized={
                                item.image.startsWith(
                                  "http"
                                )
                              }
                            />
                          </span>
                        )}

                      {/* NAME */}

                      <div>
                        <strong>
                          {
                            getDisplayName(
                              item
                            )
                          }
                        </strong>

                        <small>
                          {
                            getSecondaryText(
                              item
                            )
                          }
                        </small>
                      </div>

                      {/* STATUS */}

                      <span
                        className={
                          item.active ===
                          false
                            ? "off"
                            : "on"
                        }
                      >
                        {item.active ===
                        false
                          ? "Hidden"
                          : "Live"}
                      </span>

                      {/* EDIT */}

                      <button
                        onClick={() =>
                          setEditing(
                            item
                          )
                        }
                      >
                        Edit
                      </button>

                      {/* DELETE */}

                      <button
                        className="danger"
                        onClick={() => {
                          if (
                            typeof item.id ===
                            "string"
                          ) {
                            void remove(
                              item.id
                            );
                          }
                        }}
                      >
                        Delete
                      </button>
                    </article>
                  )
                )
              )}
            </div>

            {/* ===========================================
                EDITOR
            =========================================== */}

            <form
              className="admin-editor"
              onSubmit={saveItem}
            >

              {/* EDITOR HEADER */}

              <div className="admin-editor-head">
                <div>
                  <small>
                    EDITOR
                  </small>

                  <h3>
                    {editing.id
                      ? `Edit ${getDisplayName(
                          editing
                        )}`
                      : `New ${schema.label.slice(
                          0,
                          -1
                        )}`}
                  </h3>
                </div>
              </div>

              {/* DOCUMENT ID */}

              <label>
                Document ID

                <input
                  value={
                    typeof editing.id ===
                    "string"
                      ? editing.id
                      : ""
                  }
                  onChange={(
                    event
                  ) =>
                    setEditing({
                      ...editing,
                      id: event.target
                        .value,
                    })
                  }
                  placeholder="auto-from-name-if-empty"
                />
              </label>

              {/* =========================================
                  DYNAMIC FIELDS
              ========================================= */}

              {schema.fields.map(
                (field) => {
                  const fieldValue =
                    editing[
                      field.key
                    ];

                  /*
                   * Convert boolean values to strings
                   * because HTML input/textarea values
                   * cannot directly receive boolean values.
                   */

                  const inputValue =
                    typeof fieldValue ===
                    "boolean"
                      ? String(
                          fieldValue
                        )
                      : fieldValue ??
                        "";

                  const isTextarea =
                    field.key ===
                      "blurb" ||
                    field.key ===
                      "description" ||
                    field.key ===
                      "address" ||
                    field.key ===
                      "message";

                  return (
                    <label
                      key={
                        field.key
                      }
                    >
                      {field.label}

                      {isTextarea ? (
                        <textarea
                          value={
                            inputValue
                          }
                          onChange={(
                            event
                          ) =>
                            setEditing({
                              ...editing,
                              [field.key]:
                                event
                                  .target
                                  .value,
                            })
                          }
                        />
                      ) : field.options ? (
                        <select
                          value={inputValue}
                          onChange={(event) =>
                            setEditing({
                              ...editing,
                              [field.key]: event.target.value,
                            })
                          }
                        >
                          {field.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={
                            field.type ||
                            "text"
                          }
                          value={
                            inputValue
                          }
                          onChange={(
                            event
                          ) =>
                            setEditing({
                              ...editing,
                              [field.key]:
                                field.type ===
                                "number"
                                  ? Number(
                                      event
                                        .target
                                        .value
                                    )
                                  : event
                                      .target
                                      .value,
                            })
                          }
                        />
                      )}
                    </label>
                  );
                }
              )}

              {/* =========================================
                  IMAGE UPLOAD
              ========================================= */}

              {hasImage && (
                <label>
                  Upload image

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(
                      event
                    ) =>
                      void uploadImage(
                        event.target
                          .files?.[0]
                      )
                    }
                  />
                </label>
              )}

              {/* =========================================
                  CHECKBOXES
              ========================================= */}

              <div className="admin-checks">

                {/* ACTIVE */}

                <label>
                  <input
                    type="checkbox"
                    checked={
                      editing.active !==
                      false
                    }
                    onChange={(
                      event
                    ) =>
                      setEditing({
                        ...editing,
                        active:
                          event.target
                            .checked,
                      })
                    }
                  />

                  Visible on website
                </label>

                {/* FEATURED */}

                {tab ===
                  "products" && (
                  <label>
                    <input
                      type="checkbox"
                      checked={
                        editing.featured !==
                        false
                      }
                      onChange={(
                        event
                      ) =>
                        setEditing({
                          ...editing,
                          featured:
                            event
                              .target
                              .checked,
                        })
                      }
                    />

                    Featured
                  </label>
                )}

                {tab === "store" && (
                  <label>
                    <input
                      type="checkbox"
                      checked={editing.orderEnabled !== false}
                      onChange={(event) =>
                        setEditing({
                          ...editing,
                          orderEnabled: event.target.checked,
                        })
                      }
                    />

                    Accept WhatsApp orders
                  </label>
                )}
              </div>

              {/* =========================================
                  SAVE BUTTON
              ========================================= */}

              <button
                className="admin-primary"
                disabled={busy}
                type="submit"
              >
                {busy
                  ? "Working…"
                  : "Save & publish"}
              </button>

            </form>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}

/* =========================================================
   ADMIN SHELL
========================================================= */

function AdminShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="admin-shell">
      {children}
    </main>
  );
}