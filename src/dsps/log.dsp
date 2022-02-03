declare argsOffset "1";

import("stdfaust.lib");
l(a, b) = log(a) / log((b == 0) * ma.E + (b != 0) * b);
process = l;
