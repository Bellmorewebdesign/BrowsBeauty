// Prices, durations and treatment cautions are transcribed exactly from
// SERVICES.csv in the reference pack. Do not change a price or a duration here
// without checking that file first.
//
// Owner follow-ups recorded in the data rather than guessed on the page:
//   * `needsOwnerConfirmation` marks the service whose name is cut off on the
//     current Square site ("Hidratacion de pestañas con"). It is kept in the data
//     so nothing is lost, and hidden from the menu and the booking demo until the
//     studio confirms the intended name.
//   * `nameNote` records that the current site misspells "Lifting" in one listing.
//     The corrected spelling is used everywhere on this site.

export const CAUTIONS = {
  standard: {
    es: 'No es recomendable si usas Retinol, Retin-A o Tretinoína, Accutane o Isotretinoína, tratamientos fuertes para el acné, ni si te hiciste hace poco un peeling químico, microdermoabrasión u otro tratamiento exfoliante.',
    en: 'Not recommended when you are using Retinol, Retin-A or Tretinoin, Accutane or Isotretinoin, strong acne treatments, or soon after a chemical peel, microdermabrasion, or another exfoliating treatment.',
  },
  lamination: {
    es: 'No es recomendable con Retinol, Retin-A o Tretinoína, Accutane o Isotretinoína, ácidos exfoliantes fuertes, ni con tratamiento activo para el acné alrededor de las cejas.',
    en: 'Not recommended with Retinol, Retin-A or Tretinoin, Accutane or Isotretinoin, strong exfoliating acids, or active acne treatment around the brows.',
  },
}

export const CATEGORIES = [
  { id: 'all', es: 'Todo', en: 'All' },
  { id: 'brows', es: 'Cejas', en: 'Brows' },
  { id: 'lashes', es: 'Pestañas', en: 'Lashes' },
  { id: 'combo', es: 'Combos', en: 'Combos' },
  { id: 'waxing', es: 'Depilación', en: 'Waxing' },
]

