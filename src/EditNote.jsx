import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function EditNote({ notes, updateNote }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const existingNote = notes.find((n) => n.id === id);
  const [note, setNote] = useState(existingNote || { title: "", content: "" });

  if (!existingNote) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
        animation: "fadeUp 0.4s ease both",
      }}>
        <span style={{ fontSize: "3rem" }}>📄</span>
        <p style={{
          fontFamily: "var(--ff-display)",
          fontStyle: "italic",
          fontSize: "1.4rem",
          color: "var(--ink-muted)",
        }}>
          Note not found.
        </p>
        <Link to="/" style={{
          fontFamily: "var(--ff-mono)",
          fontSize: "0.72rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--accent)",
          textDecoration: "none",
          borderBottom: "1px solid var(--accent)",
          paddingBottom: "1px",
        }}>
          ← Go home
        </Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.title.trim()) {
      updateNote({ ...existingNote, title: note.title, content: note.content });
      navigate("/");
    }
  };

  const charCount = note.content.length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* Top bar */}
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
          maxWidth: "760px",
          margin: "0 auto",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <Link
            to="/"
            style={{
              fontFamily: "var(--ff-mono)",
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--ink-muted)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              transition: "color 0.18s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--ink)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--ink-muted)"}
          >
            ← Back
          </Link>
          <span style={{
            fontFamily: "var(--ff-display)",
            fontStyle: "italic",
            fontWeight: 900,
            fontSize: "1.1rem",
            color: "var(--ink)",
          }}>
            My Notes
          </span>
          <span style={{
            fontFamily: "var(--ff-mono)",
            fontSize: "0.68rem",
            color: "var(--ink-faint)",
            letterSpacing: "0.08em",
          }}>
            {charCount} chars
          </span>
        </div>
      </header>

      {/* Form */}
      <main style={{
        flex: 1,
        maxWidth: "760px",
        width: "100%",
        margin: "0 auto",
        padding: "3rem 2.5rem",
        animation: "fadeUp 0.45s cubic-bezier(.22,.68,0,1.2) both",
      }}>

        {/* Page heading */}
        <div style={{ marginBottom: "2.5rem" }}>
          <p style={{
            fontFamily: "var(--ff-mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "0.5rem",
          }}>
            Editing
          </p>
          <h1 style={{
            fontFamily: "var(--ff-display)",
            fontStyle: "italic",
            fontWeight: 900,
            fontSize: "2.4rem",
            color: "var(--ink)",
            letterSpacing: "-0.5px",
          }}>
            Update your note
          </h1>
        </div>

        {/* Paper card */}
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border-dark)",
          borderTop: "3.5px solid var(--gold)",
          borderRadius: "var(--radius)",
          boxShadow: "var(--shadow-lg)",
          padding: "2.5rem",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Ruled lines decoration */}
          <div style={{
            position: "absolute",
            left: "2.5rem",
            top: 0,
            bottom: 0,
            width: "1px",
            background: "rgba(212,168,67,0.25)",
            pointerEvents: "none",
          }} />

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

            {/* Title */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{
                fontFamily: "var(--ff-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--ink-muted)",
              }}>
                Title
              </label>
              <input
                type="text"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                required
                style={{
                  fontFamily: "var(--ff-display)",
                  fontWeight: 700,
                  fontSize: "1.6rem",
                  color: "var(--ink)",
                  background: "transparent",
                  border: "none",
                  borderBottom: "2px solid var(--border-dark)",
                  outline: "none",
                  padding: "0.4rem 0",
                  width: "100%",
                  transition: "border-color 0.2s",
                  letterSpacing: "-0.3px",
                }}
                onFocus={e => e.target.style.borderBottomColor = "var(--gold)"}
                onBlur={e => e.target.style.borderBottomColor = "var(--border-dark)"}
              />
            </div>

            {/* Content */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{
                fontFamily: "var(--ff-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--ink-muted)",
              }}>
                Content
              </label>
              <textarea
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
                required
                style={{
                  fontFamily: "var(--ff-body)",
                  fontSize: "1rem",
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: "var(--ink)",
                  background: "transparent",
                  border: "none",
                  borderBottom: "2px solid var(--border)",
                  outline: "none",
                  resize: "vertical",
                  minHeight: "200px",
                  padding: "0.4rem 0",
                  width: "100%",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderBottomColor = "var(--gold)"}
                onBlur={e => e.target.style.borderBottomColor = "var(--border)"}
              />
            </div>

            {/* Actions */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "0.75rem",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}>
              <Link
                to="/"
                style={{
                  fontFamily: "var(--ff-mono)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--ink-muted)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--border-dark)",
                  paddingBottom: "1px",
                  transition: "color 0.18s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--ink)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--ink-muted)"}
              >
                Cancel
              </Link>
              <button
                type="submit"
                style={{
                  fontFamily: "var(--ff-mono)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  background: "var(--ink)",
                  color: "var(--surface)",
                  border: "none",
                  padding: "0.7rem 2rem",
                  borderRadius: "var(--radius)",
                  cursor: "pointer",
                  transition: "opacity 0.18s, transform 0.18s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.78"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}
              >
                Update Note ✓
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}

export default EditNote;
