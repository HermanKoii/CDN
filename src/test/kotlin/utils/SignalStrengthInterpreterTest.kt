package utils

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class SignalStrengthInterpreterTest {

    @Test
    fun `test signal strength interpretation`() {
        // Excellent signal strength
        assertEquals("Excellent (Strong)", SignalStrengthInterpreter.interpretSignalStrength(-40))
        
        // Good signal strength
        assertEquals("Good", SignalStrengthInterpreter.interpretSignalStrength(-55))
        
        // Fair signal strength
        assertEquals("Fair", SignalStrengthInterpreter.interpretSignalStrength(-65))
        
        // Weak signal strength
        assertEquals("Weak", SignalStrengthInterpreter.interpretSignalStrength(-75))
        
        // Very weak signal strength
        assertEquals("Very Weak (Poor Connection)", SignalStrengthInterpreter.interpretSignalStrength(-90))
    }

    @Test
    fun `test signal strength percentage calculation`() {
        // Excellent signal strength
        assertEquals(100, SignalStrengthInterpreter.calculateSignalStrengthPercentage(-40))
        
        // Good signal strength
        assertEquals(80, SignalStrengthInterpreter.calculateSignalStrengthPercentage(-55))
        
        // Fair signal strength
        assertEquals(60, SignalStrengthInterpreter.calculateSignalStrengthPercentage(-65))
        
        // Weak signal strength
        assertEquals(40, SignalStrengthInterpreter.calculateSignalStrengthPercentage(-75))
        
        // Very weak signal strength
        assertEquals(20, SignalStrengthInterpreter.calculateSignalStrengthPercentage(-90))
    }
}