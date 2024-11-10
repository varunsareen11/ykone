export const useCalculation = () => {
  // numerical_short_scale
  const formatToShortScale = (value: number) => {
    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(1) + 'B'
    } else if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1) + 'M'
    } else if (value >= 1_000) {
      return (value / 1_000).toFixed(1) + 'k'
    } else {
      return value.toString()
    }
  }
  // Date Format
  const dateFormat = (date: number) => {
    return new Date(date * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  // numerical_long_scale
  const formatNumberWithCommas = (value: number): string => {
    if (value === null || value === undefined || isNaN(value)) return '0'

    return new Intl.NumberFormat().format(value)
  }

  // percentage
  const convertToPercentage = (value: number): string => {
    if (value === null || value === undefined) return '0.00%' // Handle edge case of invalid values
    return `${(value * 100).toFixed(2)}%`
  }

  // currency
  const convertToCurrency = (value: number): string => {
    if (value === null || value === undefined || isNaN(value)) return '0.0€'

    // If the value is less than 1000, return it directly with Euro symbol
    if (value < 1000) {
      return `${value.toFixed(1)}€`
    }

    // Convert the number to the nearest thousand, million, billion, etc.
    const units = ['€', 'k€', 'M€', 'B€', 'T€']
    const unitIndex = Math.floor(Math.log10(value) / 3) // Get the correct unit (k, M, etc.)
    const formattedValue = (value / Math.pow(1000, unitIndex)).toFixed(1)

    return `${formattedValue}${units[unitIndex]}`
  }

  return {
    formatToShortScale,
    dateFormat,
    convertToPercentage,
    convertToCurrency,
    formatNumberWithCommas,
  }
}
