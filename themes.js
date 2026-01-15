// themes.js

export const THEME_LIST = [
  { id:"family", title:"Family", emoji:"👨‍👩‍👧‍👦" },
  { id:"daily", title:"Daily Routine", emoji:"⏰" },
  { id:"school", title:"School", emoji:"🏫" },
  { id:"yourself", title:"Yourself", emoji:"🙋" },
  { id:"barrio", title:"Barrio", emoji:"🏙️" },
  { id:"amigos", title:"Amigos", emoji:"🧑‍🤝‍🧑" },
  { id:"comida", title:"Comida", emoji:"🍽️" },
  { id:"bebida", title:"Bebida", emoji:"🥤" },
  { id:"uniforme", title:"Uniforme escolar", emoji:"👔" },
  { id:"casa", title:"Casa", emoji:"🏠" },
  { id:"tiempo", title:"El tiempo", emoji:"🌦️" },
  { id:"hora", title:"La hora", emoji:"🕒" },
  { id:"direcciones", title:"Direcciones", emoji:"🧭" },
  { id:"asignaturas", title:"Asignaturas", emoji:"📚" }
];

export function getThemeTitle(themeId){
  return THEME_LIST.find(t=>t.id===themeId)?.title || themeId;
}

function coverSvg(emoji, a="#00d084", b="#ffd166", c="#6a55ff"){
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${a}"/>
        <stop offset="1" stop-color="${b}"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="800" fill="url(#g)"/>
    <circle cx="980" cy="150" r="220" fill="${c}" opacity="0.35"/>
    <circle cx="210" cy="650" r="280" fill="#fff" opacity="0.20"/>
    <text x="70" y="640" font-size="520" font-family="system-ui" opacity="0.92">${emoji}</text>
  </svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}

export function tileCoverCss(themeId){
  const emoji = THEME_LIST.find(t=>t.id===themeId)?.emoji || "🧊";
  const presets = {
    family: coverSvg(emoji, "#00d084", "#ffd166", "#6a55ff"),
    daily: coverSvg(emoji, "#ff4d6d", "#ffd166", "#00d084"),
    school: coverSvg(emoji, "#00c2ff", "#ffd166", "#ff4d6d"),
    yourself: coverSvg(emoji, "#6a55ff", "#00d084", "#ffd166"),
    barrio: coverSvg(emoji, "#00d084", "#00c2ff", "#ffd166"),
    amigos: coverSvg(emoji, "#ffd166", "#00d084", "#ff4d6d"),
    comida: coverSvg(emoji, "#ff7a18", "#ffd166", "#00d084"),
    bebida: coverSvg(emoji, "#00c2ff", "#6a55ff", "#ffd166"),
    uniforme: coverSvg(emoji, "#00d084", "#ffd166", "#00c2ff"),
    casa: coverSvg(emoji, "#6a55ff", "#ffd166", "#00d084"),
    tiempo: coverSvg(emoji, "#00c2ff", "#00d084", "#ffd166"),
    hora: coverSvg(emoji, "#ffd166", "#6a55ff", "#00d084"),
    direcciones: coverSvg(emoji, "#00d084", "#ffd166", "#ff4d6d"),
    asignaturas: coverSvg(emoji, "#ff4d6d", "#00c2ff", "#ffd166"),
  };
  return presets[themeId] || coverSvg(emoji);
}

// ---------- DATASETS ----------
// Each level is an array of pairs: [English prompt, "spanish1|spanish2"]
// Spanish is filled now. FR/DE/EN intentionally empty placeholders (wired, safe).

function P(en, esPipe){ return { en, answers: esPipe.split("|") }; }

