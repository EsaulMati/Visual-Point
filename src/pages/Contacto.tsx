import React, { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import {
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Search,
  Send,
  Building2,
  User,
  AtSign,
  Phone as PhoneIcon,
} from "lucide-react";

const COUNTRY_DATA = [
  // América
  { code: "+51", name: "Perú", flag: "🇵🇪", len: 9, start: "9" },
  { code: "+1", name: "USA/Canadá", flag: "🇺🇸", len: 10 },
  { code: "+52", name: "México", flag: "🇲🇽", len: 10, start: ["5", "3"] },
  { code: "+57", name: "Colombia", flag: "🇨🇴", len: 10, start: "3" },
  { code: "+54", name: "Argentina", flag: "🇦🇷", len: 10, start: "9" },
  { code: "+56", name: "Chile", flag: "🇨🇱", len: 9, start: "9" },
  { code: "+593", name: "Ecuador", flag: "🇪🇨", len: 9, start: "9" },
  { code: "+591", name: "Bolivia", flag: "🇧🇴", len: 8, start: ["6", "7"] },
  { code: "+595", name: "Paraguay", flag: "🇵🇾", len: 9, start: "9" },
  { code: "+598", name: "Uruguay", flag: "🇺🇾", len: 8, start: "9" },
  { code: "+58", name: "Venezuela", flag: "🇻🇪", len: 10, start: "4" },
  { code: "+507", name: "Panamá", flag: "🇵🇦", len: 8, start: "6" },
  {
    code: "+506",
    name: "Costa Rica",
    flag: "🇨🇷",
    len: 8,
    start: ["6", "7", "8"],
  },
  {
    code: "+502",
    name: "Guatemala",
    flag: "🇬🇹",
    len: 8,
    start: ["3", "4", "5"],
  },
  { code: "+55", name: "Brasil", flag: "🇧🇷", len: 11, start: "9" },
  { code: "+503", name: "El Salvador", flag: "🇸🇻", len: 8, start: ["6", "7"] },
  {
    code: "+504",
    name: "Honduras",
    flag: "🇭🇳",
    len: 8,
    start: ["3", "7", "8", "9"],
  },
  {
    code: "+505",
    name: "Nicaragua",
    flag: "🇳🇮",
    len: 8,
    start: ["5", "7", "8"],
  },
  { code: "+1-809", name: "Rep. Dominicana", flag: "🇩🇴", len: 10, start: "8" },

  // Europa
  { code: "+34", name: "España", flag: "🇪🇸", len: 9, start: ["6", "7"] },
  { code: "+33", name: "Francia", flag: "🇫🇷", len: 9, start: ["6", "7"] },
  { code: "+39", name: "Italia", flag: "🇮🇹", len: 10, start: "3" },
  { code: "+44", name: "Reino Unido", flag: "🇬🇧", len: 10, start: "7" },
  { code: "+49", name: "Alemania", flag: "🇩🇪", len: 11, start: "1" },
  { code: "+351", name: "Portugal", flag: "🇵🇹", len: 9, start: "9" },
  { code: "+41", name: "Suiza", flag: "🇨🇭", len: 9, start: "7" },
  { code: "+31", name: "Países Bajos", flag: "🇳🇱", len: 9, start: "6" },
  { code: "+32", name: "Bélgica", flag: "🇧🇪", len: 9, start: "4" },
  { code: "+43", name: "Austria", flag: "🇦🇹", len: 10 },
  { code: "+46", name: "Suecia", flag: "🇸🇪", len: 9, start: "7" },

  // Asia & Oceanía
  { code: "+81", name: "Japón", flag: "🇯🇵", len: 10, start: ["7", "8", "9"] },
  { code: "+86", name: "China", flag: "🇨🇳", len: 11, start: "1" },
  { code: "+82", name: "Corea del Sur", flag: "🇰🇷", len: 10, start: "1" },
  { code: "+61", name: "Australia", flag: "🇦🇺", len: 9, start: "4" },
  { code: "+64", name: "Nueva Zelanda", flag: "🇳🇿", len: 9, start: "2" },
  {
    code: "+91",
    name: "India",
    flag: "🇮🇳",
    len: 10,
    start: ["6", "7", "8", "9"],
  },
  { code: "+65", name: "Singapur", flag: "🇸🇬", len: 8, start: ["8", "9"] },
  { code: "+971", name: "UAE", flag: "🇦🇪", len: 9, start: "5" },
  { code: "+966", name: "Arabia Saudita", flag: "🇸🇦", len: 9, start: "5" },
  {
    code: "+974",
    name: "Qatar",
    flag: "🇶🇦",
    len: 8,
    start: ["3", "5", "6", "7"],
  },
  { code: "+972", name: "Israel", flag: "🇮🇱", len: 9, start: "5" },
  { code: "+7", name: "Rusia", flag: "🇷🇺", len: 10, start: "9" },
  {
    code: "+27",
    name: "Sudáfrica",
    flag: "🇿🇦",
    len: 9,
    start: ["6", "7", "8"],
  },
];

export default function Contacto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    country: COUNTRY_DATA[0], // Selected country object
    telefono: "",
    email: "",
    asunto: "",
    mensaje: "",
    privacy: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = useMemo(() => {
    return COUNTRY_DATA.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.includes(searchTerm),
    );
  }, [searchTerm]);

  const validateField = (name: string, value: any) => {
    let error = "";

    if (name === "nombre" && !value.trim()) error = "El nombre es requerido";
    if (name === "empresa" && !value.trim()) error = "La empresa es requerida";

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) error = "El email es requerido";
      else if (!emailRegex.test(value)) error = "Ingresa un email válido";
    }

    if (name === "telefono") {
      const country = formData.country;
      const cleanValue = value.replace(/\D/g, ""); // Numbers only

      if (!cleanValue) {
        error = "El teléfono es requerido";
      } else if (cleanValue.length !== country.len) {
        error = "Número inválido";
      } else if (country.start) {
        // Starts with logic (string or array)
        const starts = Array.isArray(country.start)
          ? country.start
          : [country.start];
        if (!starts.some((s) => cleanValue.startsWith(s))) {
          error = "Número inválido";
        }
      }
    }

    if (name === "asunto" && !value.trim()) error = "El asunto es obligatorio";
    if (name === "mensaje" && !value.trim()) error = "Describe tu proyecto";
    if (name === "privacy" && !value)
      error = "Acepta la política de privacidad";

    return error;
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, (formData as any)[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target as any;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    // Immediate validation if already touched
    if (touched[name]) {
      const error = validateField(name, val);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched
    const allTouched = Object.keys(formData).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {},
    );
    setTouched(allTouched);

    // Validate all
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((k) => {
      const err = validateField(k, (formData as any)[k]);
      if (err) newErrors[k] = err;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      try {
        // Enviar datos usando fetch a la URL de Google Apps Script
        const url =
          "https://script.google.com/macros/s/AKfycby2OMympdJfWpuMxnhB96z5ros2oa9IWLSYLLuUcFuR9S8yinkUVHJrbk9rj-FtVfH5zQ/exec";

        // Creamos un objeto de formulario estándar
        const postData = new URLSearchParams();
        postData.append("nombre", formData.nombre);
        postData.append("empresa", formData.empresa);
        postData.append("email", formData.email);
        // Agregamos una comilla simple al inicio para que el Excel lo lea como Texto y no como Fórmula matemática (evita el #ERROR! por el símbolo +)
        postData.append(
          "telefono",
          `\'${formData.country.code} ${formData.telefono}`,
        );
        postData.append("asunto", formData.asunto);
        postData.append("mensaje", formData.mensaje);

        await fetch(url, {
          method: "POST",
          mode: "no-cors",
          body: postData,
        });

        setIsSubmitting(false);
        setIsSuccess(true);
        // Reseteo limpio
        setFormData({
          nombre: "",
          empresa: "",
          country: COUNTRY_DATA[0],
          telefono: "",
          email: "",
          asunto: "",
          mensaje: "",
          privacy: false,
        });
        setTouched({});
        setTimeout(() => setIsSuccess(false), 5000);
      } catch (error) {
        setIsSubmitting(false);
        console.error("Error enviando datos:", error);
        alert(
          "Ocurrió un error de conexión al enviar el formulario. Por favor, intenta de nuevo.",
        );
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#FCFCFC] overflow-hidden pb-12 md:pb-20 font-sans"
    >
      {/* HERO SECTION */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 px-6 md:px-20 text-left led-grid">
        <div className="absolute top-0 left-0 right-0 h-[60vh] bg-gradient-to-br from-brand-celeste/10 to-transparent -z-10" />
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="w-10 h-[1px] bg-brand-celeste" />
              <span className="text-brand-celeste font-black text-xs tracking-widest uppercase">
                Visual Point
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-9xl font-display font-black text-brand-dark leading-[0.85] tracking-tighter">
              Diseñemos <br />
              <span className="text-brand-celeste">tu impacto.</span>
            </h1>
          </div>
          <p className="text-xl md:text-3xl text-text-secondary leading-tight max-w-2xl font-light text-justify">
            Lleva tu comunicación visual al siguiente nivel con soporte técnico
            especializado y tecnología de punta.
          </p>
        </div>
      </section>

      {/* FORM MASTER SECTION */}
      <section className="px-6 md:px-20 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-[64px] border border-gray-100 shadow-[0_50px_120px_-30px_rgba(0,40,86,0.12)] p-8 md:p-20 relative">
            <div className="absolute -top-1 px-6 md:px-12 py-3 md:py-4 bg-brand-dark text-white rounded-full text-[9px] md:text-[12px] uppercase font-black tracking-wider md:tracking-widest translate-y-[-50%] ml-0 md:ml-12 shadow-2xl font-accent border-4 border-white">
              Formulario de Contacto • Visual Point
            </div>

            {isSuccess ? (
              <div className="py-24 text-center space-y-8 animate-in fade-in zoom-in duration-700">
                <div className="w-28 h-28 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <CheckCircle2 size={56} className="animate-pulse" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-5xl font-display font-black text-brand-dark tracking-tighter">
                    ¡Mensaje Enviado!
                  </h2>
                  <p className="text-xl text-text-secondary max-w-md mx-auto text-justify">
                    Tu mensaje fue enviado, recibirás un mensaje de nuestro
                    equipo a la brevedad posible.
                  </p>
                </div>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-10 py-5 bg-brand-dark text-white rounded-full text-xs font-black tracking-widest uppercase hover:bg-brand-celeste transition-all shadow-xl"
                >
                  Nuevo Requerimiento
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12"
              >
                {/* COL LEFT: Info Personal */}
                <div className="space-y-12">
                  {/* Field: Nombre */}
                  <div className="space-y-4">
                    <label
                      className={`text-[10px] uppercase font-black tracking-[0.3em] transition-colors font-accent ${errors.nombre && touched.nombre ? "text-red-500" : "text-brand-dark/30"}`}
                    >
                      Nombre del Solicitante
                    </label>
                    <div className="relative group">
                      <div
                        className={`absolute top-0 left-0 w-11 h-full flex items-center justify-center text-brand-dark/20 ${errors.nombre && touched.nombre ? "text-red-400" : "group-focus-within:text-brand-celeste transition-colors"}`}
                      >
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        onBlur={() => handleBlur("nombre")}
                        className={`w-full bg-white border-b-2 py-4 pl-12 pr-4 outline-none transition-all text-brand-dark font-medium ${errors.nombre && touched.nombre ? "border-red-500 bg-red-50 shadow-[0_4px_20px_-10px_rgba(239,68,68,0.3)]" : "border-gray-100 focus:border-brand-celeste"}`}
                        placeholder="Juan Pérez"
                      />
                    </div>
                    {errors.nombre && touched.nombre && (
                      <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
                        <AlertCircle size={12} /> {errors.nombre}
                      </p>
                    )}
                  </div>

                  {/* Field: Empresa */}
                  <div className="space-y-4">
                    <label
                      className={`text-[10px] uppercase font-black tracking-[0.3em] transition-colors font-accent ${errors.empresa && touched.empresa ? "text-red-500" : "text-brand-dark/30"}`}
                    >
                      Organización / Corporativo
                    </label>
                    <div className="relative group">
                      <div
                        className={`absolute top-0 left-0 w-11 h-full flex items-center justify-center text-brand-dark/20 ${errors.empresa && touched.empresa ? "text-red-400" : "group-focus-within:text-brand-celeste transition-colors"}`}
                      >
                        <Building2 size={18} />
                      </div>
                      <input
                        type="text"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        onBlur={() => handleBlur("empresa")}
                        className={`w-full bg-white border-b-2 py-4 pl-12 pr-4 outline-none transition-all text-brand-dark font-medium ${errors.empresa && touched.empresa ? "border-red-500 bg-red-50 shadow-[0_4px_20px_-10px_rgba(239,68,68,0.3)]" : "border-gray-100 focus:border-brand-celeste"}`}
                        placeholder="Digital Media Inc."
                      />
                    </div>
                    {errors.empresa && touched.empresa && (
                      <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
                        <AlertCircle size={12} /> {errors.empresa}
                      </p>
                    )}
                  </div>

                  {/* Field: Email */}
                  <div className="space-y-4">
                    <label
                      className={`text-[10px] uppercase font-black tracking-[0.3em] transition-colors font-accent ${errors.email && touched.email ? "text-red-500" : "text-brand-dark/30"}`}
                    >
                      Correo Corporativo
                    </label>
                    <div className="relative group">
                      <div
                        className={`absolute top-0 left-0 w-11 h-full flex items-center justify-center text-brand-dark/20 ${errors.email && touched.email ? "text-red-400" : "group-focus-within:text-brand-celeste transition-colors"}`}
                      >
                        <AtSign size={18} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur("email")}
                        className={`w-full bg-white border-b-2 py-4 pl-12 pr-4 outline-none transition-all text-brand-dark font-medium ${errors.email && touched.email ? "border-red-500 bg-red-50 shadow-[0_4px_20px_-10px_rgba(239,68,68,0.3)]" : "border-gray-100 focus:border-brand-celeste"}`}
                        placeholder="ingenieri@visualpoint.com"
                      />
                    </div>
                    {errors.email && touched.email && (
                      <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
                        <AlertCircle size={12} /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* COL RIGHT: Technical Details */}
                <div className="space-y-12">
                  {/* Field: Teléfono con Selector Pro */}
                  <div className="space-y-4">
                    <label
                      className={`text-[10px] uppercase font-black tracking-[0.3em] transition-colors font-accent ${errors.telefono && touched.telefono ? "text-red-500" : "text-brand-dark/30"}`}
                    >
                      Teléfono de Contacto (Regional)
                    </label>
                    <div
                      className={`flex gap-3 border-b-2 transition-all p-1 items-center relative ${errors.telefono && touched.telefono ? "border-red-500 bg-red-50 shadow-[0_4px_20px_-10px_rgba(239,68,68,0.3)]" : "border-gray-100 group focus-within:border-brand-celeste"}`}
                    >
                      {/* CUSTOM SELECT DROPDOWN */}
                      <div className="relative shrink-0" ref={dropdownRef}>
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors border border-gray-100"
                        >
                          <span className="text-xl">
                            {formData.country.flag}
                          </span>
                          <span className="font-bold text-brand-dark text-sm">
                            {formData.country.code}
                          </span>
                          <ChevronDown
                            size={14}
                            className={`text-brand-dark/30 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        {isDropdownOpen && (
                          <div className="absolute top-14 left-0 w-64 bg-white border border-gray-100 rounded-3xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="p-4 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
                              <Search
                                size={14}
                                className="text-brand-dark/30"
                              />
                              <input
                                type="text"
                                placeholder="Buscar país o código..."
                                className="bg-transparent border-none outline-none text-xs w-full py-1 font-bold text-brand-dark"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                              />
                            </div>
                            <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
                              {filteredCountries.length > 0 ? (
                                filteredCountries.map((c) => (
                                  <button
                                    key={c.code}
                                    type="button"
                                    onClick={() => {
                                      setFormData((prev) => ({
                                        ...prev,
                                        country: c,
                                      }));
                                      setIsDropdownOpen(false);
                                      setSearchTerm("");
                                    }}
                                    className="flex items-center justify-between w-full p-4 hover:bg-brand-celeste/5 text-left border-b border-gray-50 last:border-0 transition-colors"
                                  >
                                    <div className="flex items-center gap-4">
                                      <span className="text-2xl">{c.flag}</span>
                                      <div className="flex flex-col">
                                        <span className="text-xs font-black text-brand-dark leading-none">
                                          {c.name}
                                        </span>
                                        <span className="text-[10px] text-brand-dark/40 uppercase font-bold tracking-widest">
                                          {c.code}
                                        </span>
                                      </div>
                                    </div>
                                    {formData.country.code === c.code && (
                                      <CheckCircle2
                                        size={14}
                                        className="text-brand-celeste"
                                      />
                                    )}
                                  </button>
                                ))
                              ) : (
                                <div className="p-8 text-center text-[10px] uppercase font-black text-brand-dark/20 tracking-widest">
                                  No se encontraron países
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Phone Input: Integers only restricted by validateField logic */}
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={(e) => {
                          const clean = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, formData.country.len);
                          setFormData((prev) => ({ ...prev, telefono: clean }));
                          if (touched.telefono) {
                            const err = validateField("telefono", clean);
                            setErrors((prev) => ({ ...prev, telefono: err }));
                          }
                        }}
                        onBlur={() => handleBlur("telefono")}
                        className="w-full bg-transparent py-4 text-brand-dark font-black tracking-[0.2em] outline-none placeholder:tracking-normal placeholder:font-medium placeholder:text-brand-dark/20"
                        placeholder={`Poner los ${formData.country.len} números...`}
                      />

                      <div className="pr-4 text-brand-dark/20 shrink-0">
                        <PhoneIcon size={20} strokeWidth={1.5} />
                      </div>
                    </div>
                    {errors.telefono && touched.telefono && (
                      <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2 px-2">
                        <AlertCircle size={12} /> {errors.telefono}
                      </p>
                    )}
                  </div>

                  {/* Field: Asunto */}
                  <div className="space-y-4">
                    <label
                      className={`text-[10px] uppercase font-black tracking-[0.3em] transition-colors font-accent ${errors.asunto && touched.asunto ? "text-red-500" : "text-brand-dark/30"}`}
                    >
                      Asunto del Requerimiento
                    </label>
                    <input
                      type="text"
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      onBlur={() => handleBlur("asunto")}
                      className={`w-full bg-white border-b-2 py-4 pr-4 outline-none transition-all text-brand-dark font-medium ${errors.asunto && touched.asunto ? "border-red-500 bg-red-50 shadow-[0_4px_20px_-10px_rgba(239,68,68,0.3)]" : "border-gray-100 focus:border-brand-celeste"}`}
                      placeholder="Tipo de Pantalla / Solucción..."
                    />
                    {errors.asunto && touched.asunto && (
                      <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
                        <AlertCircle size={12} /> {errors.asunto}
                      </p>
                    )}
                  </div>

                  {/* Field: Mensaje */}
                  <div className="space-y-4">
                    <label
                      className={`text-[10px] uppercase font-black tracking-[0.3em] transition-colors font-accent ${errors.mensaje && touched.mensaje ? "text-red-500" : "text-brand-dark/30"}`}
                    >
                      Detalles del Proyecto
                    </label>
                    <textarea
                      rows={3}
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      onBlur={() => handleBlur("mensaje")}
                      className={`w-full bg-gray-50/20 rounded-3xl border p-6 outline-none transition-all text-brand-dark font-medium resize-none shadow-inner ${errors.mensaje && touched.mensaje ? "border-red-500 bg-red-50" : "border-gray-100 focus:border-brand-celeste"}`}
                      placeholder="Escribe aquí los detalles técnicos o tu visión..."
                    />
                    {errors.mensaje && touched.mensaje && (
                      <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
                        <AlertCircle size={12} /> {errors.mensaje}
                      </p>
                    )}
                  </div>
                </div>

                {/* Privacy & Button Column-spanning */}
                <div className="lg:col-span-2 space-y-8 pt-10 border-t border-gray-50">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        name="privacy"
                        checked={formData.privacy}
                        onChange={handleChange}
                        className="w-6 h-6 accent-brand-dark rounded-md cursor-pointer"
                        id="privacy"
                      />
                      <label
                        htmlFor="privacy"
                        className="text-sm text-text-secondary cursor-pointer hover:text-brand-dark transition-colors"
                      >
                        Confirmo que los datos proporcionados son veraces y
                        acepto los{" "}
                        <span className="text-brand-celeste underline">
                          Términos de Privacidad
                        </span>
                        .
                      </label>
                    </div>
                    {errors.privacy && touched.privacy && (
                      <p className="text-red-500 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 animate-bounce">
                        <AlertCircle size={12} /> {errors.privacy}
                      </p>
                    )}
                  </div>

                  <button
                    disabled={isSubmitting}
                    className={`group relative flex items-center justify-center space-x-6 w-full max-w-xs mx-auto p-6 rounded-full text-white transition-all duration-700 shadow-xl ${isSubmitting ? "bg-gray-400 opacity-50 cursor-not-allowed" : "bg-brand-dark hover:bg-brand-celeste hover:scale-[1.02] active:scale-95"}`}
                  >
                    <span className="text-lg font-display font-black tracking-widest uppercase pl-2">
                      {isSubmitting ? "..." : "ENVIAR"}
                    </span>
                    {!isSubmitting && (
                      <Send
                        size={20}
                        className="group-hover:translate-x-3 transition-transform duration-500"
                      />
                    )}

                    {/* Stealth shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] translate-x-[-200%] group-hover:translate-x-[200%] duration-[1.5s]" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
