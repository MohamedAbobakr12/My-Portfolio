// lib/utils.js

import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const GSAP_DEFAULTS = {
  ease: 'power3.out',
  duration: 0.8,
}

export const staggerChildren = (delay = 0.1) => ({
  ease: 'power3.out',
  stagger: delay,
})
