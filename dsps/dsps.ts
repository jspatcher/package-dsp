import wasm_abs from "./abs/dspModule.wasm";
import json_abs from "./abs/dspMeta.json";
import wasm_acos from "./acos/dspModule.wasm";
import json_acos from "./acos/dspMeta.json";
import wasm_acosh from "./acosh/dspModule.wasm";
import json_acosh from "./acosh/dspMeta.json";
import wasm_add from "./add/dspModule.wasm";
import json_add from "./add/dspMeta.json";
import wasm_adsr from "./adsr/dspModule.wasm";
import json_adsr from "./adsr/dspMeta.json";
import wasm_allpass from "./allpass/dspModule.wasm";
import json_allpass from "./allpass/dspMeta.json";
import wasm_asin from "./asin/dspModule.wasm";
import json_asin from "./asin/dspMeta.json";
import wasm_asinh from "./asinh/dspModule.wasm";
import json_asinh from "./asinh/dspMeta.json";
import wasm_atan from "./atan/dspModule.wasm";
import json_atan from "./atan/dspMeta.json";
import wasm_atan2 from "./atan2/dspModule.wasm";
import json_atan2 from "./atan2/dspMeta.json";
import wasm_atanh from "./atanh/dspModule.wasm";
import json_atanh from "./atanh/dspMeta.json";
import wasm_atodb from "./atodb/dspModule.wasm";
import json_atodb from "./atodb/dspMeta.json";
import wasm_bandpass from "./bandpass/dspModule.wasm";
import json_bandpass from "./bandpass/dspMeta.json";
import wasm_biquad from "./biquad/dspModule.wasm";
import json_biquad from "./biquad/dspMeta.json";
import wasm_bitand from "./bitand/dspModule.wasm";
import json_bitand from "./bitand/dspMeta.json";
import wasm_bitor from "./bitor/dspModule.wasm";
import json_bitor from "./bitor/dspMeta.json";
import wasm_bitxor from "./bitxor/dspModule.wasm";
import json_bitxor from "./bitxor/dspMeta.json";
import wasm_change from "./change/dspModule.wasm";
import json_change from "./change/dspMeta.json";
import wasm_cycle from "./cycle/dspModule.wasm";
import json_cycle from "./cycle/dspMeta.json";
import wasm_dbtoa from "./dbtoa/dspModule.wasm";
import json_dbtoa from "./dbtoa/dspMeta.json";
import wasm_dcblocker from "./dcblocker/dspModule.wasm";
import json_dcblocker from "./dcblocker/dspMeta.json";
import wasm_distort from "./distort/dspModule.wasm";
import json_distort from "./distort/dspMeta.json";
import wasm_div from "./div/dspModule.wasm";
import json_div from "./div/dspMeta.json";
import wasm_eq from "./eq/dspModule.wasm";
import json_eq from "./eq/dspMeta.json";
import wasm_filtercoeff from "./filtercoeff/dspModule.wasm";
import json_filtercoeff from "./filtercoeff/dspMeta.json";
import wasm_ftom from "./ftom/dspModule.wasm";
import json_ftom from "./ftom/dspMeta.json";
import wasm_geq from "./geq/dspModule.wasm";
import json_geq from "./geq/dspMeta.json";
import wasm_gtr from "./gtr/dspModule.wasm";
import json_gtr from "./gtr/dspMeta.json";
import wasm_highpass from "./highpass/dspModule.wasm";
import json_highpass from "./highpass/dspMeta.json";
import wasm_highshelf from "./highshelf/dspModule.wasm";
import json_highshelf from "./highshelf/dspMeta.json";
import wasm_leq from "./leq/dspModule.wasm";
import json_leq from "./leq/dspMeta.json";
import wasm_log from "./log/dspModule.wasm";
import json_log from "./log/dspMeta.json";
import wasm_lowpass from "./lowpass/dspModule.wasm";
import json_lowpass from "./lowpass/dspMeta.json";
import wasm_lowshelf from "./lowshelf/dspModule.wasm";
import json_lowshelf from "./lowshelf/dspMeta.json";
import wasm_lss from "./lss/dspModule.wasm";
import json_lss from "./lss/dspMeta.json";
import wasm_max from "./max/dspModule.wasm";
import json_max from "./max/dspMeta.json";
import wasm_min from "./min/dspModule.wasm";
import json_min from "./min/dspMeta.json";
import wasm_mod from "./mod/dspModule.wasm";
import json_mod from "./mod/dspMeta.json";
import wasm_mtof from "./mtof/dspModule.wasm";
import json_mtof from "./mtof/dspMeta.json";
import wasm_mul from "./mul/dspModule.wasm";
import json_mul from "./mul/dspMeta.json";
import wasm_neq from "./neq/dspModule.wasm";
import json_neq from "./neq/dspMeta.json";
import wasm_noise from "./noise/dspModule.wasm";
import json_noise from "./noise/dspMeta.json";
import wasm_notch from "./notch/dspModule.wasm";
import json_notch from "./notch/dspMeta.json";
import wasm_peaknotch from "./peaknotch/dspModule.wasm";
import json_peaknotch from "./peaknotch/dspMeta.json";
import wasm_phasor from "./phasor/dspModule.wasm";
import json_phasor from "./phasor/dspMeta.json";
import wasm_pink from "./pink/dspModule.wasm";
import json_pink from "./pink/dspMeta.json";
import wasm_rdiv from "./rdiv/dspModule.wasm";
import json_rdiv from "./rdiv/dspMeta.json";
import wasm_rect from "./rect/dspModule.wasm";
import json_rect from "./rect/dspMeta.json";
import wasm_rsub from "./rsub/dspModule.wasm";
import json_rsub from "./rsub/dspMeta.json";
import wasm_sah from "./sah/dspModule.wasm";
import json_sah from "./sah/dspMeta.json";
import wasm_slide from "./slide/dspModule.wasm";
import json_slide from "./slide/dspMeta.json";
import wasm_smooth from "./smooth/dspModule.wasm";
import json_smooth from "./smooth/dspMeta.json";
import wasm_sub from "./sub/dspModule.wasm";
import json_sub from "./sub/dspMeta.json";
import wasm_tri from "./tri/dspModule.wasm";
import json_tri from "./tri/dspMeta.json";
import wasm__ from "./_/dspModule.wasm";
import json__ from "./_/dspMeta.json";