export const services = [
  {
    id: 'shape-wax',
    category: 'brows',
    featured: true,
    price: 30,
    minutes: 30,
    name: { es: 'Shape & Wax', en: 'Shape & Wax' },
    duration: { es: '30 minutos', en: '30 minutes' },
    blurb: {
      es: 'Diseño y depilación con cera. Medimos la ceja según tus facciones antes de retirar un solo vello.',
      en: 'Brow design and waxing. We map the shape to your own features before a single hair comes off.',
    },
    caution: 'standard',
    artists: ['laura'],
  },
  {
    id: 'shape-wax-tint',
    category: 'brows',
    featured: true,
    price: 45,
    minutes: 60,
    name: { es: 'Shape, Wax & Tint', en: 'Shape, Wax & Tint' },
    duration: { es: '1 hora', en: '1 hour' },
    blurb: {
      es: 'El diseño completo más tinte híbrido para rellenar los espacios y unificar el color.',
      en: 'The full shaping service plus a hybrid tint that fills the gaps and evens out the color.',
    },
    artists: ['laura'],
  },
  {
    id: 'lami-maintenance',
    category: 'brows',
    price: 45,
    minutes: 60,
    name: {
      es: 'Mantenimiento de laminado',
      en: 'Brow Lamination Maintenance',
    },
    duration: { es: '1 hora', en: '1 hour' },
    blurb: {
      es: 'Para clientas que ya tienen el laminado hecho y quieren mantener la forma y la dirección del vello.',
      en: 'For clients who already have lamination and want to keep the shape and the hair direction.',
    },
    artists: ['laura'],
  },
  {
    id: 'lami-wax',
    category: 'brows',
    featured: true,
    price: 80,
    minutes: 75,
    name: { es: 'Laminado & Wax (sin tinte)', en: 'Lamination & Wax (no tint)' },
    duration: { es: '1 hora 15 minutos', en: '1 hour 15 minutes' },
    blurb: {
      es: 'Laminado de cejas con depilación. El vello queda peinado hacia arriba, con una ceja más llena y ordenada.',
      en: 'Brow lamination with waxing. The hair is set upward for a fuller, tidier brow.',
    },
    caution: 'lamination',
    artists: ['laura'],
  },
  {
    id: 'lami-tint',
    category: 'brows',
    featured: true,
    price: 95,
    minutes: 120,
    name: { es: 'Laminado con tinte', en: 'Lamination with Tint' },
    duration: { es: '2 horas', en: '2 hours' },
    blurb: {
      es: 'Laminado más tinte. La opción más completa cuando quieres forma, densidad y color en una sola cita.',
      en: 'Lamination plus tint. The most complete option when you want shape, density, and color in one visit.',
    },
    caution: 'standard',
    artists: ['laura'],
  },
  {
    id: 'k-lash-lifting',
    category: 'lashes',
    featured: true,
    price: 115,
    minutes: 90,
    name: { es: 'Korean Lash Lifting', en: 'Korean Lash Lifting' },
    duration: { es: '1 hora 30 minutos', en: '1 hour 30 minutes' },
    blurb: {
      es: 'Curvatura de tus propias pestañas, sin extensiones. Se trabaja pestaña por pestaña para abrir la mirada.',
      en: 'A lift for your own lashes, no extensions. Worked lash by lash to open up the eye.',
    },
    artists: ['laura', 'isabel'],
  },
  {
    id: 'lash-hydration-tint',
    category: 'lashes',
    price: 20,
    minutes: 15,
    name: {
      es: 'Hidratación de pestañas + tinte',
      en: 'Lash Hydration + Tint',
    },
    duration: { es: '15 minutos', en: '15 minutes' },
    blurb: {
      es: 'Un complemento corto: hidratación de pestañas con tinte para más definición.',
      en: 'A short add on: lash hydration with tint for extra definition.',
    },
    artists: ['laura', 'isabel'],
  },
  {
    id: 'k-lash-brow-wax',
    category: 'combo',
    featured: true,
    price: 120,
    minutes: 120,
    name: {
      es: 'Korean Lash Lifting & depilación de cejas',
      en: 'Korean Lash Lifting & Brow Wax',
    },
    duration: { es: '2 horas', en: '2 hours' },
    blurb: {
      es: 'Pestañas levantadas y cejas depiladas y definidas en la misma visita.',
      en: 'Lifted lashes and shaped, waxed brows in the same visit.',
    },
    artists: ['laura'],
  },
  {
    id: 'k-lash-brow-tint',
    category: 'combo',
    price: 135,
    minutes: 150,
    name: {
      es: 'Korean Lash Lifting & tinte de cejas',
      en: 'Korean Lash Lifting & Brow Tint',
    },
    duration: { es: '2 horas 30 minutos', en: '2 hours 30 minutes' },
    blurb: {
      es: 'Lash lifting acompañado de tinte de cejas para equilibrar la mirada completa.',
      en: 'Lash lifting paired with a brow tint so the whole eye area is balanced.',
    },
    artists: ['laura'],
  },
  {
    id: 'k-lash-lami',
    category: 'combo',
    price: 165,
    minutes: 150,
    name: {
      es: 'Korean Lash Lifting & laminado (sin tinte)',
      en: 'Korean Lash Lifting & Lamination (no tint)',
    },
    duration: { es: '2 horas 30 minutos', en: '2 hours 30 minutes' },
    blurb: {
      es: 'Nuestro combo de cejas laminadas y pestañas levantadas, sin color añadido.',
      en: 'Laminated brows and lifted lashes together, with no added color.',
    },
    caution: 'lamination',
    artists: ['laura'],
  },
  {
    id: 'k-lash-lami-tint',
    category: 'combo',
    featured: true,
    price: 185,
    minutes: 180,
    name: {
      es: 'Korean Lash Lifting & laminado con color',
      en: 'Korean Lash Lifting & Lamination with Tint',
    },
    duration: { es: '3 horas', en: '3 hours' },
    blurb: {
      es: 'La cita más completa del estudio: laminado con color y pestañas levantadas de una sola vez.',
      en: 'The studio’s most complete appointment: tinted lamination and lifted lashes in one sitting.',
    },
    caution: 'lamination',
    nameNote: 'The current Square listing spells "Lifting" incorrectly. Corrected here.',
    artists: ['laura'],
  },
  {
    id: 'chin-wax',
    category: 'waxing',
    price: 15,
    minutes: 15,
    name: { es: 'Depilación de mentón', en: 'Chin Wax' },
    duration: { es: '15 minutos', en: '15 minutes' },
    blurb: {
      es: 'Depilación rápida de mentón, ideal como complemento de tu cita de cejas.',
      en: 'A quick chin wax, easy to add on to your brow appointment.',
    },
    artists: ['laura'],
  },
  {
    id: 'lip-wax',
    category: 'waxing',
    price: 10,
    minutes: 10,
    name: { es: 'Bigote / Lip Wax', en: 'Lip Wax' },
    duration: { es: '10 minutos', en: '10 minutes' },
    blurb: {
      es: 'Depilación del labio superior. Diez minutos y listo.',
      en: 'Upper lip waxing. Ten minutes and done.',
    },
    artists: ['laura'],
  },
  {
    id: 'lash-hydration-incomplete',
    category: 'lashes',
    price: 15,
    minutes: 15,
    needsOwnerConfirmation: true,
    name: { es: 'Hidratacion de pestañas con', en: 'Hidratacion de pestañas con' },
    duration: { es: '15 minutos', en: '15 minutes' },
    blurb: { es: '', en: '' },
    ownerNote:
      'The service name is cut off on the current Square site ("Hidratacion de pestañas con ..."). Kept here at its real price and duration but hidden from the menu and the booking demo until the studio confirms the full name.',
    artists: ['laura', 'isabel'],
  },
]

// Everything the site renders publicly, with the unconfirmed listing removed.
export const publicServices = services.filter((s) => !s.needsOwnerConfirmation)

export const getService = (id) => services.find((s) => s.id === id)
