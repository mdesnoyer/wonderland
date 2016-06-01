# README

## General

- use SVG for icons (where possible)
- use ems/vw/relative dimensions (where possible)
- prefix all CSS with `xx-` to eliminate any confusion by browser or developer (we can remove these at a later date), e.g. `xx-section`
- check `/docs/STYLEGUIDE.md` amongst others for info

## Process

- iSpot part of our build process and can use the (build) tools that get their part done fastest/bestest (e.g. switch Sass for PostCSS)
- iSpot produce raw HTML (templates in `/src/js/xx/` and CSS in `/src/css/xx/`) for Neon to consume, essentially iSpot building the React `render()` which Neon will use in our React components
- This would allow the existing pages/components to still run and work while the new stuff flows in
- iSpot follows Neon development process as best as possible, see `/docs/CONTRIBUTING.md`
- Eventually the end result would be the decline of the Bumla styled pages/components and associated build steps and the rise of the MM styled pages and associated build steps/components

## Questions

- Ed Henderson, henderson@neon-lab.com, more than happy to help.
