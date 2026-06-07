export type Language = "en" | "sw"

export type Dictionary = {
  nav: {
    about: string
    skills: string
    services: string
    projects: string
    contact: string
    hireMe: string
  }
  hero: {
    badge: string
    name: string
    title: string
    tagline: string
    hireMe: string
    viewWork: string
    stats: { value: string; label: string }[]
  }
  about: {
    label: string
    heading: string
    paragraphs: string[]
    highlights: string[]
  }
  skills: {
    label: string
    heading: string
    subheading: string
    items: { name: string; level: number; description: string }[]
  }
  services: {
    label: string
    heading: string
    subheading: string
    items: { title: string; description: string }[]
  }
  projects: {
    label: string
    heading: string
    subheading: string
    items: { title: string; category: string; description: string }[]
    cta: string
  }
  contact: {
    label: string
    heading: string
    subheading: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    send: string
    sending: string
    success: string
    directTitle: string
    emailItem: string
    whatsappItem: string
  }
  footer: {
    rights: string
    tagline: string
    madeWith: string
  }
}

export const translations: Record<Language, Dictionary> = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      services: "Services",
      projects: "Projects",
      contact: "Contact",
      hireMe: "Hire Me",
    },
    hero: {
      badge: "Available for freelance work",
      name: "Abdulaziz Haroun",
      title: "Digital Marketer · Copywriter · Affiliate Marketer",
      tagline: "Helping businesses grow through powerful digital strategies",
      hireMe: "Hire Me",
      viewWork: "View My Work",
      stats: [
        { value: "5+", label: "Skill areas" },
        { value: "100%", label: "Client focused" },
        { value: "24/7", label: "Dedication" },
      ],
    },
    about: {
      label: "About Me",
      heading: "Turning ideas into measurable online growth",
      paragraphs: [
        "I'm Abdulaziz Haroun, a passionate digital marketer and copywriter dedicated to helping businesses thrive online. I've been sharpening my craft across digital marketing, copywriting, email marketing, and affiliate marketing.",
        "My focus is simple: combine clear, persuasive messaging with smart marketing strategy so brands can reach the right audience, build trust, and convert attention into real results.",
      ],
      highlights: [
        "Results-driven mindset",
        "Persuasive storytelling",
        "Data-informed decisions",
        "Always learning & improving",
      ],
    },
    skills: {
      label: "Skills",
      heading: "What I bring to the table",
      subheading: "A focused toolkit built to drive engagement, conversions, and growth.",
      items: [
        { name: "Digital Marketing", level: 90, description: "End-to-end campaigns that attract and convert." },
        { name: "Copywriting", level: 92, description: "Words that persuade and sell." },
        { name: "Email Marketing", level: 85, description: "Nurture sequences that build loyalty." },
        { name: "Affiliate Marketing", level: 80, description: "Performance-based growth partnerships." },
        { name: "Social Media Marketing", level: 88, description: "Content that grows engaged communities." },
      ],
    },
    services: {
      label: "Services",
      heading: "How I can help your business",
      subheading: "Practical, results-oriented services tailored to your goals.",
      items: [
        { title: "Content Writing", description: "Compelling website copy, blogs, and sales pages that connect with your audience and drive action." },
        { title: "Social Media Management", description: "Strategy, content, and consistency to grow your presence and engage your followers." },
        { title: "Marketing Strategy", description: "Clear, data-informed plans that align your message with the right audience and channels." },
        { title: "Brand Growth Assistance", description: "Hands-on support to expand your reach, build trust, and turn followers into customers." },
      ],
    },
    projects: {
      label: "Portfolio",
      heading: "Selected work",
      subheading: "A snapshot of the kind of results-focused projects I love to work on.",
      items: [
        { title: "E-commerce Launch Campaign", category: "Digital Marketing", description: "A full launch funnel with paid ads, email flows, and conversion-focused copy that boosted online sales." },
        { title: "Brand Email Series", category: "Email Marketing", description: "A 6-part welcome and nurture sequence designed to build trust and turn subscribers into loyal buyers." },
        { title: "Social Media Growth", category: "Social Media", description: "A content strategy and posting plan that grew an engaged audience and increased brand awareness." },
      ],
      cta: "Start a project",
    },
    contact: {
      label: "Contact",
      heading: "Let's grow your business together",
      subheading: "Have a project in mind? Send me a message and I'll get back to you.",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      messageLabel: "Message",
      messagePlaceholder: "Tell me about your project...",
      send: "Send Message",
      sending: "Sending...",
      success: "Thanks! Your message has been sent.",
      directTitle: "Reach me directly",
      emailItem: "Email",
      whatsappItem: "WhatsApp",
    },
    footer: {
      rights: "All rights reserved.",
      tagline: "Helping businesses grow through powerful digital strategies.",
      madeWith: "Built with passion",
    },
  },
  sw: {
    nav: {
      about: "Kuhusu",
      skills: "Ujuzi",
      services: "Huduma",
      projects: "Miradi",
      contact: "Wasiliana",
      hireMe: "Niajiri",
    },
    hero: {
      badge: "Nipo tayari kwa kazi za kujitegemea",
      name: "Abdulaziz Haroun",
      title: "Mtaalamu wa Masoko ya Mtandao · Mwandishi · Masoko ya Ushirika",
      tagline: "Kusaidia biashara kukua kupitia mikakati madhubuti ya kidijitali",
      hireMe: "Niajiri",
      viewWork: "Angalia Kazi Zangu",
      stats: [
        { value: "5+", label: "Maeneo ya ujuzi" },
        { value: "100%", label: "Kuzingatia mteja" },
        { value: "24/7", label: "Kujituma" },
      ],
    },
    about: {
      label: "Kuhusu Mimi",
      heading: "Kugeuza mawazo kuwa ukuaji halisi wa mtandaoni",
      paragraphs: [
        "Mimi ni Abdulaziz Haroun, mtaalamu wa masoko ya kidijitali na mwandishi mwenye shauku ya kusaidia biashara kufanikiwa mtandaoni. Nimekuwa nikiboresha ujuzi wangu katika masoko ya kidijitali, uandishi, masoko ya barua pepe, na masoko ya ushirika.",
        "Lengo langu ni rahisi: kuunganisha ujumbe ulio wazi na wenye kushawishi pamoja na mkakati bora wa masoko ili chapa zifikie hadhira sahihi, zijenge imani, na zibadilishe umakini kuwa matokeo halisi.",
      ],
      highlights: [
        "Mtazamo unaolenga matokeo",
        "Usimulizi wenye kushawishi",
        "Maamuzi yanayotokana na data",
        "Kujifunza na kuboresha kila wakati",
      ],
    },
    skills: {
      label: "Ujuzi",
      heading: "Ninachokileta mezani",
      subheading: "Seti ya zana iliyolenga kuongeza ushirikiano, mauzo, na ukuaji.",
      items: [
        { name: "Masoko ya Kidijitali", level: 90, description: "Kampeni kamili zinazovutia na kubadilisha wateja." },
        { name: "Uandishi (Copywriting)", level: 92, description: "Maneno yanayoshawishi na kuuza." },
        { name: "Masoko ya Barua Pepe", level: 85, description: "Mfululizo unaojenga uaminifu." },
        { name: "Masoko ya Ushirika", level: 80, description: "Ushirikiano wa ukuaji kulingana na utendaji." },
        { name: "Masoko ya Mitandao ya Kijamii", level: 88, description: "Maudhui yanayokuza jamii zinazoshirikiana." },
      ],
    },
    services: {
      label: "Huduma",
      heading: "Jinsi ninavyoweza kusaidia biashara yako",
      subheading: "Huduma za vitendo, zinazolenga matokeo kulingana na malengo yako.",
      items: [
        { title: "Uandishi wa Maudhui", description: "Maandishi ya tovuti, blogu, na kurasa za mauzo yanayowafikia wateja na kuwachochea kuchukua hatua." },
        { title: "Usimamizi wa Mitandao ya Kijamii", description: "Mkakati, maudhui, na uthabiti wa kukuza uwepo wako na kushirikisha wafuasi wako." },
        { title: "Mkakati wa Masoko", description: "Mipango iliyo wazi na inayotokana na data inayolinganisha ujumbe wako na hadhira sahihi." },
        { title: "Msaada wa Ukuaji wa Chapa", description: "Msaada wa moja kwa moja kupanua ufikiaji wako, kujenga imani, na kugeuza wafuasi kuwa wateja." },
      ],
    },
    projects: {
      label: "Kazi Zangu",
      heading: "Kazi zilizochaguliwa",
      subheading: "Mfano wa miradi inayolenga matokeo ninayopenda kufanya kazi nayo.",
      items: [
        { title: "Kampeni ya Uzinduzi wa Biashara Mtandao", category: "Masoko ya Kidijitali", description: "Mfumo kamili wa uzinduzi wenye matangazo ya kulipia, mfululizo wa barua pepe, na maandishi yaliyoongeza mauzo." },
        { title: "Mfululizo wa Barua Pepe za Chapa", category: "Masoko ya Barua Pepe", description: "Mfululizo wa sehemu 6 wa kukaribisha uliobuniwa kujenga imani na kugeuza wajumbe kuwa wateja waaminifu." },
        { title: "Ukuaji wa Mitandao ya Kijamii", category: "Mitandao ya Kijamii", description: "Mkakati wa maudhui uliokuza hadhira inayoshirikiana na kuongeza ufahamu wa chapa." },
      ],
      cta: "Anzisha mradi",
    },
    contact: {
      label: "Wasiliana",
      heading: "Tukuze biashara yako pamoja",
      subheading: "Una mradi akilini? Nitumie ujumbe nami nitakujibu haraka.",
      nameLabel: "Jina",
      namePlaceholder: "Jina lako",
      emailLabel: "Barua pepe",
      emailPlaceholder: "wewe@mfano.com",
      messageLabel: "Ujumbe",
      messagePlaceholder: "Niambie kuhusu mradi wako...",
      send: "Tuma Ujumbe",
      sending: "Inatuma...",
      success: "Asante! Ujumbe wako umetumwa.",
      directTitle: "Niwasiliane moja kwa moja",
      emailItem: "Barua pepe",
      whatsappItem: "WhatsApp",
    },
    footer: {
      rights: "Haki zote zimehifadhiwa.",
      tagline: "Kusaidia biashara kukua kupitia mikakati madhubuti ya kidijitali.",
      madeWith: "Imejengwa kwa shauku",
    },
  },
}
