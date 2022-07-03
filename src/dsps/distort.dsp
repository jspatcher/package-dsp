declare argsOffset "1";
declare description "Simple soft distortion ((1 + a) * x) / (1 + a * |x|)";
declare inputsDescription "[``, `Factor (>= -1)`]";

distort(x, factor) = (1 + a) * x, 1 + a * abs(x) : / with {
    a = max(factor, -1);
};

process = distort;
