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
  const countryButtonRef = useRef<HTMLButtonElement>(null);
  const countrySearchRef = useRef<HTMLInputElement>(null);
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const submitControllerRef = useRef<AbortController | null>(null);
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
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (isDropdownOpen) countrySearchRef.current?.focus();
  }, [isDropdownOpen]);

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
      submitControllerRef.current?.abort();
    };
  }, []);

  const closeCountryMenu = (restoreFocus = false) => {
    setIsDropdownOpen(false);
    setSearchTerm("");
    if (restoreFocus) requestAnimationFrame(() => countryButtonRef.current?.focus());
  };

  const handleCountryOptionKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    const options = Array.from(
      dropdownRef.current?.querySelectorAll<HTMLButtonElement>(
        "[data-country-option]",
      ) || [],
    );
    const currentIndex = options.indexOf(event.currentTarget);
    let targetIndex = currentIndex;
    if (event.key === "ArrowDown") targetIndex = (currentIndex + 1) % options.length;
    else if (event.key === "ArrowUp") targetIndex = (currentIndex - 1 + options.length) % options.length;
    else if (event.key === "Home") targetIndex = 0;
    else if (event.key === "End") targetIndex = options.length - 1;
    else if (event.key === "Escape") {
      event.preventDefault();
      closeCountryMenu(true);
      return;
    } else return;
    event.preventDefault();
    options[targetIndex]?.focus();
  };

  const scheduleSuccessReset = () => {
    if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    successTimeoutRef.current = setTimeout(() => {
      setIsSuccess(false);
      successTimeoutRef.current = null;
    }, 5000);
  };

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
    setSubmitError("");

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
      if (formData.website) {
        setIsSuccess(true);
        scheduleSuccessReset();
        return;
      }
      if (timeSpent < 3) {
        setSubmitError("Espera unos segundos antes de enviar el formulario.");
        return;
      }

      setIsSubmitting(true);

      try {
        submitControllerRef.current?.abort();
        const submitController = new AbortController();
        submitControllerRef.current = submitController;

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

        const response = await fetch(url, {
          method: "POST",
          body: postData,
          signal: submitController.signal,
        });

        if (!response.ok) {
          throw new Error(`El servidor respondió con estado ${response.status}`);
        }

        const responseText = (await response.text()).trim();
        let confirmed = ["ok", "success"].includes(responseText.toLowerCase());

        if (responseText) {
          try {
            const result = JSON.parse(responseText) as Record<string, unknown>;
            confirmed =
              result.success === true ||
              result.status === "success" ||
              result.result === "success";
          } catch {
            // Solo se admite una confirmación de texto exacta: "ok" o "success".
          }
        }

        if (!confirmed) {
          throw new Error("El servidor no confirmó que el mensaje fuera guardado");
        }

        setIsSuccess(true);
        setSubmitError("");
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
        scheduleSuccessReset();
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.error("Error enviando datos:", error);
        setSubmitError(
          "Ocurrió un error al enviar el formulario. Por favor, intenta de nuevo.",
        );
      } finally {
        submitControllerRef.current = null;
        setIsSubmitting(false);
      }
    }
  };

  if (isSuccess) {
    return (
      <div role="status" aria-live="polite" className="py-16 sm:py-24 text-center space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="w-28 h-28 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
          <CheckCircle2 aria-hidden="true" size={56} className="animate-pulse" />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-5xl font-display font-black text-brand-dark tracking-tighter">
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
      className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10 sm:gap-y-12"
    >
      {/* Honeypot field */}
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
      />

      {/* Left Column */}
      <div className="space-y-10 sm:space-y-12">
        {/* Nombre */}
        <div className="space-y-4">
          <label
            htmlFor="nombre"
            className={`text-[10px] uppercase font-black tracking-[0.3em] transition-colors font-accent ${errors.nombre && touched.nombre ? "text-red-500" : "text-brand-dark/60"}`}
          >
            Nombre del Solicitante
          </label>
          <div className="relative group">
            <div
              className={`absolute top-0 left-0 w-11 h-full flex items-center justify-center text-brand-dark/20 ${errors.nombre && touched.nombre ? "text-red-400" : "group-focus-within:text-brand-celeste transition-colors"}`}
            >
              <User aria-hidden="true" size={18} />
            </div>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              onBlur={() => handleBlur("nombre")}
              aria-invalid={Boolean(errors.nombre && touched.nombre)}
              aria-describedby={errors.nombre && touched.nombre ? "nombre-error" : undefined}
              className={`w-full bg-white border-b-2 py-4 pl-12 pr-4 outline-none transition-all text-brand-dark font-medium ${errors.nombre && touched.nombre ? "border-red-500 bg-red-50" : "border-gray-100 focus:border-brand-celeste"}`}
              placeholder="Juan Pérez"
            />
          </div>
          {errors.nombre && touched.nombre && (
            <p id="nombre-error" role="alert" className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle aria-hidden="true" size={12} /> {errors.nombre}
            </p>
          )}
        </div>

        {/* Empresa */}
        <div className="space-y-4">
          <label
            htmlFor="empresa"
            className={`text-[10px] uppercase font-black tracking-[0.3em] transition-colors font-accent ${errors.empresa && touched.empresa ? "text-red-500" : "text-brand-dark/60"}`}
          >
            Organización / Corporativo
          </label>
          <div className="relative group">
            <div
              className={`absolute top-0 left-0 w-11 h-full flex items-center justify-center text-brand-dark/20 ${errors.empresa && touched.empresa ? "text-red-400" : "group-focus-within:text-brand-celeste transition-colors"}`}
            >
              <Building2 aria-hidden="true" size={18} />
            </div>
            <input
              type="text"
              id="empresa"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              onBlur={() => handleBlur("empresa")}
              aria-invalid={Boolean(errors.empresa && touched.empresa)}
              aria-describedby={errors.empresa && touched.empresa ? "empresa-error" : undefined}
              className={`w-full bg-white border-b-2 py-4 pl-12 pr-4 outline-none transition-all text-brand-dark font-medium ${errors.empresa && touched.empresa ? "border-red-500 bg-red-50" : "border-gray-100 focus:border-brand-celeste"}`}
              placeholder="Digital Media Inc."
            />
          </div>
          {errors.empresa && touched.empresa && (
            <p id="empresa-error" role="alert" className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle aria-hidden="true" size={12} /> {errors.empresa}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-4">
          <label
            htmlFor="email"
            className={`text-[10px] uppercase font-black tracking-[0.3em] transition-colors font-accent ${errors.email && touched.email ? "text-red-500" : "text-brand-dark/60"}`}
          >
            Correo Corporativo
          </label>
          <div className="relative group">
            <div
              className={`absolute top-0 left-0 w-11 h-full flex items-center justify-center text-brand-dark/20 ${errors.email && touched.email ? "text-red-400" : "group-focus-within:text-brand-celeste transition-colors"}`}
            >
              <AtSign aria-hidden="true" size={18} />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur("email")}
              aria-invalid={Boolean(errors.email && touched.email)}
              aria-describedby={errors.email && touched.email ? "email-error" : undefined}
              className={`w-full bg-white border-b-2 py-4 pl-12 pr-4 outline-none transition-all text-brand-dark font-medium ${errors.email && touched.email ? "border-red-500 bg-red-50" : "border-gray-100 focus:border-brand-celeste"}`}
              placeholder="contacto@empresa.com"
            />
          </div>
          {errors.email && touched.email && (
            <p id="email-error" role="alert" className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle aria-hidden="true" size={12} /> {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-10 sm:space-y-12">
        {/* Teléfono */}
        <div className="space-y-4">
          <label
            htmlFor="telefono"
            className={`text-[10px] uppercase font-black tracking-[0.3em] transition-colors font-accent ${errors.telefono && touched.telefono ? "text-red-500" : "text-brand-dark/60"}`}
          >
            Teléfono de Contacto
          </label>
          <div
            className={`flex gap-2 sm:gap-3 border-b-2 transition-all p-1 items-center relative min-w-0 ${errors.telefono && touched.telefono ? "border-red-500 bg-red-50" : "border-gray-100 group focus-within:border-brand-celeste"}`}
          >
            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                ref={countryButtonRef}
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
                aria-controls="country-menu"
                aria-haspopup="true"
                aria-label={`Seleccionar país. Actual: ${formData.country.name} ${formData.country.code}`}
                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors border border-gray-100"
              >
                <span className="text-xl">{formData.country.flag}</span>
                <span className="font-bold text-brand-dark text-sm">
                  {formData.country.code}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  size={14}
                  className={`text-brand-dark/30 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div id="country-menu" aria-label="Seleccionar país" className="absolute top-14 left-0 w-[min(16rem,calc(100vw-7rem))] bg-white border border-gray-100 rounded-3xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-4 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
                    <Search aria-hidden="true" size={14} className="text-brand-dark/40" />
                    <label htmlFor="country-search" className="sr-only">Buscar país</label>
                    <input
                      ref={countrySearchRef}
                      id="country-search"
                      type="text"
                      placeholder="Buscar país..."
                      className="bg-transparent border-none outline-none text-xs w-full py-1 font-bold text-brand-dark"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") {
                          event.preventDefault();
                          closeCountryMenu(true);
                        } else if (event.key === "ArrowDown") {
                          event.preventDefault();
                          dropdownRef.current?.querySelector<HTMLButtonElement>("[data-country-option]")?.focus();
                        }
                      }}
                    />
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {filteredCountries.map((c) => (
                      <button
                        key={c.code}
                        data-country-option
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, country: c }));
                          closeCountryMenu(true);
                        }}
                        onKeyDown={handleCountryOptionKeyDown}
                        aria-pressed={formData.country.code === c.code}
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
                            aria-hidden="true"
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
              id="telefono"
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
              aria-invalid={Boolean(errors.telefono && touched.telefono)}
              aria-describedby={errors.telefono && touched.telefono ? "telefono-error" : undefined}
              className="min-w-0 flex-1 bg-transparent py-4 text-sm sm:text-base text-brand-dark font-black tracking-[0.1em] sm:tracking-[0.2em] outline-none placeholder:tracking-normal placeholder:font-medium placeholder:text-brand-dark/20"
              placeholder={`${formData.country.len} dígitos...`}
            />

            <div className="hidden sm:block pr-4 text-brand-dark/20 shrink-0">
              <PhoneIcon aria-hidden="true" size={20} strokeWidth={1.5} />
            </div>
          </div>
          {errors.telefono && touched.telefono && (
            <p id="telefono-error" role="alert" className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2 px-2">
              <AlertCircle aria-hidden="true" size={12} /> {errors.telefono}
            </p>
          )}
        </div>

        {/* Asunto */}
        <div className="space-y-4">
          <label
            htmlFor="asunto"
            className={`text-[10px] uppercase font-black tracking-[0.3em] transition-colors font-accent ${errors.asunto && touched.asunto ? "text-red-500" : "text-brand-dark/60"}`}
          >
            Asunto del Requerimiento
          </label>
          <input
            type="text"
            id="asunto"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
            onBlur={() => handleBlur("asunto")}
            aria-invalid={Boolean(errors.asunto && touched.asunto)}
            aria-describedby={errors.asunto && touched.asunto ? "asunto-error" : undefined}
            className={`w-full bg-white border-b-2 py-4 pr-4 outline-none transition-all text-brand-dark font-medium ${errors.asunto && touched.asunto ? "border-red-500 bg-red-50" : "border-gray-100 focus:border-brand-celeste"}`}
            placeholder="Tipo de pantalla / Solución..."
          />
          {errors.asunto && touched.asunto && (
            <p id="asunto-error" role="alert" className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle aria-hidden="true" size={12} /> {errors.asunto}
            </p>
          )}
        </div>

        {/* Mensaje */}
        <div className="space-y-4">
          <label
            htmlFor="mensaje"
            className={`text-[10px] uppercase font-black tracking-[0.3em] transition-colors font-accent ${errors.mensaje && touched.mensaje ? "text-red-500" : "text-brand-dark/60"}`}
          >
            Describe tu Proyecto
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            onBlur={() => handleBlur("mensaje")}
            aria-invalid={Boolean(errors.mensaje && touched.mensaje)}
            aria-describedby={errors.mensaje && touched.mensaje ? "mensaje-error" : undefined}
            rows={4}
            className={`w-full bg-white border-2 rounded-2xl py-4 px-4 outline-none transition-all text-brand-dark font-medium resize-none ${errors.mensaje && touched.mensaje ? "border-red-500 bg-red-50" : "border-gray-100 focus:border-brand-celeste"}`}
            placeholder="Cuéntanos sobre tu proyecto, dimensiones, ubicación..."
          />
          {errors.mensaje && touched.mensaje && (
            <p id="mensaje-error" role="alert" className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle aria-hidden="true" size={12} /> {errors.mensaje}
            </p>
          )}
        </div>
      </div>

      {/* Full Width Section */}
      <div className="lg:col-span-2 space-y-8">
        {/* Privacy Checkbox */}
        <div className="flex items-start gap-4 group">
          <label htmlFor="privacy" className="relative mt-1 cursor-pointer">
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              checked={formData.privacy}
              onChange={handleChange}
              aria-invalid={Boolean(errors.privacy && touched.privacy)}
              aria-describedby={errors.privacy && touched.privacy ? "privacy-error" : undefined}
              aria-label="Acepto la Política de Privacidad y el tratamiento de mis datos personales"
              className="sr-only peer"
            />
            <div
              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-brand-celeste peer-focus-visible:ring-offset-2 ${formData.privacy ? "bg-brand-celeste border-brand-celeste" : errors.privacy && touched.privacy ? "border-red-500" : "border-gray-200 group-hover:border-brand-celeste/50"}`}
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
          </label>
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
        </div>
        {errors.privacy && touched.privacy && (
          <p id="privacy-error" role="alert" className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
            <AlertCircle aria-hidden="true" size={12} /> {errors.privacy}
          </p>
        )}

        {submitError && (
          <p role="alert" aria-live="assertive" className="text-sm font-bold text-red-600">
            {submitError}
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
              <span aria-hidden="true" className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send aria-hidden="true" size={18} />
              Enviar Mensaje
            </>
          )}
        </button>
      </div>
    </form>
  );
}
