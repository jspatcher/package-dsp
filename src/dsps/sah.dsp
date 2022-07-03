declare argsOffset "2";
declare description "Sample and hold";
declare inputsDescription "[`Value to sample`, `Trigger Input`, `Trigger threshold`]";

sah(x, trig, thresh) = x * s : + ~ *(1-s) with { s = (trig' <= thresh) & (trig > thresh); };

process = sah;
