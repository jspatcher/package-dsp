declare description "Attack-Release envelope generator";
declare defaultInputs "[0, 0.75]";
declare inputsDescription "[`trigger`, `attack time (sec)`, `release time (sec)`]";
declare argsOffset "1";

import("stdfaust.lib");
process(t, at, rt) = en.ar(at, rt, t);
