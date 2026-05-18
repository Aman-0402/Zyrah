import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Luxury cinematic easing — sharp start, long slow settle
const LUXURY_EASE = 'power2.out'

export function useGSAPReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      from = { opacity: 0, y: 28 },
      to = { opacity: 1, y: 0 },
      duration = 1.4,
      ease = LUXURY_EASE,
      start = 'top 82%',
      delay = 0,
    } = options

    const ctx = gsap.context(() => {
      gsap.fromTo(el, from, {
        ...to,
        duration,
        ease,
        delay,
        scrollTrigger: {
          trigger: el,
          start,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return ref
}

export function useGSAPStaggerReveal(options = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const {
      selector = '[data-reveal]',
      from = { opacity: 0, y: 30 },
      to = { opacity: 1, y: 0 },
      duration = 1.2,
      stagger = 0.20,
      ease = LUXURY_EASE,
      start = 'top 82%',
    } = options

    const els = container.querySelectorAll(selector)
    if (!els.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(els, from, {
        ...to,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: container,
          start,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return containerRef
}
