declare defaultInputs "[0, 0.5]";

import("stdfaust.lib");
triangleN(N, freq, duty) = os.pulsetrainN(N, freq, duty) : fi.pole(p) : *(gain) with {
    gain = 4.0 * freq / ma.SR; // for aproximate unit peak amplitude
    p = 0.999;
};
triangle = triangleN(2); // default based on saw2
process = triangle;
