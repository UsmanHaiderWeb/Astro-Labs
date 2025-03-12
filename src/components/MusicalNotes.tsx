"use client"

import * as React from "react"

const musicalSymbols = ["♩", "♪", "♫", "♬", "𝄞", "𝄢"]

interface Note {
  id: number
  symbol: string
  top: number
  animationDuration: number
  size: number
  side: "left" | "right"
  position?: number
}

const MusicalNotes: React.FC = () => {
  const [notes, setNotes] = React.useState<Note[]>([])

  React.useEffect(() => {
    const createNote = () => {
      const symbol = musicalSymbols[Math.floor(Math.random() * musicalSymbols.length)]
      const top = Math.random() * 100
      const animationDuration = 5 + Math.random() * 3 // 5-8 seconds
      const size = 20 + Math.random() * 20
      const side = Math.random() > 0.5 ? "left" : "right"
      // const position = Math.random() * 16 + 8 // 8rem to 24rem

      const note: Note = {
        id: Date.now(),
        symbol,
        top,
        animationDuration,
        size,
        side,
      }

      setNotes((prevNotes) => [...prevNotes, note])

      // Remove note after animation
      setTimeout(() => {
        setNotes((prevNotes) => prevNotes.filter((n) => n.id !== note.id))
      }, animationDuration * 1000)
    }

    // Create new note every 600ms (slightly slower to reduce density)
    const interval = setInterval(createNote, 600)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {notes.map((note) => (
        <div
          key={note.id}
          className={`fixed ${note.side === "left" ? "left-0" : "right-0"} text-white/60`}
          style={{
            top: `${note.top}%`,
            [note.side]: `${note.position}rem`,
            fontSize: `${note.size}px`,
            animation: `float-${note.side} ${note.animationDuration}s ease-in-out`,
            opacity: 0,
          }}
        >
          {note.symbol}
        </div>
      ))}
    </>
  )
}

export default React.memo(MusicalNotes)