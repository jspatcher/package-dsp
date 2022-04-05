declare defaultInputs "[0, 0.5]";
declare description "Simple sawtooth waveform oscillator between 0 and 1 with phase control";
declare inputsDescription "[`freq`, `phase`]";

import("stdfaust.lib");
process(f, p) = os.lf_sawpos_phase(p, f);