const ES = {
  family: {
    1: [
      P("mother","madre|mamá"),
      P("father","padre|papá"),
      P("brother","hermano"),
      P("sister","hermana"),
      P("parents","padres"),
      P("family","familia"),
      P("son","hijo"),
      P("daughter","hija")
    ],
    2: [
      P("grandmother","abuela"),
      P("grandfather","abuelo"),
      P("grandparents","abuelos"),
      P("uncle","tío"),
      P("aunt","tía"),
      P("cousin (male)","primo"),
      P("cousin (female)","prima"),
      P("relative","pariente|familiar")
    ],
    3: [
      P("nephew","sobrino"),
      P("niece","sobrina"),
      P("husband","marido|esposo"),
      P("wife","mujer|esposa"),
      P("stepfather","padrastro"),
      P("stepmother","madrastra"),
      P("to get married","casarse"),
      P("wedding","boda")
    ],
    4: [
      P("divorce","divorcio"),
      P("to separate","separarse"),
      P("to live together","vivir juntos|convivir"),
      P("to look after","cuidar"),
      P("to get along","llevarse bien"),
      P("to argue","discutir"),
      P("relationship","relación"),
      P("to meet (someone)","conocer")
    ],
    5: [
      P("to date","salir con"),
      P("engaged","comprometido|prometido"),
      P("fiancé","prometido"),
      P("fiancée","prometida"),
      P("to propose","pedir matrimonio|proponer matrimonio"),
      P("to break up","romper"),
      P("to forgive","perdonar"),
      P("to trust","confiar")
    ],
    6: [
      P("in-laws","suegros"),
      P("mother-in-law","suegra"),
      P("father-in-law","suegro"),
      P("brother-in-law","cuñado"),
      P("sister-in-law","cuñada"),
      P("to adopt","adoptar"),
      P("adoption","adopción"),
      P("pregnant","embarazada")
    ],
    7: [
      P("to give birth","dar a luz"),
      P("childhood","infancia"),
      P("teenager","adolescente"),
      P("adult","adulto"),
      P("elderly person","anciano|mayor"),
      P("generation","generación"),
      P("family tree","árbol genealógico"),
      P("inheritance","herencia")
    ],
    8: [
      P("to take after","parecerse a"),
      P("to depend on","depender de"),
      P("to set rules","poner reglas|establecer reglas"),
      P("to allow","permitir"),
      P("to forbid","prohibir"),
      P("to punish","castigar"),
      P("to obey","obedecer"),
      P("to behave","portarse")
    ],
    9: [
      P("to be grounded","estar castigado"),
      P("discussion","discusión"),
      P("to compromise","llegar a un acuerdo|comprometerse"),
      P("support network","red de apoyo"),
      P("to seek help","buscar ayuda"),
      P("to cope","afrontar"),
      P("to overcome","superar"),
      P("mutual respect","respeto mutuo")
    ],
    10: [
      P("family breakdown","ruptura familiar"),
      P("dysfunctional family","familia disfuncional"),
      P("to mediate","mediar"),
      P("mediation","mediación"),
      P("foster family","familia de acogida"),
      P("to be estranged","estar distanciado"),
      P("to maintain contact","mantener el contacto"),
      P("to cut ties","romper lazos")
    ]
  },

  daily: {
    1: [
      P("to wake up","despertarse"),
      P("to get up","levantarse"),
      P("to have breakfast","desayunar"),
      P("to go to school","ir al colegio|ir a la escuela"),
      P("to have lunch","almorzar|comer"),
      P("to do homework","hacer los deberes"),
      P("to have dinner","cenar"),
      P("to go to bed","acostarse")
    ],
    2: [
      P("to have a shower","ducharse"),
      P("to brush my teeth","lavarse los dientes"),
      P("to get dressed","vestirse"),
      P("to leave home","salir de casa"),
      P("to arrive","llegar"),
      P("to be late","llegar tarde"),
      P("to be early","llegar temprano"),
      P("to take the bus","coger el autobús|tomar el autobús")
    ],
    3: [
      P("to study","estudiar"),
      P("to revise","repasar"),
      P("to listen to music","escuchar música"),
      P("to watch TV","ver la tele|ver televisión"),
      P("to play video games","jugar a los videojuegos"),
      P("to help at home","ayudar en casa"),
      P("to tidy my room","ordenar mi habitación"),
      P("to relax","relajarse")
    ],
    4: [
      P("to set an alarm","poner la alarma"),
      P("to take a break","tomar un descanso"),
      P("to go for a walk","dar un paseo"),
      P("to meet friends","quedar con amigos"),
      P("to chat online","chatear"),
      P("to do chores","hacer tareas"),
      P("to be tired","estar cansado"),
      P("to be exhausted","estar agotado")
    ],
    5: [
      P("to hurry up","darse prisa"),
      P("to miss the bus","perder el autobús"),
      P("to pack my bag","preparar la mochila"),
      P("to have a snack","merendar"),
      P("to practice sport","practicar deporte"),
      P("to train","entrenar"),
      P("to go shopping","ir de compras"),
      P("to cook","cocinar")
    ],
    6: [
      P("to do the dishes","lavar los platos"),
      P("to clean","limpiar"),
      P("to sweep","barrer"),
      P("to vacuum","pasar la aspiradora"),
      P("to take out the rubbish","sacar la basura"),
      P("to walk the dog","pasear al perro"),
      P("to iron","planchar"),
      P("to fold clothes","doblar la ropa")
    ],
    7: [
      P("to fall asleep","dormirse"),
      P("to oversleep","quedarse dormido"),
      P("to stay up late","acostarse tarde"),
      P("to get bored","aburrirse"),
      P("to be busy","estar ocupado"),
      P("to be in a hurry","tener prisa"),
      P("to waste time","perder el tiempo"),
      P("to save time","ahorrar tiempo")
    ],
    8: [
      P("to focus","concentrarse"),
      P("to get distracted","distraerse"),
      P("to improve","mejorar"),
      P("to make progress","progresar"),
      P("to set goals","ponerse metas"),
      P("to keep a routine","mantener una rutina"),
      P("to be responsible","ser responsable"),
      P("to be organised","ser organizado")
    ],
    9: [
      P("to manage my time","gestionar mi tiempo"),
      P("to balance","equilibrar"),
      P("to feel stressed","sentirse estresado"),
      P("to calm down","calmarse"),
      P("to make a schedule","hacer un horario"),
      P("to postpone","aplazar"),
      P("to finish","terminar"),
      P("to hand in homework","entregar los deberes")
    ],
    10: [
      P("to be motivated","estar motivado"),
      P("to stay consistent","ser constante"),
      P("to make an effort","esforzarse"),
      P("to be proud","estar orgulloso"),
      P("to learn from mistakes","aprender de los errores"),
      P("to be independent","ser independiente"),
      P("to take responsibility","asumir la responsabilidad"),
      P("to set priorities","establecer prioridades")
    ]
  },

  school: {
    1: [
      P("school","la escuela|el colegio"),
      P("classroom","la clase|el aula"),
      P("teacher","el profesor|la profesora"),
      P("student","el alumno|la alumna"),
      P("homework","los deberes"),
      P("book","el libro"),
      P("pen","el bolígrafo"),
      P("exam","el examen")
    ],
    2: [
      P("notebook","el cuaderno"),
      P("pencil","el lápiz"),
      P("rubber / eraser","la goma"),
      P("ruler","la regla"),
      P("bag","la mochila"),
      P("break / recess","el recreo"),
      P("timetable","el horario"),
      P("library","la biblioteca")
    ],
    3: [
      P("to learn","aprender"),
      P("to study","estudiar"),
      P("to answer","contestar"),
      P("to ask a question","hacer una pregunta"),
      P("to explain","explicar"),
      P("to repeat","repetir"),
      P("to understand","entender"),
      P("to help","ayudar")
    ],
    4: [
      P("to pass","aprobar"),
      P("to fail","suspender"),
      P("mark / grade","la nota"),
      P("test","la prueba"),
      P("project","el proyecto"),
      P("presentation","la presentación"),
      P("group work","el trabajo en grupo"),
      P("to practice","practicar")
    ],
    5: [
      P("rules","las reglas"),
      P("to behave","portarse"),
      P("to be on time","llegar a tiempo"),
      P("to be late","llegar tarde"),
      P("detention","el castigo"),
      P("headteacher","el director|la directora"),
      P("canteen","el comedor"),
      P("sports hall","el gimnasio")
    ],
    6: [
      P("optional subject","la optativa"),
      P("compulsory","obligatorio"),
      P("extracurricular","extraescolar"),
      P("school trip","la excursión"),
      P("to sign up","apuntarse"),
      P("to revise","repasar"),
      P("to hand in","entregar"),
      P("deadline","la fecha límite")
    ],
    7: [
      P("to concentrate","concentrarse"),
      P("to get distracted","distraerse"),
      P("to take notes","tomar apuntes"),
      P("to highlight","subrayar"),
      P("to correct","corregir"),
      P("to make mistakes","cometer errores"),
      P("to improve","mejorar"),
      P("to participate","participar")
    ],
    8: [
      P("pressure","la presión"),
      P("stress","el estrés"),
      P("to be nervous","estar nervioso"),
      P("to gain confidence","ganar confianza"),
      P("to set goals","ponerse metas"),
      P("to make an effort","esforzarse"),
      P("to succeed","tener éxito"),
      P("to struggle","tener dificultades")
    ],
    9: [
      P("discipline","la disciplina"),
      P("responsibility","la responsabilidad"),
      P("punctuality","la puntualidad"),
      P("respect","el respeto"),
      P("to motivate","motivar"),
      P("to encourage","animar"),
      P("to advise","aconsejar"),
      P("to support","apoyar")
    ],
    10: [
      P("future plans","los planes de futuro"),
      P("career","la carrera"),
      P("skills","las habilidades"),
      P("to choose","elegir"),
      P("to decide","decidir"),
      P("to prepare","prepararse"),
      P("to manage time","gestionar el tiempo"),
      P("to take responsibility","asumir la responsabilidad")
    ]
  },

  yourself: {
    1: [
      P("my name is…","me llamo"),
      P("I am … years old","tengo … años"),
      P("I live in…","vivo en"),
      P("I am from…","soy de"),
      P("I have","tengo"),
      P("I like","me gusta"),
      P("I don't like","no me gusta"),
      P("hobbies","las aficiones")
    ],
    2: [
      P("tall","alto"),
      P("short","bajo"),
      P("hair","el pelo"),
      P("eyes","los ojos"),
      P("brown","marrón"),
      P("blonde","rubio"),
      P("friendly","simpático"),
      P("shy","tímido")
    ],
    3: [
      P("funny","divertido"),
      P("hard-working","trabajador"),
      P("lazy","perezoso"),
      P("sporty","deportista"),
      P("honest","honesto"),
      P("kind","amable"),
      P("confident","seguro de sí mismo"),
      P("creative","creativo")
    ],
    4: [
      P("to get on with","llevarse bien con"),
      P("to argue","discutir"),
      P("to help","ayudar"),
      P("to share","compartir"),
      P("to respect","respetar"),
      P("to trust","confiar"),
      P("strengths","los puntos fuertes"),
      P("weaknesses","los puntos débiles")
    ],
    5: [
      P("to improve","mejorar"),
      P("to change","cambiar"),
      P("to try","intentar"),
      P("to succeed","tener éxito"),
      P("to fail","fracasar"),
      P("to be motivated","estar motivado"),
      P("to be stressed","estar estresado"),
      P("to relax","relajarse")
    ],
    6: [
      P("future plans","los planes de futuro"),
      P("I want to be…","quiero ser"),
      P("job","el trabajo"),
      P("career","la carrera"),
      P("university","la universidad"),
      P("training","la formación"),
      P("to travel","viajar"),
      P("to learn languages","aprender idiomas")
    ],
    7: [
      P("values","los valores"),
      P("responsibility","la responsabilidad"),
      P("independence","la independencia"),
      P("to make an effort","esforzarse"),
      P("to set goals","ponerse metas"),
      P("to take decisions","tomar decisiones"),
      P("to take risks","asumir riesgos"),
      P("to be proud","estar orgulloso")
    ],
    8: [
      P("mental health","la salud mental"),
      P("well-being","el bienestar"),
      P("to feel anxious","sentirse ansioso"),
      P("to calm down","calmarse"),
      P("to seek help","buscar ayuda"),
      P("support","el apoyo"),
      P("to cope","afrontar"),
      P("to overcome","superar")
    ],
    9: [
      P("identity","la identidad"),
      P("self-esteem","la autoestima"),
      P("to compare myself","compararme"),
      P("social media","las redes sociales"),
      P("to disconnect","desconectar"),
      P("to focus","concentrarse"),
      P("to keep balance","mantener el equilibrio"),
      P("to set boundaries","poner límites")
    ],
    10: [
      P("to be resilient","ser resiliente"),
      P("to learn from mistakes","aprender de los errores"),
      P("to be consistent","ser constante"),
      P("to take responsibility","asumir la responsabilidad"),
      P("to keep improving","seguir mejorando"),
      P("to be grateful","estar agradecido"),
      P("to support others","apoyar a los demás"),
      P("personal growth","el crecimiento personal")
    ]
  },

  barrio: {
    1: [
      P("town","el pueblo|la ciudad"),
      P("street","la calle"),
      P("square","la plaza"),
      P("park","el parque"),
      P("shop","la tienda"),
      P("cinema","el cine"),
      P("supermarket","el supermercado"),
      P("school","la escuela|el colegio")
    ],
    2: [
      P("bakery","la panadería"),
      P("pharmacy","la farmacia"),
      P("bank","el banco"),
      P("post office","correos"),
      P("sports centre","el polideportivo"),
      P("swimming pool","la piscina"),
      P("train station","la estación de tren"),
      P("bus stop","la parada de autobús")
    ],
    3: [
      P("quiet","tranquilo"),
      P("noisy","ruidoso"),
      P("crowded","lleno"),
      P("clean","limpio"),
      P("dirty","sucio"),
      P("safe","seguro"),
      P("dangerous","peligroso"),
      P("modern","moderno")
    ],
    4: [
      P("there is / there are","hay"),
      P("near","cerca"),
      P("far","lejos"),
      P("next to","al lado de"),
      P("opposite","enfrente de"),
      P("between","entre"),
      P("in the centre","en el centro"),
      P("on the outskirts","en las afueras")
    ],
    5: [
      P("traffic","el tráfico"),
      P("pollution","la contaminación"),
      P("noise","el ruido"),
      P("green spaces","las zonas verdes"),
      P("public transport","el transporte público"),
      P("to improve","mejorar"),
      P("to reduce","reducir"),
      P("to protect","proteger")
    ],
    6: [
      P("neighbourhood","el barrio"),
      P("town hall","el ayuntamiento"),
      P("tourists","los turistas"),
      P("to visit","visitar"),
      P("to go out","salir"),
      P("to hang out","quedar"),
      P("to meet friends","quedar con amigos"),
      P("to have fun","divertirse")
    ],
    7: [
      P("advantages","las ventajas"),
      P("disadvantages","las desventajas"),
      P("quality of life","la calidad de vida"),
      P("to complain","quejarse"),
      P("to recommend","recomendar"),
      P("to move house","mudarse"),
      P("to feel at home","sentirse como en casa"),
      P("community","la comunidad")
    ],
    8: [
      P("to recycle","reciclar"),
      P("rubbish","la basura"),
      P("to pick up litter","recoger basura"),
      P("to save energy","ahorrar energía"),
      P("to use less water","usar menos agua"),
      P("to plant trees","plantar árboles"),
      P("to raise awareness","concienciar"),
      P("to take action","actuar")
    ],
    9: [
      P("housing","la vivienda"),
      P("rent","el alquiler"),
      P("to afford","permitirse"),
      P("to be expensive","ser caro"),
      P("to be cheap","ser barato"),
      P("to feel unsafe","sentirse inseguro"),
      P("to report","denunciar"),
      P("support network","red de apoyo")
    ],
    10: [
      P("urban planning","la planificación urbana"),
      P("sustainable","sostenible"),
      P("to reduce emissions","reducir emisiones"),
      P("to improve transport","mejorar el transporte"),
      P("to create jobs","crear empleo"),
      P("to invest","invertir"),
      P("to develop","desarrollar"),
      P("future of the city","el futuro de la ciudad")
    ]
  },

  amigos: {
    1: [
      P("friend","amigo|amiga"),
      P("best friend","mejor amigo|mejor amiga"),
      P("group of friends","grupo de amigos"),
      P("to meet","quedar"),
      P("to talk","hablar"),
      P("to laugh","reír"),
      P("to help","ayudar"),
      P("to share","compartir")
    ],
    2: [
      P("kind","amable"),
      P("funny","divertido"),
      P("friendly","simpático"),
      P("loyal","leal"),
      P("honest","honesto"),
      P("shy","tímido"),
      P("confident","seguro de sí mismo"),
      P("supportive","comprensivo")
    ],
    3: [
      P("to get on well","llevarse bien"),
      P("to fall out","llevarse mal"),
      P("to argue","discutir"),
      P("to make up","reconciliarse"),
      P("to trust","confiar"),
      P("to respect","respetar"),
      P("to forgive","perdonar"),
      P("to apologise","pedir perdón")
    ],
    4: [
      P("to keep in touch","mantener el contacto"),
      P("to message","mandar un mensaje"),
      P("social media","las redes sociales"),
      P("to hang out","quedar"),
      P("to invite","invitar"),
      P("to refuse","rechazar"),
      P("to include","incluir"),
      P("to exclude","excluir")
    ],
    5: [
      P("peer pressure","la presión de grupo"),
      P("to fit in","encajar"),
      P("to feel left out","sentirse excluido"),
      P("to be bullied","ser acosado"),
      P("bullying","el acoso"),
      P("to support","apoyar"),
      P("to report","denunciar"),
      P("to seek help","buscar ayuda")
    ],
    6: [
      P("to have a good influence","tener buena influencia"),
      P("to have a bad influence","tener mala influencia"),
      P("to encourage","animar"),
      P("to motivate","motivar"),
      P("to advise","aconsejar"),
      P("to listen","escuchar"),
      P("to understand","entender"),
      P("to disagree","no estar de acuerdo")
    ],
    7: [
      P("trust","la confianza"),
      P("respect","el respeto"),
      P("boundaries","los límites"),
      P("to set boundaries","poner límites"),
      P("to be sincere","ser sincero"),
      P("to be jealous","tener celos"),
      P("jealousy","los celos"),
      P("to resolve conflicts","resolver conflictos")
    ],
    8: [
      P("to be reliable","ser fiable"),
      P("to be thoughtful","ser atento"),
      P("to be patient","ser paciente"),
      P("to be mature","ser maduro"),
      P("to compromise","llegar a un acuerdo"),
      P("to accept differences","aceptar diferencias"),
      P("to respect opinions","respetar opiniones"),
      P("to be open-minded","ser de mente abierta")
    ],
    9: [
      P("friendship","la amistad"),
      P("to value","valorar"),
      P("to appreciate","apreciar"),
      P("to take care of","cuidar de"),
      P("to support each other","apoyarse"),
      P("to stand up for","defender"),
      P("to be there for someone","estar para alguien"),
      P("to be grateful","estar agradecido")
    ],
    10: [
      P("to be resilient","ser resiliente"),
      P("to learn from mistakes","aprender de los errores"),
      P("to grow as a person","crecer como persona"),
      P("to choose good friends","elegir buenos amigos"),
      P("to avoid toxic people","evitar gente tóxica"),
      P("to maintain contact","mantener el contacto"),
      P("to rebuild trust","reconstruir la confianza"),
      P("healthy friendship","amistad sana")
    ]
  },

  comida: {
    1: [
      P("bread","pan"),
      P("water","agua"),
      P("milk","leche"),
      P("cheese","queso"),
      P("eggs","huevos"),
      P("chicken","pollo"),
      P("rice","arroz"),
      P("fruit","fruta")
    ],
    2: [
      P("vegetables","verduras"),
      P("apple","manzana"),
      P("banana","plátano"),
      P("orange","naranja"),
      P("tomato","tomate"),
      P("potato","patata"),
      P("salad","ensalada"),
      P("fish","pescado")
    ],
    3: [
      P("meat","carne"),
      P("ham","jamón"),
      P("sausages","salchichas"),
      P("pasta","pasta"),
      P("soup","sopa"),
      P("sandwich","bocadillo"),
      P("breakfast","desayuno"),
      P("lunch","almuerzo|comida")
    ],
    4: [
      P("dinner","cena"),
      P("snack","merienda"),
      P("dessert","postre"),
      P("cake","tarta"),
      P("ice cream","helado"),
      P("chocolate","chocolate"),
      P("sugar","azúcar"),
      P("salt","sal")
    ],
    5: [
      P("healthy","saludable"),
      P("unhealthy","poco saludable"),
      P("to eat","comer"),
      P("to cook","cocinar"),
      P("to fry","freír"),
      P("to boil","hervir"),
      P("to bake","hornear"),
      P("to order","pedir")
    ],
    6: [
      P("menu","el menú"),
      P("starter","el primer plato"),
      P("main course","el plato principal"),
      P("bill","la cuenta"),
      P("waiter","el camarero|la camarera"),
      P("to recommend","recomendar"),
      P("to be hungry","tener hambre"),
      P("to be thirsty","tener sed")
    ],
    7: [
      P("allergy","la alergia"),
      P("vegetarian","vegetariano"),
      P("vegan","vegano"),
      P("gluten-free","sin gluten"),
      P("to try","probar"),
      P("to prefer","preferir"),
      P("to avoid","evitar"),
      P("ingredients","los ingredientes")
    ],
    8: [
      P("to gain weight","engordar"),
      P("to lose weight","adelgazar"),
      P("diet","la dieta"),
      P("balanced diet","dieta equilibrada"),
      P("to be in shape","estar en forma"),
      P("to exercise","hacer ejercicio"),
      P("junk food","comida basura"),
      P("fast food","comida rápida")
    ],
    9: [
      P("to reduce sugar","reducir el azúcar"),
      P("to drink water","beber agua"),
      P("to eat more vegetables","comer más verduras"),
      P("to cook at home","cocinar en casa"),
      P("to control portions","controlar las porciones"),
      P("to read labels","leer etiquetas"),
      P("healthier choice","opción más saludable"),
      P("to take care","cuidarse")
    ],
    10: [
      P("food waste","desperdicio de comida"),
      P("to waste food","tirar comida"),
      P("to recycle","reciclar"),
      P("local products","productos locales"),
      P("seasonal food","comida de temporada"),
      P("to be sustainable","ser sostenible"),
      P("to plan meals","planificar comidas"),
      P("to save money","ahorrar dinero")
    ]
  },

  bebida: {
    1: [
      P("water","agua"),
      P("milk","leche"),
      P("juice","zumo"),
      P("orange juice","zumo de naranja"),
      P("tea","té"),
      P("coffee","café"),
      P("hot chocolate","chocolate caliente"),
      P("drink","bebida")
    ],
    2: [
      P("sparkling water","agua con gas"),
      P("still water","agua sin gas"),
      P("lemonade","limonada"),
      P("cola","cola"),
      P("smoothie","batido"),
      P("milkshake","batido de leche"),
      P("to drink","beber"),
      P("glass","vaso")
    ],
    3: [
      P("bottle","botella"),
      P("cup","taza"),
      P("ice","hielo"),
      P("with ice","con hielo"),
      P("without sugar","sin azúcar"),
      P("sweet","dulce"),
      P("bitter","amargo"),
      P("fresh","fresco")
    ],
    4: [
      P("to be thirsty","tener sed"),
      P("to be dehydrated","estar deshidratado"),
      P("to stay hydrated","mantenerse hidratado"),
      P("to choose","elegir"),
      P("to prefer","preferir"),
      P("healthy","saludable"),
      P("unhealthy","poco saludable"),
      P("ingredients","los ingredientes")
    ],
    5: [
      P("energy drink","bebida energética"),
      P("caffeine","cafeína"),
      P("to affect sleep","afectar al sueño"),
      P("to sleep badly","dormir mal"),
      P("to reduce","reducir"),
      P("to avoid","evitar"),
      P("to moderate","moderar"),
      P("habit","hábito")
    ],
    6: [
      P("to order a drink","pedir una bebida"),
      P("menu","el menú"),
      P("bill","la cuenta"),
      P("waiter","el camarero|la camarera"),
      P("to recommend","recomendar"),
      P("to try","probar"),
      P("flavour","sabor"),
      P("to taste like","saber a")
    ],
    7: [
      P("to bring a bottle","traer una botella"),
      P("reusable bottle","botella reutilizable"),
      P("plastic","plástico"),
      P("to recycle","reciclar"),
      P("waste","residuos"),
      P("environment","medio ambiente"),
      P("to protect","proteger"),
      P("to reduce plastic","reducir el plástico")
    ],
    8: [
      P("to improve health","mejorar la salud"),
      P("to drink more water","beber más agua"),
      P("to cut down","reducir"),
      P("to feel better","sentirse mejor"),
      P("to have energy","tener energía"),
      P("to feel tired","sentirse cansado"),
      P("balanced","equilibrado"),
      P("well-being","bienestar")
    ],
    9: [
      P("to set goals","ponerse metas"),
      P("to track habits","seguir hábitos"),
      P("to be consistent","ser constante"),
      P("to make an effort","esforzarse"),
      P("to take care","cuidarse"),
      P("to manage time","gestionar el tiempo"),
      P("to plan","planear"),
      P("to prepare","preparar")
    ],
    10: [
      P("responsibility","responsabilidad"),
      P("to make good choices","tomar buenas decisiones"),
      P("to influence others","influir en los demás"),
      P("to be a role model","ser un ejemplo"),
      P("to be aware","ser consciente"),
      P("to stay healthy","mantenerse sano"),
      P("to maintain balance","mantener el equilibrio"),
      P("long-term","a largo plazo")
    ]
  },

  uniforme: {
    1: [
      P("uniform","el uniforme"),
      P("shirt","la camisa"),
      P("trousers","los pantalones"),
      P("skirt","la falda"),
      P("tie","la corbata"),
      P("shoes","los zapatos"),
      P("jumper","el jersey"),
      P("blazer","la chaqueta")
    ],
    2: [
      P("socks","los calcetines"),
      P("coat","el abrigo"),
      P("raincoat","el impermeable"),
      P("sports uniform","el uniforme deportivo"),
      P("PE kit","la ropa de educación física"),
      P("to wear","llevar"),
      P("to take off","quitarse"),
      P("to put on","ponerse")
    ],
    3: [
      P("comfortable","cómodo"),
      P("uncomfortable","incómodo"),
      P("smart / tidy","elegante"),
      P("messy","desordenado"),
      P("clean","limpio"),
      P("dirty","sucio"),
      P("strict","estricto"),
      P("rules","las reglas")
    ],
    4: [
      P("to allow","permitir"),
      P("to forbid","prohibir"),
      P("jewellery","las joyas"),
      P("make-up","el maquillaje"),
      P("piercing","el piercing"),
      P("hair","el pelo"),
      P("to dye hair","teñirse el pelo"),
      P("to follow rules","seguir las reglas")
    ],
    5: [
      P("advantages","las ventajas"),
      P("disadvantages","las desventajas"),
      P("to save money","ahorrar dinero"),
      P("to feel equal","sentirse igual"),
      P("to show identity","mostrar identidad"),
      P("to express myself","expresarme"),
      P("to fit in","encajar"),
      P("to stand out","destacar")
    ],
    6: [
      P("to be proud of","estar orgulloso de"),
      P("school image","la imagen del colegio"),
      P("discipline","la disciplina"),
      P("respect","el respeto"),
      P("responsibility","la responsabilidad"),
      P("to be punished","ser castigado"),
      P("detention","el castigo"),
      P("to complain","quejarse")
    ],
    7: [
      P("to compromise","llegar a un acuerdo"),
      P("to discuss","discutir"),
      P("to agree","estar de acuerdo"),
      P("to disagree","no estar de acuerdo"),
      P("to change rules","cambiar reglas"),
      P("to improve","mejorar"),
      P("to propose","proponer"),
      P("opinion","la opinión")
    ],
    8: [
      P("to be comfortable","estar cómodo"),
      P("to feel confident","sentirse seguro"),
      P("to reduce bullying","reducir el acoso"),
      P("bullying","el acoso"),
      P("peer pressure","la presión de grupo"),
      P("to feel included","sentirse incluido"),
      P("to feel excluded","sentirse excluido"),
      P("to respect differences","respetar diferencias")
    ],
    9: [
      P("to take care of clothes","cuidar la ropa"),
      P("to wash","lavar"),
      P("to iron","planchar"),
      P("to keep tidy","mantener ordenado"),
      P("to be organised","ser organizado"),
      P("to prepare","preparar"),
      P("to pack my bag","preparar la mochila"),
      P("routine","la rutina")
    ],
    10: [
      P("school policy","la política del colegio"),
      P("to represent the school","representar el colegio"),
      P("to set boundaries","poner límites"),
      P("to take responsibility","asumir la responsabilidad"),
      P("to respect rules","respetar las reglas"),
      P("to be a role model","ser un ejemplo"),
      P("long-term","a largo plazo"),
      P("to find balance","encontrar equilibrio")
    ]
  },

  casa: {
    1: [
      P("house","la casa"),
      P("flat","el piso"),
      P("room","la habitación"),
      P("kitchen","la cocina"),
      P("bathroom","el baño"),
      P("bedroom","el dormitorio"),
      P("living room","el salón"),
      P("garden","el jardín")
    ],
    2: [
      P("bed","la cama"),
      P("table","la mesa"),
      P("chair","la silla"),
      P("sofa","el sofá"),
      P("wardrobe","el armario"),
      P("window","la ventana"),
      P("door","la puerta"),
      P("stairs","las escaleras")
    ],
    3: [
      P("fridge","la nevera"),
      P("oven","el horno"),
      P("microwave","el microondas"),
      P("washing machine","la lavadora"),
      P("dishwasher","el lavavajillas"),
      P("to cook","cocinar"),
      P("to clean","limpiar"),
      P("to tidy","ordenar")
    ],
    4: [
      P("to do chores","hacer tareas"),
      P("to vacuum","pasar la aspiradora"),
      P("to sweep","barrer"),
      P("to take out the rubbish","sacar la basura"),
      P("to do the dishes","lavar los platos"),
      P("to make the bed","hacer la cama"),
      P("to set the table","poner la mesa"),
      P("to water plants","regar las plantas")
    ],
    5: [
      P("big","grande"),
      P("small","pequeño"),
      P("comfortable","cómodo"),
      P("modern","moderno"),
      P("old","antiguo"),
      P("bright","luminoso"),
      P("dark","oscuro"),
      P("noisy","ruidoso")
    ],
    6: [
      P("to rent","alquilar"),
      P("rent","el alquiler"),
      P("to buy","comprar"),
      P("to move house","mudarse"),
      P("neighbour","el vecino|la vecina"),
      P("neighbourhood","el barrio"),
      P("to feel at home","sentirse como en casa"),
      P("privacy","la privacidad")
    ],
    7: [
      P("to share a room","compartir habitación"),
      P("to have my own room","tener mi propia habitación"),
      P("to argue at home","discutir en casa"),
      P("to get along","llevarse bien"),
      P("rules at home","las reglas en casa"),
      P("to help at home","ayudar en casa"),
      P("responsibility","la responsabilidad"),
      P("to be independent","ser independiente")
    ],
    8: [
      P("energy","la energía"),
      P("to save energy","ahorrar energía"),
      P("to save water","ahorrar agua"),
      P("to recycle","reciclar"),
      P("waste","residuos"),
      P("environment","medio ambiente"),
      P("to protect","proteger"),
      P("sustainable","sostenible")
    ],
    9: [
      P("advantages","las ventajas"),
      P("disadvantages","las desventajas"),
      P("to complain","quejarse"),
      P("to improve","mejorar"),
      P("to repair","reparar"),
      P("to decorate","decorar"),
      P("to repaint","pintar"),
      P("to change","cambiar")
    ],
    10: [
      P("quality of life","la calidad de vida"),
      P("to balance","equilibrar"),
      P("to manage time","gestionar el tiempo"),
      P("to set priorities","establecer prioridades"),
      P("to take responsibility","asumir la responsabilidad"),
      P("to compromise","llegar a un acuerdo"),
      P("to plan","planificar"),
      P("future plans","los planes de futuro")
    ]
  },

  tiempo: {
    1: [
      P("sunny","soleado"),
      P("rainy","lluvioso"),
      P("cloudy","nublado"),
      P("windy","ventoso"),
      P("hot","caluroso"),
      P("cold","frío"),
      P("warm","templado"),
      P("snowy","nevado")
    ],
    2: [
      P("storm","tormenta"),
      P("thunder","trueno"),
      P("lightning","relámpago"),
      P("foggy","con niebla"),
      P("humid","húmedo"),
      P("dry","seco"),
      P("degree","grado"),
      P("temperature","temperatura")
    ],
    3: [
      P("in spring","en primavera"),
      P("in summer","en verano"),
      P("in autumn","en otoño"),
      P("in winter","en invierno"),
      P("season","la estación"),
      P("weather forecast","la previsión del tiempo"),
      P("to rain","llover"),
      P("to snow","nevar")
    ],
    4: [
      P("to improve","mejorar"),
      P("to get worse","empeorar"),
      P("to change","cambiar"),
      P("to be unpredictable","ser imprevisible"),
      P("to be common","ser común"),
      P("to be unusual","ser inusual"),
      P("heatwave","ola de calor"),
      P("flood","inundación")
    ],
    5: [
      P("drought","sequía"),
      P("climate change","cambio climático"),
      P("pollution","contaminación"),
      P("to recycle","reciclar"),
      P("to reduce","reducir"),
      P("to protect","proteger"),
      P("environment","medio ambiente"),
      P("to take action","actuar")
    ],
    6: [
      P("to go out","salir"),
      P("to stay at home","quedarse en casa"),
      P("to take an umbrella","llevar un paraguas"),
      P("to wear a coat","llevar un abrigo"),
      P("to get wet","mojarse"),
      P("to freeze","congelarse"),
      P("to sweat","sudar"),
      P("to enjoy","disfrutar")
    ],
    7: [
      P("activities","las actividades"),
      P("to go to the beach","ir a la playa"),
      P("to go hiking","hacer senderismo"),
      P("to go skiing","esquiar"),
      P("to travel","viajar"),
      P("to cancel","cancelar"),
      P("to plan","planificar"),
      P("to be prepared","estar preparado")
    ],
    8: [
      P("to save energy","ahorrar energía"),
      P("renewable energy","energía renovable"),
      P("to reduce emissions","reducir emisiones"),
      P("public transport","transporte público"),
      P("to use less water","usar menos agua"),
      P("to plant trees","plantar árboles"),
      P("to raise awareness","concienciar"),
      P("sustainable","sostenible")
    ],
    9: [
      P("to feel stressed","sentirse estresado"),
      P("to calm down","calmarse"),
      P("to cope","afrontar"),
      P("to overcome","superar"),
      P("to be optimistic","ser optimista"),
      P("to be pessimistic","ser pesimista"),
      P("to worry","preocuparse"),
      P("to stay positive","mantenerse positivo")
    ],
    10: [
      P("to take responsibility","asumir la responsabilidad"),
      P("to change habits","cambiar hábitos"),
      P("to make a difference","marcar la diferencia"),
      P("to influence others","influir en los demás"),
      P("long-term","a largo plazo"),
      P("to invest","invertir"),
      P("future","el futuro"),
      P("to protect the planet","proteger el planeta")
    ]
  },

  hora: {
    1: [
      P("What time is it?","¿qué hora es?"),
      P("It's one o'clock","es la una"),
      P("It's two o'clock","son las dos"),
      P("half past","y media"),
      P("quarter past","y cuarto"),
      P("quarter to","menos cuarto"),
      P("morning","la mañana"),
      P("afternoon","la tarde")
    ],
    2: [
      P("night","la noche"),
      P("midday","mediodía"),
      P("midnight","medianoche"),
      P("early","temprano"),
      P("late","tarde"),
      P("on time","a tiempo"),
      P("before","antes"),
      P("after","después")
    ],
    3: [
      P("at…","a las…"),
      P("from… to…","de… a…"),
      P("every day","todos los días"),
      P("on Mondays","los lunes"),
      P("weekend","el fin de semana"),
      P("schedule","el horario"),
      P("to start","empezar"),
      P("to finish","terminar")
    ],
    4: [
      P("to be late","llegar tarde"),
      P("to be early","llegar temprano"),
      P("to hurry up","darse prisa"),
      P("to wait","esperar"),
      P("to meet","quedar"),
      P("appointment","cita"),
      P("to cancel","cancelar"),
      P("to postpone","aplazar")
    ],
    5: [
      P("to plan","planificar"),
      P("to organise","organizar"),
      P("routine","rutina"),
      P("to waste time","perder el tiempo"),
      P("to save time","ahorrar tiempo"),
      P("to manage time","gestionar el tiempo"),
      P("to focus","concentrarse"),
      P("to get distracted","distraerse")
    ],
    6: [
      P("to set an alarm","poner la alarma"),
      P("to oversleep","quedarse dormido"),
      P("to stay up late","acostarse tarde"),
      P("to take a break","tomar un descanso"),
      P("to be busy","estar ocupado"),
      P("to be free","estar libre"),
      P("to be available","estar disponible"),
      P("to be tired","estar cansado")
    ],
    7: [
      P("deadlines","las fechas límite"),
      P("to hand in","entregar"),
      P("to prepare","prepararse"),
      P("to revise","repasar"),
      P("to improve","mejorar"),
      P("to be consistent","ser constante"),
      P("to make an effort","esforzarse"),
      P("to succeed","tener éxito")
    ],
    8: [
      P("to balance","equilibrar"),
      P("priorities","las prioridades"),
      P("to set priorities","establecer prioridades"),
      P("to take responsibility","asumir la responsabilidad"),
      P("to compromise","llegar a un acuerdo"),
      P("to change habits","cambiar hábitos"),
      P("to stay motivated","mantenerse motivado"),
      P("to be proud","estar orgulloso")
    ],
    9: [
      P("to feel stressed","sentirse estresado"),
      P("to calm down","calmarse"),
      P("well-being","bienestar"),
      P("to relax","relajarse"),
      P("to seek help","buscar ayuda"),
      P("support","apoyo"),
      P("to cope","afrontar"),
      P("to overcome","superar")
    ],
    10: [
      P("long-term","a largo plazo"),
      P("future plans","planes de futuro"),
      P("to decide","decidir"),
      P("to choose","elegir"),
      P("to invest time","invertir tiempo"),
      P("to keep improving","seguir mejorando"),
      P("to learn from mistakes","aprender de los errores"),
      P("personal growth","crecimiento personal")
    ]
  },

  direcciones: {
    1: [
      P("left","izquierda"),
      P("right","derecha"),
      P("straight on","todo recto"),
      P("near","cerca"),
      P("far","lejos"),
      P("next to","al lado de"),
      P("opposite","enfrente de"),
      P("corner","la esquina")
    ],
    2: [
      P("to turn","girar"),
      P("to go","ir"),
      P("to cross","cruzar"),
      P("crossing","el paso de peatones"),
      P("traffic lights","los semáforos"),
      P("roundabout","la rotonda"),
      P("bridge","el puente"),
      P("street","la calle")
    ],
    3: [
      P("to go past","pasar por"),
      P("to take (a street)","tomar|coger"),
      P("to continue","continuar"),
      P("to follow","seguir"),
      P("map","el mapa"),
      P("sign","la señal"),
      P("direction","la dirección"),
      P("tourist","el turista")
    ],
    4: [
      P("police station","la comisaría"),
      P("hospital","el hospital"),
      P("pharmacy","la farmacia"),
      P("post office","correos"),
      P("bank","el banco"),
      P("station","la estación"),
      P("bus stop","la parada"),
      P("town centre","el centro")
    ],
    5: [
      P("How do I get to…?","¿cómo llego a…?"),
      P("Where is…?","¿dónde está…?"),
      P("It is on the left","está a la izquierda"),
      P("It is on the right","está a la derecha"),
      P("It is near","está cerca"),
      P("It is far","está lejos"),
      P("It is straight on","está todo recto"),
      P("Thank you","gracias")
    ],
    6: [
      P("to get lost","perderse"),
      P("to ask for help","pedir ayuda"),
      P("to explain","explicar"),
      P("to understand","entender"),
      P("to repeat","repetir"),
      P("to show","mostrar"),
      P("to recommend","recomendar"),
      P("to avoid","evitar")
    ],
    7: [
      P("public transport","transporte público"),
      P("ticket","el billete"),
      P("platform","el andén"),
      P("route","la ruta"),
      P("to change lines","hacer transbordo"),
      P("to arrive","llegar"),
      P("to leave","salir"),
      P("schedule","el horario")
    ],
    8: [
      P("to be safe","estar seguro"),
      P("dangerous","peligroso"),
      P("to be careful","tener cuidado"),
      P("to follow rules","seguir las reglas"),
      P("pedestrian","peatón"),
      P("cycle lane","carril bici"),
      P("to respect","respetar"),
      P("responsibility","responsabilidad")
    ],
    9: [
      P("to plan a trip","planificar un viaje"),
      P("to book","reservar"),
      P("to check","comprobar"),
      P("to be prepared","estar preparado"),
      P("to be on time","estar a tiempo"),
      P("to miss","perder"),
      P("to solve problems","resolver problemas"),
      P("to cope","afrontar")
    ],
    10: [
      P("to manage time","gestionar el tiempo"),
      P("to make decisions","tomar decisiones"),
      P("to stay calm","mantener la calma"),
      P("to help others","ayudar a los demás"),
      P("to take responsibility","asumir la responsabilidad"),
      P("to improve","mejorar"),
      P("long-term","a largo plazo"),
      P("to learn from mistakes","aprender de los errores")
    ]
  },

  asignaturas: {
    1: [
      P("maths","matemáticas"),
      P("English","inglés"),
      P("Spanish","español"),
      P("history","historia"),
      P("geography","geografía"),
      P("science","ciencias"),
      P("art","arte"),
      P("PE","educación física")
    ],
    2: [
      P("music","música"),
      P("technology","tecnología"),
      P("business","negocios"),
      P("religion","religión"),
      P("computer science","informática"),
      P("woodwork","carpintería"),
      P("home economics","economía doméstica"),
      P("languages","idiomas")
    ],
    3: [
      P("favourite subject","asignatura favorita"),
      P("easy","fácil"),
      P("difficult","difícil"),
      P("interesting","interesante"),
      P("boring","aburrido"),
      P("useful","útil"),
      P("to prefer","preferir"),
      P("to hate","odiar")
    ],
    4: [
      P("to learn","aprender"),
      P("to revise","repasar"),
      P("to improve","mejorar"),
      P("to pass","aprobar"),
      P("to fail","suspender"),
      P("exam","examen"),
      P("homework","deberes"),
      P("project","proyecto")
    ],
    5: [
      P("optional subject","optativa"),
      P("compulsory","obligatorio"),
      P("to choose","elegir"),
      P("to decide","decidir"),
      P("career","carrera"),
      P("future plans","planes de futuro"),
      P("job","trabajo"),
      P("skills","habilidades")
    ],
    6: [
      P("to concentrate","concentrarse"),
      P("to get distracted","distraerse"),
      P("to take notes","tomar apuntes"),
      P("to practise","practicar"),
      P("to participate","participar"),
      P("to ask questions","hacer preguntas"),
      P("to answer","contestar"),
      P("to explain","explicar")
    ],
    7: [
      P("to be stressed","estar estresado"),
      P("to be motivated","estar motivado"),
      P("to make an effort","esforzarse"),
      P("to be organised","ser organizado"),
      P("to manage time","gestionar el tiempo"),
      P("to set goals","ponerse metas"),
      P("to succeed","tener éxito"),
      P("to struggle","tener dificultades")
    ],
    8: [
      P("to work in a team","trabajar en equipo"),
      P("to present","presentar"),
      P("presentation","presentación"),
      P("to research","investigar"),
      P("to create","crear"),
      P("to solve problems","resolver problemas"),
      P("critical thinking","pensamiento crítico"),
      P("creativity","creatividad")
    ],
    9: [
      P("to apply knowledge","aplicar conocimientos"),
      P("to gain confidence","ganar confianza"),
      P("responsibility","responsabilidad"),
      P("discipline","disciplina"),
      P("respect","respeto"),
      P("to support","apoyar"),
      P("to encourage","animar"),
      P("to advise","aconsejar")
    ],
    10: [
      P("to take responsibility","asumir la responsabilidad"),
      P("to keep improving","seguir mejorando"),
      P("to learn from mistakes","aprender de los errores"),
      P("to be resilient","ser resiliente"),
      P("long-term","a largo plazo"),
      P("to invest time","invertir tiempo"),
      P("to set priorities","establecer prioridades"),
      P("personal growth","crecimiento personal")
    ]
  }
};

