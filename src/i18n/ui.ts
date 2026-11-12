export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

export const ui = {
  es: {
    // Metadatos & SEO
    'meta.title': 'Bernardo Arrechea | Data Engineer Jr.',
    'meta.description': 'Portfolio profesional de Bernardo Arrechea, Data Engineer Jr. especializado en pipelines ETL/ELT, modelado dimensional, SQL analítico, dbt y Databricks.',
    
    // Navegación
    'nav.projects': 'Proyectos',
    'nav.skills': 'Habilidades',
    'nav.about': 'Sobre mí',
    'nav.contact': 'Contacto',
    'nav.resume': 'CV',
    'nav.menu_open': 'Abrir menú',
    'nav.menu_close': 'Cerrar menú',
    'nav.skip_to_content': 'Saltar al contenido principal',
    
    // Hero
    'hero.badge': 'Disponible para nuevas oportunidades',
    'hero.role': 'Data Engineer Jr.',
    'hero.tagline_highlight': 'Pipelines confiables',
    'hero.tagline': 'y modelado analítico para transformar datos crudos en decisiones de negocio.',
    'hero.bio': 'Especializado en arquitecturas lakehouse con Databricks, transformaciones en SQL y dbt, y orquestación reproducible. Enfoque práctico en calidad de datos y buenas prácticas de ingeniería de software aplicadas a datos.',
    'hero.cta_projects': 'Explorar proyectos',
    'hero.cta_resume': 'Descargar CV',
    'hero.cta_contact': 'Contactar',
    'hero.stack_label': 'Stack principal:',
    
    // Accesibilidad & UI
    'theme.toggle_label': 'Alternar tema claro y oscuro',
    'lang.toggle_label': 'Cambiar idioma',
    
    // Placeholders para secciones siguientes (Fases 2, 3, 4)
    'sections.projects_title': 'Proyectos Técnicos',
    'sections.projects_subtitle': 'Casos de estudio end-to-end con código fuente, diagramas de arquitectura y dashboards desplegados.',
    'sections.skills_title': 'Habilidades Técnicas',
    'sections.about_title': 'Sobre Mí & Formación',
    'sections.contact_title': 'Contacto',
    'sections.contact_desc': '¿Tienes una vacante o quieres hablar sobre ingeniería de datos? Conversemos.',
    'sections.copy_email': 'Copiar correo',
    'sections.email_copied': '¡Copiado!',
  },
  en: {
    // Metadata & SEO
    'meta.title': 'Bernardo Arrechea | Junior Data Engineer',
    'meta.description': 'Professional portfolio of Bernardo Arrechea, Junior Data Engineer specialized in ETL/ELT pipelines, dimensional modeling, analytical SQL, dbt, and Databricks.',
    
    // Navigation
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.resume': 'Resume',
    'nav.menu_open': 'Open menu',
    'nav.menu_close': 'Close menu',
    'nav.skip_to_content': 'Skip to main content',
    
    // Hero
    'hero.badge': 'Available for new opportunities',
    'hero.role': 'Junior Data Engineer',
    'hero.tagline_highlight': 'Reliable data pipelines',
    'hero.tagline': 'and dimensional modeling turning raw datasets into actionable insights.',
    'hero.bio': 'Specialized in Databricks lakehouse architectures, transformations with analytical SQL and dbt, and reproducible orchestration. Practical focus on data quality and software engineering rigor applied to data.',
    'hero.cta_projects': 'Explore projects',
    'hero.cta_resume': 'Download Resume',
    'hero.cta_contact': 'Get in touch',
    'hero.stack_label': 'Core stack:',
    
    // Accessibility & UI
    'theme.toggle_label': 'Toggle light and dark theme',
    'lang.toggle_label': 'Switch language',
    
    // Placeholders for subsequent sections
    'sections.projects_title': 'Technical Projects',
    'sections.projects_subtitle': 'End-to-end case studies with source code, architecture diagrams, and live dashboards.',
    'sections.skills_title': 'Technical Skills',
    'sections.about_title': 'About Me & Education',
    'sections.contact_title': 'Get In Touch',
    'sections.contact_desc': 'Have an open position or want to discuss data engineering? Let\'s talk.',
    'sections.copy_email': 'Copy email',
    'sections.email_copied': 'Copied!',
  },
} as const;

