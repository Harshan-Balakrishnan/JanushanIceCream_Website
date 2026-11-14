# JIC Ascension — Performance Report

Date: 2026-10-28

## Baseline
- Live site is accessible to public web inspection.
- No repeatable Lighthouse or PageSpeed run was performed in this audit.
- No field Core Web Vitals dataset was available.
- Baseline LCP, INP, CLS, TTFB, total transfer size and JavaScript bundle size: NOT MEASURED.

## Source-level observations
- The home experience uses Framer Motion in the hero and product interactions.
- The hero includes multiple animated visual layers. Their actual CPU, GPU and battery cost has not been measured on target Android hardware.
- The project uses Next.js Image and declares AVIF/WebP formats in `next.config.ts`; actual delivered formats and image payloads were not verified.
- A Google Maps iframe and optional Google Analytics integration exist in source. Their runtime cost and consent configuration require testing.

## Targets
Use the current “good” Core Web Vitals thresholds as goals at the 75th percentile when sufficient field data exists:
- LCP <= 2.5 seconds.
- INP <= 200 milliseconds.
- CLS <= 0.1.

## Required measurement plan
1. Run Lighthouse/PageSpeed against the production homepage and key customer routes.
2. Test 360–390px Android-sized viewports under mobile throttling.
3. Record lab scores, LCP element, long tasks, image transfer sizes and console/network errors.
4. Test `prefers-reduced-motion` and compare responsiveness.
5. Repeat after changes under the same conditions.
6. Evaluate field data separately; lab results are not field proof.

## Result
Before/after performance comparison: NOT AVAILABLE. No performance improvement is claimed.
