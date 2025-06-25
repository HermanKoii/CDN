package utils

/**
 * Provides text interpretation for WiFi signal strength levels.
 */
object SignalStrengthInterpreter {
    /**
     * Converts signal strength in dBm to a human-readable description.
     * 
     * @param signalStrength Signal strength in dBm (decibel-milliwatts)
     * @return A descriptive text representing the signal strength quality
     */
    fun interpretSignalStrength(signalStrength: Int): String {
        return when {
            signalStrength >= -50 -> "Excellent (Strong)"
            signalStrength >= -60 -> "Good"
            signalStrength >= -70 -> "Fair"
            signalStrength >= -80 -> "Weak"
            else -> "Very Weak (Poor Connection)"
        }
    }

    /**
     * Determines signal strength percentage.
     * 
     * @param signalStrength Signal strength in dBm
     * @return Percentage representation of signal strength (0-100)
     */
    fun calculateSignalStrengthPercentage(signalStrength: Int): Int {
        return when {
            signalStrength >= -50 -> 100
            signalStrength >= -60 -> 80
            signalStrength >= -70 -> 60
            signalStrength >= -80 -> 40
            else -> 20
        }
    }
}