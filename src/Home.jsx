import { Link } from "react-router-dom";
import { useState } from "react";

const NOTE_COLORS = [
  { bg: "#fef9e7", border: "#d4a843" },
  { bg: "#fdf0ed", border: "#c84b2f" },
  { bg: "#eef6f1", border: "#2d6a4f" },
  { bg: "#f0ebf8", border: "#5e3a8c" },
  { bg: "#fdf5e6", border: "#b87333" },
  { bg: "#e8f4fd", border: "#2176ae" },
];

function getNoteColor(id) {
  const idx = parseInt(id?.slice(-2) || "0", 16) % NOTE_COLORS.length;
  return NOTE_COLORS[Math.abs(idx)] || NOTE_COLORS[0];
}

function FilterTab({ label, active, onClick, count }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "var(--ff-mono)",
        fontSize: "0.72rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "0.4rem 1rem",
        borderRadius: "var(--radius)",
        border: active ? "1.5px solid var(--ink)" : "1.5px solid var(--border)",
        background: active ? "var(--ink)" : "transparent",
        color: active ? "var(--surface)" : "var(--ink-muted)",
        cursor: "pointer",
        transition: "all 0.18s",
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
      }}
    >
      {label}
      {count > 0 && (
        <span
          style={{
            background: active ? "rgba(255,255,255,0.25)" : "var(--surface2)",
            color: active ? "#fff" : "var(--ink-muted)",
            borderRadius: "99px",
            padding: "0 0.45rem",
            fontSize: "0.65rem",
            fontWeight: 700,
            lineHeight: "1.6",
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function NoteCard({ note, updateNote, index }) {
  const color = getNoteColor(note.id);
  const togglePin = () => updateNote({ ...note, pinned: !note.pinned });
  const toggleArchive = () => updateNote({ ...note, archived: !note.archived });
  const moveToTrash = () => updateNote({ ...note, trashed: true });
  const restoreFromTrash = () => updateNote({ ...note, trashed: false });
  const deletePermanently = () => updateNote({ ...note, permanentlyDelete: true });

  const cardStyle = {
    background: color.bg,
    borderTop: `3.5px solid ${color.border}`,
    borderRight: "1px solid rgba(28,26,22,0.10)",
    borderBottom: "1px solid rgba(28,26,22,0.10)",
    borderLeft: "1px solid rgba(28,26,22,0.10)",
    borderRadius: "var(--radius)",
    padding: "1.4rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    boxShadow: "2px 4px 12px rgba(28,26,22,0.08)",
    transition: "transform 0.2s, box-shadow 0.2s",
    animation: "fadeUp 0.4s cubic-bezier(.22,.68,0,1.2) both",
    animationDelay: `${index * 0.06}s`,
    cursor: "default",
    position: "relative",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px) rotate(0.3deg)";
        e.currentTarget.style.boxShadow = "4px 10px 28px rgba(28,26,22,0.14)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "2px 4px 12px rgba(28,26,22,0.08)";
      }}
    >
      {/* Pin indicator */}
      {note.pinned && (
        <span style={{
          position: "absolute",
          top: "-10px",
          right: "14px",
          fontSize: "1.1rem",
          filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.2))",
          animation: "stampIn 0.4s cubic-bezier(.22,.68,0,1.2) both",
        }}>📌</span>
      )}

      {/* Title */}
      <h3 style={{
        fontFamily: "var(--ff-display)",
        fontWeight: 700,
        fontSize: "1.05rem",
        color: "var(--ink)",
        lineHeight: 1.3,
        paddingRight: note.pinned ? "1.5rem" : "0",
      }}>
        {note.title}
      </h3>

      {/* Divider rule */}
      <div style={{
        height: "1px",
        background: `${color.border}44`,
      }} />

      {/* Content */}
      <p style={{
        fontFamily: "var(--ff-body)",
        fontSize: "0.85rem",
        color: "var(--ink-muted)",
        lineHeight: 1.65,
        whiteSpace: "pre-wrap",
        flexGrow: 1,
        maxHeight: "90px",
        overflow: "hidden",
        WebkitMaskImage: "linear-gradient(180deg, black 60%, transparent 100%)",
        maskImage: "linear-gradient(180deg, black 60%, transparent 100%)",
      }}>
        {note.content || <em style={{ opacity: 0.5 }}>No content</em>}
      </p>

      {/* Tags row */}
      <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap", minHeight: "20px" }}>
        {note.archived && (
          <span style={{
            fontFamily: "var(--ff-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.08em",
            background: "var(--purple-soft)",
            color: "var(--purple)",
            border: "1px solid rgba(94,58,140,0.2)",
            borderRadius: "2px",
            padding: "0.1rem 0.45rem",
          }}>ARCHIVED</span>
        )}
      </div>

      {/* Actions */}
      <div style={{
        display: "flex",
        gap: "0.35rem",
        flexWrap: "wrap",
        paddingTop: "0.5rem",
        borderTop: "1px dashed rgba(28,26,22,0.12)",
      }}>
        {!note.trashed ? (
          <>
            <ActionBtn
              onClick={togglePin}
              label={note.pinned ? "Unpin" : "Pin"}
              emoji={note.pinned ? "📌" : "📍"}
              color="var(--gold)"
              bg="var(--gold-soft)"
            />
            <ActionBtn
              onClick={toggleArchive}
              label={note.archived ? "Unarchive" : "Archive"}
              emoji="🗂"
              color="var(--purple)"
              bg="var(--purple-soft)"
            />
            <Link
              to={`/edit/${note.id}`}
              style={{
                fontFamily: "var(--ff-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "0.28rem 0.7rem",
                borderRadius: "2px",
                border: "1px solid rgba(28,26,22,0.18)",
                background: "rgba(28,26,22,0.04)",
                color: "var(--ink)",
                textDecoration: "none",
                transition: "all 0.18s",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--surface)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(28,26,22,0.04)"; e.currentTarget.style.color = "var(--ink)"; }}
            >
              ✏️ Edit
            </Link>
            <ActionBtn
              onClick={moveToTrash}
              label="Trash"
              emoji="🗑"
              color="var(--accent)"
              bg="var(--accent-soft)"
            />
          </>
        ) : (
          <>
            <ActionBtn
              onClick={restoreFromTrash}
              label="Restore"
              emoji="↩️"
              color="var(--green)"
              bg="var(--green-soft)"
            />
            <ActionBtn
              onClick={deletePermanently}
              label="Delete forever"
              emoji="💀"
              color="var(--accent)"
              bg="var(--accent-soft)"
            />
          </>
        )}
      </div>
    </div>
  );
}

