declare description "DC blocker. Default dc blocker has -3dB point near 35 Hz (at 44.1 kHz) and high-frequency gain near 1.0025 (due to no scaling).";

import("stdfaust.lib");
process = fi.dcblocker;
