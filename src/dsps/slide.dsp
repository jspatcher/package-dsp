declare argsOffset "1";
declare description "Filter a signal logarithmically";
declare inputsDescription "[``, `slide up time (samples)`, `slide down time (samples)`]";

slide(signal, slideUp, slideDown) = (_ <: (signal - _) / (slideUp * (signal >= _) + slideDown * (signal < _)), _ : +) ~ _;

process = slide;