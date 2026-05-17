import { motion } from 'framer-motion'
import { NOTES } from '../../../data/notes'

const MAX = 2

function NoteChip({ note, selected, onToggle, disabled }) {
  return (
    <motion.button
      onClick={() => onToggle(note)}
      disabled={disabled && !selected}
      whileHover={{ scale: disabled && !selected ? 1 : 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={[
        'px-3.5 py-1.5 text-[10px] tracking-[0.25em] uppercase transition-all duration-300 outline-none flex-shrink-0',
        'border cursor-pointer',
        selected
          ? 'bg-gold-400 text-black border-gold-400'
          : disabled
          ? 'border-gold-400/8 text-ivory/15 cursor-not-allowed'
          : 'border-gold-400/20 text-ivory/50 hover:border-gold-400/50 hover:text-ivory/80',
      ].join(' ')}
    >
      {note}
    </motion.button>
  )
}

function NoteLayer({ label, sublabel, notes, selected, onToggle }) {
  const atMax = selected.length >= MAX

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline gap-3">
        <h3 className="font-heading text-lg text-ivory">{label}</h3>
        <span className="text-[9px] tracking-[0.3em] uppercase text-ivory/25">{sublabel}</span>
        <span className="text-[9px] tracking-[0.25em] uppercase text-gold-400/40 ml-auto">
          {selected.length}/{MAX}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {notes.map((note) => (
          <NoteChip
            key={note}
            note={note}
            selected={selected.includes(note)}
            onToggle={onToggle}
            disabled={atMax && !selected.includes(note)}
          />
        ))}
      </div>
    </div>
  )
}

export default function Step2Notes({ selections, update }) {
  const { family, topNotes, middleNotes, baseNotes } = selections
  const notes = NOTES[family] || { top: [], middle: [], base: [] }

  function toggle(layer, note) {
    const key = `${layer}Notes`
    const current = selections[key]
    const next = current.includes(note)
      ? current.filter((n) => n !== note)
      : current.length < MAX
      ? [...current, note]
      : current
    update({ [key]: next })
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-[10px] tracking-[0.5em] uppercase text-gold-400/50 mb-2">Step 2 of 5</p>
        <h2 className="font-heading text-3xl md:text-4xl text-ivory mb-2">
          Choose Your <span className="italic text-gold-300">Notes</span>
        </h2>
        <p className="text-ivory/35 text-sm font-light">
          Pick up to 2 per layer — or skip and leave it to us.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-8"
      >
        {/* Note layer guide */}
        <div className="flex gap-4 text-[9px] tracking-[0.25em] uppercase">
          <span className="text-gold-400/40">Top ↑ First impression</span>
          <span className="text-ivory/15">·</span>
          <span className="text-ivory/25">Middle ↕ Heart</span>
          <span className="text-ivory/15">·</span>
          <span className="text-ivory/20">Base ↓ Lasting depth</span>
        </div>

        <div className="h-px bg-gold-400/8" />

        <NoteLayer
          label="Top Notes"
          sublabel="First 15 min"
          notes={notes.top}
          selected={topNotes}
          onToggle={(n) => toggle('top', n)}
        />

        <div className="h-px bg-gold-400/8" />

        <NoteLayer
          label="Middle Notes"
          sublabel="Heart · 30 min–4 hrs"
          notes={notes.middle}
          selected={middleNotes}
          onToggle={(n) => toggle('middle', n)}
        />

        <div className="h-px bg-gold-400/8" />

        <NoteLayer
          label="Base Notes"
          sublabel="Soul · Lingers for hours"
          notes={notes.base}
          selected={baseNotes}
          onToggle={(n) => toggle('base', n)}
        />
      </motion.div>

      {/* Skip hint */}
      <p className="text-[9px] tracking-[0.3em] uppercase text-ivory/20 text-center">
        Skipping a layer? Our perfumers will choose for you ✦
      </p>
    </div>
  )
}
