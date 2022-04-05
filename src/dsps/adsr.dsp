declare description "ADSR envelope generator";
declare defaultInputs "[0, 0, 0, 0.75, 0]";
declare inputsDescription "[`trigger`, `attack time (sec)`, `decay time (sec)`, `sustain level (between 0..1)`, `release time (sec)`]";
declare argsOffset "1";

import("stdfaust.lib");
process(t, at, dt, sl, rt) = en.adsr(at, dt, sl, rt, t);
