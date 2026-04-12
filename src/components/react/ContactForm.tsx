import { useState, useMemo, useRef, useEffect } from "react";
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
  // América del Norte y Sur
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

  // Asia y Oceanía
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

interface CountryType {
  code: string;
  name: string;
  flag: string;
  len: number;
  start?: string | string[];
}

export default function ContactForm() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [formLoadTime] = useState(() => Date.now());

  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    country: COUNTRY_DATA[0] as CountryType,
    telefono: "",
    email: "",
    asunto: "",
    mensaje: "",
    privacy: false,
    website: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
      const cleanValue = value.replace(/\D/g, "");

      if (!cleanValue) {
        error = "El teléfono es requerido";
      } else if (cleanValue.length !== country.len) {
        error = "Número inválido";
      } else if (country.start) {
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

    if (touched[name]) {
      const error = validateField(name, val);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched = Object.keys(formData).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {},
    );
    setTouched(allTouched);

    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((k) => {
      const err = validateField(k, (formData as any)[k]);
      if (err) newErrors[k] = err;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const timeSpent = (Date.now() - formLoadTime) / 1000;
      if (formData.website || timeSpent < 3) {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 5000);
        return;
      }

      setIsSubmitting(true);

      try {
        const url =
          "https://script.google.com/macros/s/AKfycbzqAe2IVa13KyIy_37DRuD9sJ6YznWFIDqG8sw8SansFemGIiBVDw4RiQ8PfgkDrcWYbQ/exec";

        const postData = new URLSearchParams();
        postData.append("nombre", formData.nombre);
        postData.append("empresa", formData.empresa);
        postData.append("email", formData.email);
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
        setFormData({
          nombre: "",
          empresa: "",
          country: COUNTRY_DATA[0],
          telefono: "",
          email: "",
          asunto: "",
          mensaje: "",
          privacy: false,
          website: "",
        });
        setTouched({});
        setTimeout(() => setIsSuccess(false), 5000);
      } catch (error) {
        setIsSubmitting(false);
        console.error("Error enviando datos:", error);
        alert(
          "Ocurrió un error al enviar el formulario. Por favor, intenta de nuevo.",
        );
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="py-24 text-center space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="w-28 h-28 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
          <CheckCircle2 size={56} className="animate-pulse" />
        </div>
        <div className="space-y-4">
          <h2 className="text-5xl font-display font-black text-brand-dark tracking-tighter">
            ¡Mensaje Enviado!
          </h2>
          <p className="text-xl text-text-secondary max-w-md mx-auto">
            Tu mensaje fue enviado, recibirás un mensaje de nuestro equipo a la
            brevedad posible.
          </p>
        </div>
        <button
          onClick={() => setIsSuccess(false)}
          className="px-10 py-5 bg-brand-dark text-white rounded-full text-xs font-black tracking-widest uppercase hover:bg-brand-celeste transition-all shadow-xl"
        >
          Nuevo Requerimiento
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12"
    >
      {/* Honeypot field */}
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Left Column */}
      <div className="space-y-12">
        {/* Nombre */}
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
              className={`w-full bg-white border-b-2 py-4 pl-12 pr-4 outline-none transition-all text-brand-dark font-medium ${errors.nombre && touched.nombre ? "border-red-500 bg-red-50" : "border-gray-100 focus:border-brand-celeste"}`}
              placeholder="Juan Pérez"
            />
          </div>
          {errors.nombre && touched.nombre && (
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle size={12} /> {errors.nombre}
            </p>
          )}
        </div>

        {/* Empresa */}
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
              className={`w-full bg-white border-b-2 py-4 pl-12 pr-4 outline-none transition-all text-brand-dark font-medium ${errors.empresa && touched.empresa ? "border-red-500 bg-red-50" : "border-gray-100 focus:border-brand-celeste"}`}
              placeholder="Digital Media Inc."
            />
          </div>
          {errors.empresa && touched.empresa && (
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle size={12} /> {errors.empresa}
            </p>
          )}
        </div>

        {/* Email */}
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
              className={`w-full bg-white border-b-2 py-4 pl-12 pr-4 outline-none transition-all text-brand-dark font-medium ${errors.email && touched.email ? "border-red-500 bg-red-50" : "border-gray-100 focus:border-brand-celeste"}`}
              placeholder="contacto@empresa.com"
            />
          </div>
          {errors.email && touched.email && (
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle size={12} /> {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-12">
        {/* Teléfono */}
        <div className="space-y-4">
          <label
            className={`text-[10px] uppercase font-black tracking-[0.3em] transition-colors font-accent ${errors.telefono && touched.telefono ? "text-red-500" : "text-brand-dark/30"}`}
          >
            Teléfono de Contacto
          </label>
          <div
            className={`flex gap-3 border-b-2 transition-all p-1 items-center relative ${errors.telefono && touched.telefono ? "border-red-500 bg-red-50" : "border-gray-100 group focus-within:border-brand-celeste"}`}
          >
            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors border border-gray-100"
              >
                <span className="text-xl">{formData.country.flag}</span>
                <span className="font-bold text-brand-dark text-sm">
                  {formData.country.code}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-brand-dark/30 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-14 left-0 w-64 bg-white border border-gray-100 rounded-3xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-4 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
                    <Search size={14} className="text-brand-dark/30" />
                    <input
                      type="text"
                      placeholder="Buscar país..."
                      className="bg-transparent border-none outline-none text-xs w-full py-1 font-bold text-brand-dark"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {filteredCountries.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, country: c }));
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
                    ))}
                  </div>
                </div>
              )}
            </div>

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
              placeholder={`${formData.country.len} dígitos...`}
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

        {/* Asunto */}
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
            className={`w-full bg-white border-b-2 py-4 pr-4 outline-none transition-all text-brand-dark font-medium ${errors.asunto && touched.asunto ? "border-red-500 bg-red-50" : "border-gray-100 focus:border-brand-celeste"}`}
            placeholder="Tipo de pantalla / Solución..."
          />
          {errors.asunto && touched.asunto && (
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle size={12} /> {errors.asunto}
            </p>
          )}
        </div>

        {/* Mensaje */}
        <div className="space-y-4">
          <label
            className={`text-[10px] uppercase font-black tracking-[0.3em] transition-colors font-accent ${errors.mensaje && touched.mensaje ? "text-red-500" : "text-brand-dark/30"}`}
          >
            Describe tu Proyecto
          </label>
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            onBlur={() => handleBlur("mensaje")}
            rows={4}
            className={`w-full bg-white border-2 rounded-2xl py-4 px-4 outline-none transition-all text-brand-dark font-medium resize-none ${errors.mensaje && touched.mensaje ? "border-red-500 bg-red-50" : "border-gray-100 focus:border-brand-celeste"}`}
            placeholder="Cuéntanos sobre tu proyecto, dimensiones, ubicación..."
          />
          {errors.mensaje && touched.mensaje && (
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle size={12} /> {errors.mensaje}
            </p>
          )}
        </div>
      </div>

      {/* Full Width Section */}
      <div className="lg:col-span-2 space-y-8">
        {/* Privacy Checkbox */}
        <label className="flex items-start gap-4 cursor-pointer group">
          <div className="relative mt-1">
            <input
              type="checkbox"
              name="privacy"
              checked={formData.privacy}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div
              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.privacy ? "bg-brand-celeste border-brand-celeste" : errors.privacy && touched.privacy ? "border-red-500" : "border-gray-200 group-hover:border-brand-celeste/50"}`}
            >
              {formData.privacy && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-sm text-text-secondary leading-relaxed">
            He leído y acepto la{" "}
            <a
              href="/privacidad"
              className="text-brand-celeste underline hover:text-brand-dark transition-colors"
            >
              Política de Privacidad
            </a>{" "}
            y autorizo el tratamiento de mis datos personales.
          </span>
        </label>
        {errors.privacy && touched.privacy && (
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
            <AlertCircle size={12} /> {errors.privacy}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full lg:w-auto px-12 py-5 bg-brand-dark text-white rounded-full text-sm font-black uppercase tracking-widest hover:bg-brand-celeste transition-all duration-500 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send size={18} />
              Enviar Mensaje
            </>
          )}
        </button>
      </div>
    </form>
  );
}
