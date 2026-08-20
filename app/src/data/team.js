// Bios are the artists' own words from the reference pack, lightly tidied for
// punctuation only. Availability is kept here as editable content because the
// studio may change it.
export const team = [
  {
    id: 'laura',
    name: 'Laura',
    photo: 'images/laura-portrait.jpg',
    focus: { es: 'Diseño de cejas y laminado', en: 'Brow design and lamination' },
    role: {
      es: 'Artista de cejas y pestañas',
      en: 'Brow and lash artist',
    },
    bio: {
      es: 'Soy artista de cejas y pestañas, apasionada por resaltar tu belleza natural a través de servicios personalizados. Ya sea que busques un resultado suave y natural o una definición más marcada, cada servicio está diseñado según tus facciones y preferencias. Mi misión es brindarte una experiencia cómoda, profesional y acogedora donde te sientas hermosa, segura y escuchada.',
      en: 'I am a brow and lash artist, and I love bringing out your natural beauty with services made for you. Whether you want something soft and natural or a sharper definition, every service is designed around your features and your preferences. My goal is to give you a comfortable, professional, and welcoming visit where you feel beautiful, confident, and heard.',
    },
    skills: [
      { es: 'Diseño y depilación de cejas', en: 'Brow design and waxing' },
      { es: 'Tinte híbrido', en: 'Hybrid tint' },
      { es: 'Laminado de cejas', en: 'Brow lamination' },
      { es: 'Korean Lash Lifting', en: 'Korean Lash Lifting' },
    ],
    // Laura's own days are not published anywhere in the reference pack, so the
    // demo leaves her sample dates open rather than inventing a schedule.
    availability: { days: null, note: null },
  },
  {
    id: 'isabel',
    name: 'Isabel Castro',
    photo: 'images/isabel-portrait.jpg',
    focus: { es: 'Korean Lash Lifting', en: 'Korean Lash Lifting' },
    role: {
      es: 'Especialista en pestañas',
      en: 'Lash specialist',
    },
    bio: {
      es: 'Me especializo en Korean Lash Lifting, realzando tus pestañas naturales con resultados hermosos, saludables y duraderos. Mi objetivo es brindarte una experiencia relajante mientras te ayudo a sentirte segura y hermosa.',
      en: 'I specialize in Korean Lash Lifting, enhancing your natural lashes with beautiful, healthy, and long lasting results. My goal is to give you a relaxing visit while helping you feel confident and beautiful.',
    },
    comingSoon: {
      es: 'Próximamente: diseño de cejas y tinte híbrido.',
      en: 'Coming soon: brow shaping and hybrid tint services.',
    },
    skills: [
      { es: 'Korean Lash Lifting', en: 'Korean Lash Lifting' },
      { es: 'Hidratación de pestañas', en: 'Lash hydration' },
    ],
    // Editable: the current homepage graphic says "Disponible solo domingo".
    // 0 = Sunday. Change `days` (or set it to null) when availability changes.
    availability: {
      days: [0],
      note: {
        es: 'Según la información actual del estudio, Isabel atiende solamente los domingos. Este dato se puede actualizar en cualquier momento.',
        en: 'Based on the studio’s current information, Isabel takes appointments on Sundays only. This is editable content and can be updated at any time.',
      },
    },
  },
]

export const getArtist = (id) => team.find((a) => a.id === id)
