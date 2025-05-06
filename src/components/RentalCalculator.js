import React, { useState } from "react";
import {
  Calculator,
  Clock,
  Computer,
  CreditCard,
  RefreshCw,
  Calendar,
  Clock3,
} from "lucide-react";

export default function RentalCalculator() {
  const dateInputRef = React.useRef(null);
  const [hours, setHours] = useState(1);
  const [computers, setComputers] = useState(1);
  const [calculation, setCalculation] = useState({
    totalPrice: 0,
    originalPrice: 0,
    hourPackSavings: 0,
    groupSavings: 0,
    totalDiscount: 0,
    averageHourlyRate: 0,
    pricePerUser: 0,
    discountMessage: "",
  });
  const [reserveErrorMessage, setReserveErrorMessage] = useState("");
  const [showReserveButton, setShowReserveButton] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("11:00");

  const calculateNormalPrice = () => {
    const hoursValue = hours || 0;
    const computersValue = computers || 0;

    // Cálculo del precio estándar y base según la cantidad de horas
    const standardRate = hoursValue * 6500;
    let basePrice = 0;
    if (hoursValue >= 12) {
      basePrice = 39000 + (hoursValue - 12) * 6500;
    } else if (hoursValue >= 8) {
      basePrice = 33000 + (hoursValue - 8) * 6500;
    } else if (hoursValue >= 6) {
      basePrice = 27000 + (hoursValue - 6) * 6500;
    } else if (hoursValue >= 3) {
      basePrice = 15000 + (hoursValue - 3) * 6500;
    } else {
      basePrice = hoursValue * 6500;
    }

    const promoDiscount = standardRate - basePrice;
    // Descuento por cantidad de computadoras
    const discountRate =
      computersValue >= 8
        ? 0.15
        : computersValue >= 6
        ? 0.12
        : computersValue >= 4
        ? 0.1
        : 0;

    const original = standardRate * computersValue;
    const discountedPrice = basePrice * computersValue * (1 - discountRate);
    const totalHourPackSavings = promoDiscount * computersValue;
    const totalGroupSavings = basePrice * computersValue * discountRate;
    const totalSavings = totalHourPackSavings + totalGroupSavings;

    const averageHourlyRate =
      hoursValue > 0 && computersValue > 0
        ? discountedPrice / (hoursValue * computersValue)
        : 0;
    const pricePerUser =
      computersValue > 0 ? discountedPrice / computersValue : 0;

    const discountMessage =
      computersValue > 0 && computersValue < 4
        ? `Agrega ${
            4 - computersValue
          } computadora(s) más para acceder al descuento por grupo.`
        : "";

    setCalculation({
      totalPrice: discountedPrice,
      originalPrice: original,
      hourPackSavings: totalHourPackSavings,
      groupSavings: totalGroupSavings,
      totalDiscount: totalSavings,
      averageHourlyRate,
      pricePerUser,
      discountMessage,
    });
    setShowReserveButton(true);
  };

  const resetCalculator = () => {
    setHours(1);
    setComputers(1);
    setCalculation({
      totalPrice: 0,
      originalPrice: 0,
      hourPackSavings: 0,
      groupSavings: 0,
      totalDiscount: 0,
      averageHourlyRate: 0,
      pricePerUser: 0,
      discountMessage: "",
    });
    setShowReserveButton(false);
    setReserveErrorMessage("");
    setSelectedDate(null);
    setSelectedTime("11:00");
  };

  const handleReserve = () => {
    if (!selectedDate) {
      setReserveErrorMessage("❌ Falta seleccionar la fecha de reserva");
      return;
    }
    if (!selectedTime) {
      setReserveErrorMessage("❌ Falta configurar fecha y hora de reserva");
      return;
    }
    const phoneNumber = "5491135143608";
    const formattedDate = `${selectedDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${(selectedDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    const message = `Hola, quiero reservar ${computers} computadora(s) por ${hours} hora(s) el día ${formattedDate} a las ${selectedTime}.`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };

  const formatArgentinePesos = (amount) => {
    // Check if amount is a valid number
    if (isNaN(amount) || amount === null || amount === undefined) {
      return "$0";
    }

    // Format with thousands separator (.) and decimal separator (,)
    return "$" + amount.toLocaleString("es-AR");
  };

  const handleDateClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 font-['Kanit']">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-2 justify-center">
            <img src="/logo.svg" alt="Armada Logo" className="w-1/2" />
          </div>
        </div>

        <div className="bg-gray-800 border-gray-700 shadow-xl rounded-lg overflow-hidden">
          <div className="p-4 border-gray-700">
            <h2 className="text-white text-xl font-bold">
              Reserva tu PC en Armada
            </h2>
            <p className="text-gray-400 text-sm">
              Calcula el costo de alquiler de computadoras y reserva tu turno
            </p>
            <div className="text-left flex flex-row gap-4 mt-2 border-t border-b border-gray-700 py-2">
              <p className="text-gray-400 text-md">
                Para calcular el precio de un{" "}
                <span className="text-purple-400 font-medium">
                  evento o sala privada con PS5
                </span>{" "}
                comunicarse directamente por:
              </p>
              <a
                href="https://wa.me/5491135143608"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 text-gray-400 hover:text-gray-200 rounded  text-xs"
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path
                    d="M11.5 0C5.149 0 0 5.148 0 11.5 0 13.395.53 15.23 1.528 16.852L.106 24l7.285-1.41c1.557.85 3.298 1.3 5.108 1.3 6.352 0 11.5-5.149 11.5-11.5C24 5.149 18.851 0 11.5 0zm0 21c-1.612 0-3.187-.42-4.576-1.216l-.328-.195-3.403.656.678-3.35-.211-.332A9.333 9.333 0 012 11.5C2 6.253 6.253 2 11.5 2 16.747 2 21 6.253 21 11.5 21 16.747 16.747 21 11.5 21z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
                WhatsApp
              </a>
              <a
                href="mailto:ricardo@armadaesports.gg"
                className="flex items-center justify-center gap-1 text-gray-400 hover:text-gray-200 text-xs"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Correo
              </a>
            </div>
          </div>

          <div className="p-4 pt-0 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="hours"
                className="text-gray-300 flex items-center gap-2"
              >
                <Clock className="h-4 w-4" />
                ¿Cuántas horas?
              </label>
              <select
                id="hours"
                value={hours}
                onChange={(e) => setHours(Number.parseInt(e.target.value) || 1)}
                className="w-full cursor-pointer bg-gray-700 border-gray-600 text-white rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const hour = i + 1;
                  return (
                    <option key={hour} value={hour}>
                      {hour} {hour === 1 ? "hora" : "horas"}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="computers"
                className="text-gray-300 flex items-center gap-2"
              >
                <Computer className="h-4 w-4" />
                ¿Cuántas computadoras/usuarios?
              </label>
              <select
                id="computers"
                value={computers}
                onChange={(e) =>
                  setComputers(Number.parseInt(e.target.value) || 1)
                }
                className="w-full cursor-pointer bg-gray-700 border-gray-600 text-white rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {Array.from({ length: 10 }, (_, i) => {
                  const computer = i + 1;
                  return (
                    <option key={computer} value={computer}>
                      {computer}{" "}
                      {computer === 1 ? "computadora" : "computadoras"}
                    </option>
                  );
                })}
              </select>
            </div>

            <button
              onClick={calculateNormalPrice}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
            >
              <Calculator className="h-4 w-4" /> Reservar
            </button>
          </div>

          {calculation.totalPrice > 0 && (
            <>
              <div className="border-t border-gray-700"></div>

              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Precio Original:</span>
                    <span className="text-white font-medium">
                      {formatArgentinePesos(calculation.originalPrice)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">
                      Descuento por Pack de horas:
                    </span>
                    <span className="text-green-400 font-medium">
                      - {formatArgentinePesos(calculation.hourPackSavings)}
                    </span>
                  </div>

                  {calculation.hourPackSavings === 0 &&
                    calculation.totalPrice > 0 && (
                      <div className="text-amber-500 text-sm">
                        No tienes descuento por pack de horas. Próxima mejora:{" "}
                        {hours < 3
                          ? "3 horas (Pack por $5.000)"
                          : hours < 6
                          ? "6 horas (Pack por $27.000)"
                          : hours < 8
                          ? "8 horas (Pack por $33.000)"
                          : hours < 12
                          ? "12 horas (Pack por $39.000)"
                          : ""}
                      </div>
                    )}

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">
                      Descuento por cantidad de usuarios:
                    </span>
                    <span className="text-green-400 font-medium">
                      - {formatArgentinePesos(calculation.groupSavings)}
                    </span>
                  </div>

                  {calculation.discountMessage && (
                    <div className="text-amber-500 text-sm">
                      {calculation.discountMessage}
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Descuento Total:</span>
                    <span className="text-green-400 font-medium">
                      - {formatArgentinePesos(calculation.totalDiscount)}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium">
                      Precio Final:
                    </span>
                    <div className="bg-purple-900/50 border border-purple-500 text-purple-300 text-lg px-3 py-1 rounded-md">
                      {formatArgentinePesos(calculation.totalPrice)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="bg-gray-700/50 p-2 rounded text-center">
                    <div className="text-xs text-gray-400">Estás pagando</div>
                    <div className="text-white font-medium">
                      {formatArgentinePesos(calculation.averageHourlyRate)} por
                      hora
                    </div>
                  </div>
                  <div className="bg-gray-700/50 p-2 rounded text-center">
                    <div className="text-xs text-gray-400">Estás pagando</div>
                    <div className="text-white font-medium">
                      {formatArgentinePesos(calculation.pricePerUser)} por
                      usuario
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-white" />
                      Fecha de reserva
                    </span>
                  </div>
                  <input
                    onClick={handleDateClick}
                    ref={dateInputRef}
                    type="date"
                    onChange={(e) => {
                      const date = e.target.value
                        ? new Date(e.target.value)
                        : null;
                      setSelectedDate(date);
                      if (date) setReserveErrorMessage("");
                    }}
                    className="w-full cursor-pointer bg-gray-600 border-gray-500 text-white rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden"
                  />
                </div>

                <div className="bg-gray-700 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 flex items-center gap-2">
                      <Clock3 className="h-4 w-4" />
                      Hora de reserva
                    </span>
                  </div>
                  <select
                    value={selectedTime}
                    onChange={(e) => {
                      setSelectedTime(e.target.value);
                      setReserveErrorMessage("");
                    }}
                    className="w-full cursor-pointer bg-gray-600 border-gray-500 text-white rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {Array.from({ length: 13 }, (_, i) => {
                      const hour = i + 11;
                      const formattedHour =
                        hour < 10 ? `0${hour}:00` : `${hour}:00`;
                      return (
                        <option key={hour} value={formattedHour}>
                          {formattedHour}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {reserveErrorMessage && (
                  <div className="text-red-500 text-sm font-medium bg-red-900/20 border border-red-800 p-2 rounded">
                    {reserveErrorMessage}
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col gap-3">
                {showReserveButton && (
                  <button
                    onClick={handleReserve}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
                  >
                    <CreditCard className="h-4 w-4" /> Finalizar reserva
                  </button>
                )}

                <button
                  onClick={resetCalculator}
                  className="w-full border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" /> Volver al incio
                </button>
              </div>
            </>
          )}
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          <p>© 2025 Armada Esports. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}