const map = {
    abs: {
        module: wasm_abs,
        json: json_abs
    },
    acos: {
        module: wasm_acos,
        json: json_acos
    },
    acosh: {
        module: wasm_acosh,
        json: json_acosh
    },
    add: {
        module: wasm_add,
        json: json_add
    },
    adsr: {
        module: wasm_adsr,
        json: json_adsr
    },
    allpass: {
        module: wasm_allpass,
        json: json_allpass
    },
    asin: {
        module: wasm_asin,
        json: json_asin
    },
    asinh: {
        module: wasm_asinh,
        json: json_asinh
    },
    atan: {
        module: wasm_atan,
        json: json_atan
    },
    atan2: {
        module: wasm_atan2,
        json: json_atan2
    },
    atanh: {
        module: wasm_atanh,
        json: json_atanh
    },
    atodb: {
        module: wasm_atodb,
        json: json_atodb
    },
    bandpass: {
        module: wasm_bandpass,
        json: json_bandpass
    },
    biquad: {
        module: wasm_biquad,
        json: json_biquad
    },
    bitand: {
        module: wasm_bitand,
        json: json_bitand
    },
    bitor: {
        module: wasm_bitor,
        json: json_bitor
    },
    bitxor: {
        module: wasm_bitxor,
        json: json_bitxor
    },
    change: {
        module: wasm_change,
        json: json_change
    },
    cycle: {
        module: wasm_cycle,
        json: json_cycle
    },
    dbtoa: {
        module: wasm_dbtoa,
        json: json_dbtoa
    },
    dcblocker: {
        module: wasm_dcblocker,
        json: json_dcblocker
    },
    distort: {
        module: wasm_distort,
        json: json_distort
    },
    div: {
        module: wasm_div,
        json: json_div
    },
    eq: {
        module: wasm_eq,
        json: json_eq
    },
    filtercoeff: {
        module: wasm_filtercoeff,
        json: json_filtercoeff
    },
    ftom: {
        module: wasm_ftom,
        json: json_ftom
    },
    geq: {
        module: wasm_geq,
        json: json_geq
    },
    gtr: {
        module: wasm_gtr,
        json: json_gtr
    },
    highpass: {
        module: wasm_highpass,
        json: json_highpass
    },
    highshelf: {
        module: wasm_highshelf,
        json: json_highshelf
    },
    leq: {
        module: wasm_leq,
        json: json_leq
    },
    log: {
        module: wasm_log,
        json: json_log
    },
    lowpass: {
        module: wasm_lowpass,
        json: json_lowpass
    },
    lowshelf: {
        module: wasm_lowshelf,
        json: json_lowshelf
    },
    lss: {
        module: wasm_lss,
        json: json_lss
    },
    max: {
        module: wasm_max,
        json: json_max
    },
    min: {
        module: wasm_min,
        json: json_min
    },
    mod: {
        module: wasm_mod,
        json: json_mod
    },
    mtof: {
        module: wasm_mtof,
        json: json_mtof
    },
    mul: {
        module: wasm_mul,
        json: json_mul
    },
    neq: {
        module: wasm_neq,
        json: json_neq
    },
    noise: {
        module: wasm_noise,
        json: json_noise
    },
    notch: {
        module: wasm_notch,
        json: json_notch
    },
    peaknotch: {
        module: wasm_peaknotch,
        json: json_peaknotch
    },
    phasor: {
        module: wasm_phasor,
        json: json_phasor
    },
    pink: {
        module: wasm_pink,
        json: json_pink
    },
    rdiv: {
        module: wasm_rdiv,
        json: json_rdiv
    },
    rect: {
        module: wasm_rect,
        json: json_rect
    },
    rsub: {
        module: wasm_rsub,
        json: json_rsub
    },
    sah: {
        module: wasm_sah,
        json: json_sah
    },
    slide: {
        module: wasm_slide,
        json: json_slide
    },
    smooth: {
        module: wasm_smooth,
        json: json_smooth
    },
    sub: {
        module: wasm_sub,
        json: json_sub
    },
    tri: {
        module: wasm_tri,
        json: json_tri
    },
    _: {
        module: wasm__,
        json: json__
    }
};

export default map as unknown as Record<string, { module: string; json: string }>;
