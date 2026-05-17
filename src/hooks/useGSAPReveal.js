import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGSAPReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      from = { opacity: 0, y: 40 },
      to = { opacity: 1, y: 0 },
      duration = 0.9,
      ease = 'power3.out',
      start = 'top 85%',
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
      from = { opacity: 0, y: 50 },
      to = { opacity: 1, y: 0 },
      duration = 0.8,
      stagger = 0.15,
      ease = 'power3.out',
      start = 'top 80%',
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
