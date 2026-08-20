// Every value here comes straight from the reference pack (BUSINESS-INFO.md and
// the studio's own homepage graphics). Nothing is invented. Edit this file to
// update the site's factual details.
export const business = {
  name: 'Brows Beauty',
  tagline: 'Beauty Studio',
  street: '145 S Main St',
  city: 'Freeport',
  state: 'NY',
  zip: '11520',
  get address() {
    return `${this.street}, ${this.city}, ${this.state} ${this.zip}`
  },
  phone: '(603) 338-1605',
  phoneHref: 'tel:+16033381605',
  email: 'brow.beauty24@gmail.com',
  emailHref: 'mailto:brow.beauty24@gmail.com',
  instagram: '@brows.beauty24',
  instagramUrl: 'https://www.instagram.com/brows.beauty24/',
  tiktok: '@brows.beauty3',
  tiktokUrl: 'https://www.tiktok.com/@brows.beauty3',
  mapsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=145+S+Main+St%2C+Freeport%2C+NY+11520',
  mapsPlaceUrl:
    'https://www.google.com/maps/search/?api=1&query=145+S+Main+St%2C+Freeport%2C+NY+11520',
  // The reference pack contains two different opening-hours tables (the homepage
  // graphic and the Square location panel) and they do not agree. Neither set is
  // published here. The site shows an appointment-only message instead until the
  // owner confirms the real schedule.
  hoursConfirmed: false,
  credit: 'Bellmore Web Design',
}
