const paths = {
  dashboard: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  invoices: 'M6 3h9l4 4v14H6z M14 3v5h5 M9 12h7 M9 16h5',
  plus: 'M12 5v14 M5 12h14', chart: 'M4 20h17 M7 16v-5 M12 16V4 M17 16V8',
  upload: 'M12 16V3 M7 8l5-5 5 5 M4 15v6h16v-6',
  menu: 'M4 6h16 M4 12h16 M4 18h16', close: 'M5 5l14 14 M19 5L5 19',
  shield: 'M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6z M8 12l3 3 5-6',
  arrow: 'M5 12h14 M13 6l6 6-6 6', wave: 'M2 10c4-6 6 6 10 0s6 6 10 0 M2 17c4-6 6 6 10 0s6 6 10 0',
}
export default function Icon({ name, size = 20 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.invoices} /></svg> }
