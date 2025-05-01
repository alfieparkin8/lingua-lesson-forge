
export interface GrammarPoint {
  id: string;
  name: string;
  description: string;
  examples: string[];
}

export interface Topic {
  id: string;
  name: string;
  grammarPoints: GrammarPoint[];
  vocabulary: {
    spanish: string;
    english: string;
  }[];
}

export interface Theme {
  id: string;
  name: string;
  topics: Topic[];
}

export const curriculumData: Theme[] = [
  {
    id: "identity-culture",
    name: "Identity and culture",
    topics: [
      {
        id: "me-family-friends",
        name: "Me, my family and friends",
        grammarPoints: [
          {
            id: "present-tense",
            name: "Present tense regular verbs",
            description: "Used to describe current actions and states. Regular verbs follow consistent patterns in conjugation.",
            examples: [
              "Yo hablo español. (I speak Spanish.)",
              "Tú comes pizza. (You eat pizza.)",
              "Ella vive en Madrid. (She lives in Madrid.)"
            ]
          },
          {
            id: "adjective-agreement",
            name: "Adjective agreement",
            description: "In Spanish, adjectives must agree with the noun they describe in both gender and number.",
            examples: [
              "El libro rojo (The red book)",
              "La casa roja (The red house)",
              "Los libros rojos (The red books)",
              "Las casas rojas (The red houses)"
            ]
          },
          {
            id: "ser-estar",
            name: "Ser vs Estar",
            description: "Both verbs mean 'to be' but are used in different contexts. Ser is for permanent qualities, while estar is for temporary states.",
            examples: [
              "Yo soy alto. (I am tall.) - permanent characteristic",
              "Yo estoy cansado. (I am tired.) - temporary state",
              "La casa es grande. (The house is big.) - permanent quality",
              "La casa está limpia. (The house is clean.) - changeable state"
            ]
          }
        ],
        vocabulary: [
          { spanish: "la familia", english: "family" },
          { spanish: "el padre", english: "father" },
          { spanish: "la madre", english: "mother" },
          { spanish: "el hermano", english: "brother" },
          { spanish: "la hermana", english: "sister" },
          { spanish: "el abuelo", english: "grandfather" },
          { spanish: "la abuela", english: "grandmother" },
          { spanish: "el tío", english: "uncle" },
          { spanish: "la tía", english: "aunt" },
          { spanish: "el primo", english: "cousin (male)" },
          { spanish: "la prima", english: "cousin (female)" },
          { spanish: "el amigo", english: "friend (male)" },
          { spanish: "la amiga", english: "friend (female)" }
        ]
      },
      {
        id: "technology",
        name: "Technology in everyday life",
        grammarPoints: [
          {
            id: "para-infinitive",
            name: "Para + infinitive",
            description: "Used to express purpose or a goal 'in order to do something'.",
            examples: [
              "Uso mi teléfono para enviar mensajes. (I use my phone to send messages.)",
              "Compré un ordenador para estudiar. (I bought a computer to study.)",
              "Necesito Internet para buscar información. (I need Internet to look for information.)"
            ]
          },
          {
            id: "present-continuous",
            name: "Present continuous",
            description: "Used to describe actions that are happening at the moment of speaking. Formed with estar + gerund.",
            examples: [
              "Estoy navegando por Internet. (I am browsing the Internet.)",
              "Está enviando un correo electrónico. (He/She is sending an email.)",
              "Estamos usando la tecnología. (We are using technology.)"
            ]
          }
        ],
        vocabulary: [
          { spanish: "el ordenador", english: "computer" },
          { spanish: "el portátil", english: "laptop" },
          { spanish: "el móvil", english: "mobile phone" },
          { spanish: "la red social", english: "social network" },
          { spanish: "la contraseña", english: "password" },
          { spanish: "el sitio web", english: "website" },
          { spanish: "navegar por Internet", english: "to browse the Internet" },
          { spanish: "descargar", english: "to download" },
          { spanish: "subir", english: "to upload" },
          { spanish: "la aplicación", english: "app" }
        ]
      }
    ]
  },
  {
    id: "local-national-global",
    name: "Local, national, international and global areas of interest",
    topics: [
      {
        id: "home-town",
        name: "Home, town, neighborhood and region",
        grammarPoints: [
          {
            id: "hay",
            name: "Hay (there is/there are)",
            description: "Used to express existence or availability of something.",
            examples: [
              "Hay un parque en mi barrio. (There is a park in my neighborhood.)",
              "Hay muchos restaurantes en la ciudad. (There are many restaurants in the city.)",
              "No hay playa cerca de aquí. (There isn't a beach near here.)"
            ]
          },
          {
            id: "prepositions",
            name: "Prepositions of place",
            description: "Words that express position or location relative to something else.",
            examples: [
              "La tienda está enfrente de la escuela. (The shop is opposite the school.)",
              "El supermercado está al lado del banco. (The supermarket is next to the bank.)",
              "El museo está entre el parque y la biblioteca. (The museum is between the park and the library.)"
            ]
          }
        ],
        vocabulary: [
          { spanish: "la ciudad", english: "city" },
          { spanish: "el pueblo", english: "town/village" },
          { spanish: "el barrio", english: "neighborhood" },
          { spanish: "la calle", english: "street" },
          { spanish: "la plaza", english: "square" },
          { spanish: "el centro", english: "center/downtown" },
          { spanish: "el ayuntamiento", english: "town hall" },
          { spanish: "la tienda", english: "shop" },
          { spanish: "el supermercado", english: "supermarket" },
          { spanish: "el parque", english: "park" },
          { spanish: "la iglesia", english: "church" }
        ]
      },
      {
        id: "travel-tourism",
        name: "Travel and tourism",
        grammarPoints: [
          {
            id: "preterite-tense",
            name: "Preterite tense",
            description: "Used to talk about completed actions in the past with a definite start and end point.",
            examples: [
              "El año pasado fui a España. (Last year I went to Spain.)",
              "Visitamos el museo ayer. (We visited the museum yesterday.)",
              "¿Compraste recuerdos? (Did you buy souvenirs?)"
            ]
          },
          {
            id: "tiempo-expressions",
            name: "Expressions of time",
            description: "Phrases that indicate when an action takes place.",
            examples: [
              "El año pasado (Last year)",
              "El mes que viene (Next month)",
              "Hace dos días (Two days ago)",
              "Ayer (Yesterday)",
              "Mañana (Tomorrow)"
            ]
          }
        ],
        vocabulary: [
          { spanish: "el viaje", english: "trip/journey" },
          { spanish: "el turismo", english: "tourism" },
          { spanish: "el hotel", english: "hotel" },
          { spanish: "el albergue juvenil", english: "youth hostel" },
          { spanish: "el camping", english: "campsite" },
          { spanish: "el aeropuerto", english: "airport" },
          { spanish: "la estación", english: "station" },
          { spanish: "el billete", english: "ticket" },
          { spanish: "el pasaporte", english: "passport" },
          { spanish: "la playa", english: "beach" },
          { spanish: "la montaña", english: "mountain" }
        ]
      }
    ]
  },
  {
    id: "current-future-study",
    name: "Current and future study and employment",
    topics: [
      {
        id: "studies",
        name: "My studies",
        grammarPoints: [
          {
            id: "comparatives",
            name: "Comparatives",
            description: "Used to compare two things, showing how they are similar or different.",
            examples: [
              "Las matemáticas son más difíciles que el inglés. (Mathematics is more difficult than English.)",
              "La historia es menos interesante que la ciencia. (History is less interesting than science.)",
              "El español es tan útil como el francés. (Spanish is as useful as French.)"
            ]
          },
          {
            id: "tener-que",
            name: "Tener que + infinitive",
            description: "Used to express obligation or necessity.",
            examples: [
              "Tengo que estudiar para el examen. (I have to study for the exam.)",
              "Tienes que hacer los deberes. (You have to do the homework.)",
              "Tenemos que aprender el vocabulario. (We have to learn the vocabulary.)"
            ]
          }
        ],
        vocabulary: [
          { spanish: "la asignatura", english: "subject" },
          { spanish: "el examen", english: "exam" },
          { spanish: "los deberes", english: "homework" },
          { spanish: "el profesor/la profesora", english: "teacher" },
          { spanish: "el alumno/la alumna", english: "student" },
          { spanish: "la clase", english: "class" },
          { spanish: "el horario", english: "timetable" },
          { spanish: "el instituto", english: "secondary school" },
          { spanish: "la universidad", english: "university" },
          { spanish: "aprender", english: "to learn" },
          { spanish: "estudiar", english: "to study" }
        ]
      },
      {
        id: "careers",
        name: "Career choices and ambitions",
        grammarPoints: [
          {
            id: "future-tense",
            name: "Simple future tense",
            description: "Used to express actions that will happen in the future.",
            examples: [
              "Trabajaré en una oficina. (I will work in an office.)",
              "Estudiarás medicina. (You will study medicine.)",
              "Será profesor. (He will be a teacher.)"
            ]
          },
          {
            id: "conditional-tense",
            name: "Conditional tense",
            description: "Used to express what would happen under certain conditions.",
            examples: [
              "Me gustaría ser médico. (I would like to be a doctor.)",
              "Trabajaría en el extranjero. (I would work abroad.)",
              "¿Qué harías en mi situación? (What would you do in my situation?)"
            ]
          }
        ],
        vocabulary: [
          { spanish: "el trabajo", english: "job/work" },
          { spanish: "la profesión", english: "profession" },
          { spanish: "la empresa", english: "company" },
          { spanish: "la oficina", english: "office" },
          { spanish: "el salario", english: "salary" },
          { spanish: "ganar dinero", english: "to earn money" },
          { spanish: "el médico/la médica", english: "doctor" },
          { spanish: "el abogado/la abogada", english: "lawyer" },
          { spanish: "el ingeniero/la ingeniera", english: "engineer" },
          { spanish: "el/la periodista", english: "journalist" },
          { spanish: "ambicioso/a", english: "ambitious" }
        ]
      }
    ]
  }
];
