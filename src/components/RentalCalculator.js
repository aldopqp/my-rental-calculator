import React, { useState } from "react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 font-['Kanit']">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-2 justify-center">
            <img src="/logo.svg" alt="Armada Logo" className="w-1/2" />
          </div>
        </div>

        <div className="bg-gray-800 border-gray-700 shadow-xl rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-white text-xl font-bold">
              Calculadora de Alquiler
            </h2>
            <p className="text-gray-400 text-sm">
              Calcula el costo de alquiler de computadoras
            </p>
          </div>

          <div className="p-4 space-y-4">
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
                className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                ¿Cuántas computadoras?
              </label>
              <select
                id="computers"
                value={computers}
                onChange={(e) =>
                  setComputers(Number.parseInt(e.target.value) || 1)
                }
                className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
              <Calculator className="h-4 w-4" /> Calcular Precio
            </button>
          </div>

          {calculation.totalPrice > 0 && (
            <>
              <div className="border-t border-gray-700"></div>

              <div className="p-4 space-y-4">
                <div className="bg-gray-700 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Fecha de reserva
                    </span>
                  </div>
                  <input
                    type="date"
                    onChange={(e) => {
                      const date = e.target.value
                        ? new Date(e.target.value)
                        : null;
                      setSelectedDate(date);
                      if (date) setReserveErrorMessage("");
                    }}
                    className="w-full bg-gray-600 border-gray-500 text-white rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="w-full bg-gray-600 border-gray-500 text-white rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    <CreditCard className="h-4 w-4" /> Reservar Turno
                  </button>
                )}

                <button
                  onClick={resetCalculator}
                  className="w-full border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" /> Reiniciar calculadora
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
