// Shared animation utilities for algorithm visualizations

export interface AnimationStep {
  comparing?: number[]
  sorted?: number[]
  values?: number[]
  active?: number[]
  message?: string
}

export interface AnimationState {
  steps: AnimationStep[]
  currentStep: number
  isComplete: boolean
}

export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function calculateDelay(baseDelay: number, speed: number): number {
  return Math.max(10, baseDelay / speed)
}

export function normalizeValues(values: number[]): { normalized: number[]; max: number } {
  const max = Math.max(...values)
  return {
    normalized: values.map((v) => (v / max) * 100),
    max,
  }
}

// Generate random array for visualization
export function generateRandomArray(length: number, min = 10, max = 100): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min)
}

// Nearly sorted array for testing edge cases
export function generateNearlySortedArray(length: number, shufflePercentage = 0.1): number[] {
  const arr = Array.from({ length }, (_, i) => i + 1)
  const shuffleCount = Math.floor(length * shufflePercentage)

  for (let i = 0; i < shuffleCount; i++) {
    const idx1 = Math.floor(Math.random() * length)
    const idx2 = Math.floor(Math.random() * length)
    ;[arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
  }

  return arr
}

// Reverse sorted array
export function generateReverseSortedArray(length: number): number[] {
  return Array.from({ length }, (_, i) => length - i)
}
