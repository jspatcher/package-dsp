declare argsOffset "1";
declare description "Band Pass Filter";
declare inputsDescription "[``, `f0`, `gain in dB`, `Q`]";

import("maxmsp.lib");
process = BPF;