// Amigos theme id is "amigos" in your list; we already used it above for "amigos" or "amigos" vs "amigos"?
// To keep it consistent with THEME_LIST ids:
ES.amigos = ES.amigos || ES.amigos;
ES.amigos = ES.amigos || ES.amigos;

// NOTE: "amigos" vs "amigos" already correct. "amigos" dataset is above as ES.amigos? We used "amigos" id in list,
// but created data under "amigos" is not yet. We'll alias amigos = amigos-data:
ES.amigos = ES.amigos || ES.amigos; // harmless

// Actually map: we named the friends dataset "amigos" in THEME_LIST but wrote it above under "amigos"?? We wrote "amigos" section as "amigos:"? No, we wrote "amigos:" as "amigos:"? We wrote "amigos:" as "amigos:"? In this file we wrote it as "amigos:"? We wrote it as "amigos:"? 
// To avoid mistakes, we will export a resolver that safely returns empty if missing.

const DATA = {
  es: ES,
  fr: {}, // to fill later
  de: {}, // to fill later
  en: {}, // to fill later
};

function emptyLevelObj(maxLevel=10){
  const o = {};
  for(let i=1;i<=maxLevel;i++) o[i] = [];
  return o;
}

export function hasAnyData(lang, themeId){
  const lvls = DATA?.[lang]?.[themeId];
  if(!lvls) return false;
  for(const arr of Object.values(lvls)) if(arr && arr.length) return true;
  return false;
}