function ActionBtn({ onClick, label, emoji, color, bg }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "var(--ff-mono)",
        fontSize: "0.68rem",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        padding: "0.28rem 0.7rem",
        borderRadius: "2px",
        border: `1px solid ${color}44`,
        background: bg,
        color: color,
        cursor: "pointer",
        transition: "all 0.18s",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3rem",
      }}
      onMouseEnter={e => { e.currentTarget.style.background = color; e.currentTarget.style.color = "#fff"; }}
      onMouseLeave={e => { e.currentTarget.style.background = bg; e.currentTarget.style.color = color; }}
    >
      {emoji} {label}
    </button>
  );
}

function Home({ notes = [], updateNote }) {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const counts = {
    all:      notes.filter(n => !n.trashed).length,
    pinned:   notes.filter(n => n.pinned && !n.trashed).length,
    archived: notes.filter(n => n.archived && !n.trashed).length,
    trashed:  notes.filter(n => n.trashed).length,
  };

  const filteredNotes = notes
    .filter((note) => {
      if (filter === "pinned")   return note.pinned && !note.trashed;
      if (filter === "archived") return note.archived && !note.trashed;
      if (filter === "trashed")  return note.trashed;
      return !note.trashed;
    })
    .filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const pinnedNotes   = filteredNotes.filter(n => n.pinned);
  const unpinnedNotes = filteredNotes.filter(n => !n.pinned);

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
    }}>

      {/* ── HEADER ── */}
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(245,240,232,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-dark)",
        padding: "0 2.5rem",
      }}>
        <div style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
          gap: "1.5rem",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
            <span style={{
              fontFamily: "var(--ff-display)",
              fontStyle: "italic",
              fontWeight: 900,
              fontSize: "1.5rem",
              color: "var(--ink)",
              letterSpacing: "-0.5px",
            }}>
              My Notes
            </span>
            <span style={{
              fontFamily: "var(--ff-mono)",
              fontSize: "0.65rem",
              color: "var(--ink-faint)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}>
              / journal
            </span>
          </div>

          {/* Search */}
          <div style={{
            flex: 1,
            maxWidth: "340px",
            position: "relative",
          }}>
            <span style={{
              position: "absolute",
              left: "0.8rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--ink-faint)",
              fontSize: "0.85rem",
              pointerEvents: "none",
            }}>⌕</span>
            <input
              type="text"
              placeholder="Search notes…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                paddingLeft: "2rem",
                paddingRight: "1rem",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                fontFamily: "var(--ff-body)",
                fontSize: "0.88rem",
                color: "var(--ink)",
                background: "var(--surface)",
                border: "1.5px solid var(--border-dark)",
                borderRadius: "var(--radius)",
                outline: "none",
                transition: "border-color 0.18s",
              }}
              onFocus={e => { e.target.style.borderColor = "var(--ink)"; }}
              onBlur={e => { e.target.style.borderColor = "var(--border-dark)"; }}
            />
          </div>

          {/* Add Note CTA */}
          <Link
            to="/addNote"
            style={{
              fontFamily: "var(--ff-mono)",
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              background: "var(--ink)",
              color: "var(--surface)",
              padding: "0.55rem 1.3rem",
              borderRadius: "var(--radius)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              transition: "opacity 0.18s, transform 0.18s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.78"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}
          >
            + New Note
          </Link>
        </div>
      </header>

      {/* ── FILTER TABS ── */}
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "1.5rem 2.5rem 0",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        flexWrap: "wrap",
      }}>
        {[
          { key: "all",      label: "All Notes" },
          { key: "pinned",   label: "Pinned" },
          { key: "archived", label: "Archived" },
          { key: "trashed",  label: "Trash" },
        ].map(({ key, label }) => (
          <FilterTab
            key={key}
            label={label}
            active={filter === key}
            onClick={() => setFilter(key)}
            count={counts[key]}
          />
        ))}

        {searchTerm && (
          <span style={{
            fontFamily: "var(--ff-mono)",
            fontSize: "0.7rem",
            color: "var(--ink-muted)",
            marginLeft: "auto",
            letterSpacing: "0.06em",
          }}>
            {filteredNotes.length} result{filteredNotes.length !== 1 ? "s" : ""} for "{searchTerm}"
          </span>
        )}
      </div>

      {/* ── NOTES GRID ── */}
      <main style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "1.5rem 2.5rem 4rem",
      }}>

        {/* Pinned section */}
        {pinnedNotes.length > 0 && filter === "all" && (
          <div style={{ marginBottom: "2rem" }}>
            <p style={{
              fontFamily: "var(--ff-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--ink-faint)",
              marginBottom: "0.9rem",
              paddingBottom: "0.5rem",
              borderBottom: "1px solid var(--border)",
            }}>
              📌 Pinned
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1.2rem",
            }} className="stagger">
              {pinnedNotes.map((note, i) => (
                <NoteCard key={note.id} note={note} updateNote={updateNote} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* All / other notes */}
        {unpinnedNotes.length > 0 ? (
          <>
            {pinnedNotes.length > 0 && filter === "all" && (
              <p style={{
                fontFamily: "var(--ff-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
                marginBottom: "0.9rem",
                paddingBottom: "0.5rem",
                borderBottom: "1px solid var(--border)",
              }}>
                📄 Others
              </p>
            )}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1.2rem",
            }} className="stagger">
              {unpinnedNotes.map((note, i) => (
                <NoteCard key={note.id} note={note} updateNote={updateNote} index={i} />
              ))}
            </div>
          </>
        ) : (
          filteredNotes.length === 0 && (
            <div style={{
              textAlign: "center",
              padding: "6rem 2rem",
              animation: "fadeUp 0.5s ease both",
            }}>
              <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
                {filter === "trashed" ? "🗑️" : filter === "archived" ? "🗂️" : "📓"}
              </div>
              <p style={{
                fontFamily: "var(--ff-display)",
                fontStyle: "italic",
                fontSize: "1.4rem",
                color: "var(--ink-muted)",
                marginBottom: "0.5rem",
              }}>
                {searchTerm
                  ? `No notes match "${searchTerm}"`
                  : filter === "trashed"
                  ? "Trash is empty"
                  : filter === "archived"
                  ? "Nothing archived yet"
                  : filter === "pinned"
                  ? "No pinned notes"
                  : "Your notebook is empty"}
              </p>
              {filter === "all" && !searchTerm && (
                <Link to="/addNote" style={{
                  fontFamily: "var(--ff-mono)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--accent)",
                  paddingBottom: "1px",
                  marginTop: "0.5rem",
                  display: "inline-block",
                }}>
                  Write your first note →
                </Link>
              )}
            </div>
          )
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid var(--border)",
        padding: "1rem 2.5rem",
        textAlign: "center",
        fontFamily: "var(--ff-mono)",
        fontSize: "0.68rem",
        color: "var(--ink-faint)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}>
        My Notes — {notes.length} note{notes.length !== 1 ? "s" : ""} total
      </footer>
    </div>
  );
}

export default Home;
