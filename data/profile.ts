export const profile = {
  name: 'Jabez Cyrus Baliling',
  title: 'UI/UX & Graphics Designer',
  photo: '/images/Jabezzz.jpg',
  // Email is assembled at runtime via buildEmail() to avoid scraper harvesting
  emailParts: ['jc.baliling', 'gmail.com'],
  // Phone removed from public bundle for privacy
  location: 'Philippines',
  bio: `Creative and detail-oriented Graphic and Web Designer with experience in creating visually compelling designs and user-friendly
  visuals. Skilled in transforming ideas into clean, modern visuals that align with brand identity and business goals.
  Passionate about design, usability, and continuous learning.`,
  available: true,

  stats: [
    { value: '5+', label: 'Years Experience' },
    { value: '120+', label: 'Projects Completed' },
    { value: '40+', label: 'Happy Clients' },
    { value: '12+', label: 'Awards Won' },
  ],

  services: [
    'UI Design',
    'UX Research',
    'Graphics Design',
    'Branding',
    'Prototyping',
  ],

  socials: {
    linkedin: 'https://www.linkedin.com/in/jc-baliling/',
    facebook: 'https://www.facebook.com/Mr.ZEBAJ',
    github: 'https://github.com/OggyYggo',
  },
}

/** Assemble email at runtime to avoid simple scraper harvesting. */
export function buildEmail(): string {
  return `${profile.emailParts[0]}@${profile.emailParts[1]}`
}