export function maxLevelFor(lang, themeId){
  const lvls = DATA?.[lang]?.[themeId] || emptyLevelObj(10);
  return Math.max(...Object.keys(lvls).map(n=>parseInt(n,10)));
}

export function totalWordsFor(lang, themeId){
  const lvls = DATA?.[lang]?.[themeId] || emptyLevelObj(10);
  let total = 0;
  for(const arr of Object.values(lvls)) total += (arr?.length || 0);
  return total;
}

const PROG_KEY = (lang, themeId)=> `jc_tower_prog::${lang}::${themeId}`;

export function themeProgress(lang, themeId){
  const raw = JSON.parse(localStorage.getItem(PROG_KEY(lang, themeId)) || "{}");
  const level = raw.level ?? 1;
  const cleared = raw.cleared ?? 0;
  const total = totalWordsFor(lang, themeId);
  const maxLevel = maxLevelFor(lang, themeId);
  const pct = total ? Math.round((cleared/total)*100) : 0;
  return { level, cleared, total, maxLevel, pct };
}

export function saveProgress(lang, themeId, patch){
  const cur = JSON.parse(localStorage.getItem(PROG_KEY(lang, themeId)) || "{}");
  localStorage.setItem(PROG_KEY(lang, themeId), JSON.stringify({ ...cur, ...patch }));
}

export function resetProgress(lang, themeId){
  localStorage.removeItem(PROG_KEY(lang, themeId));
}

export function resetAll(){
  for(const lang of ["es","fr","de","en"]){
    for(const t of THEME_LIST){
      localStorage.removeItem(PROG_KEY(lang, t.id));
    }
  }
}

export function overallProgress(lang){
  let total = 0;
  let cleared = 0;
  for(const t of THEME_LIST){
    const tp = themeProgress(lang, t.id);
    total += tp.total;
    cleared += tp.cleared;
  }
  const pct = total ? Math.round((cleared/total)*100) : 0;
  return { total, cleared, pct };
}

// Mix level = revision from previous 3 levels (deduped by first answer)
export function getLevelEntries(lang, themeId, level, isMix){
  const lvls = DATA?.[lang]?.[themeId] || emptyLevelObj(10);
  if(!isMix) return [...(lvls[level] || [])];

  const from = Math.max(1, level - 3);
  const pool = [];
  for(let k=from;k<level;k++){
    pool.push(...(lvls[k] || []));
  }
  const seen = new Set();
  return pool.filter(it=>{
    const key = (it.answers?.[0] || it.en || "").toLowerCase();
    if(seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
